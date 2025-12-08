
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SYSTEM_INSTRUCTION_VOICE } from '../constants';
import { createBlob, decodeAudioData } from '../services/geminiService';
import { AnalysisResponseSchema } from '../types';

interface Props {
  analysisData: AnalysisResponseSchema | null;
}

const VoiceAgent: React.FC<Props> = ({ analysisData }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    try {
      setError(null);
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      let fullInstruction = SYSTEM_INSTRUCTION_VOICE;
      if (analysisData) {
        fullInstruction += `\n\nCONTEXT - CURRENT CREDIT REPORT ANALYSIS:\n${JSON.stringify(analysisData, null, 2)}`;
      } else {
        fullInstruction += `\n\nCONTEXT: No credit report has been uploaded yet. Encourage the user to upload a report.`;
      }

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            startAudioStreaming(stream, sessionPromise);
          },
          onmessage: async (message: LiveServerMessage) => {
             await handleMessage(message);
          },
          onclose: () => {
            setIsConnected(false);
          },
          onerror: (err) => {
            console.error('Gemini Live Error', err);
            setError("Connection error. Please try again.");
            disconnect();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: fullInstruction,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        }
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (err) {
      console.error("Failed to connect", err);
      setError("Failed to access microphone or connect.");
    }
  };

  const startAudioStreaming = (stream: MediaStream, sessionPromise: Promise<any>) => {
    if (!inputAudioContextRef.current) return;
    const context = inputAudioContextRef.current;
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(4096, 1, 1);
    
    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmBlob = createBlob(inputData, context.sampleRate);
      sessionPromise.then((session) => {
         session.sendRealtimeInput({ media: pcmBlob });
      });
      drawVisualizer(inputData);
    };

    source.connect(processor);
    processor.connect(context.destination);
    sourceRef.current = source;
    processorRef.current = processor;
  };

  const handleMessage = async (message: LiveServerMessage) => {
    const serverContent = message.serverContent;
    
    if (serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
        setIsSpeaking(true);
        const base64Audio = serverContent.modelTurn.parts[0].inlineData.data;
        if (audioContextRef.current) {
            const ctx = audioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            const audioBuffer = await decodeAudioData(base64Audio, ctx);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.onended = () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) setIsSpeaking(false);
            };
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            activeSourcesRef.current.add(source);
        }
    }

    if (serverContent?.interrupted) {
       activeSourcesRef.current.forEach(src => src.stop());
       activeSourcesRef.current.clear();
       nextStartTimeRef.current = 0;
       setIsSpeaking(false);
    }
  };

  const disconnect = () => {
    if (processorRef.current) { processorRef.current.disconnect(); processorRef.current.onaudioprocess = null; }
    if (sourceRef.current) sourceRef.current.disconnect();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsConnected(false);
    setIsSpeaking(false);
    activeSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const drawVisualizer = (data: Float32Array) => {
     const canvas = canvasRef.current;
     if (!canvas) return;
     const ctx = canvas.getContext('2d');
     if (!ctx) return;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = isSpeaking ? '#10b981' : '#60a5fa';
     const barWidth = 4;
     const gap = 2;
     const totalBars = Math.floor(canvas.width / (barWidth + gap));
     const step = Math.floor(data.length / totalBars);
     for(let i=0; i<totalBars; i++) {
        const value = Math.abs(data[i * step]);
        const height = value * canvas.height * 2; 
        ctx.fillRect(i * (barWidth + gap), (canvas.height - height)/2, barWidth, height);
     }
  };

  return (
    <div className="glass-panel rounded-lg p-10 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-1000 ${isSpeaking ? 'bg-emerald-500' : 'bg-blue-600'}`}></div>

        <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                {isConnected ? (isSpeaking ? 'Agent Active' : 'Listening') : 'Offline'}
            </span>
        </div>

        {/* Central Visualizer */}
        <div className="relative mb-8 z-10">
            <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
                isSpeaking 
                    ? 'border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]' 
                    : isConnected 
                        ? 'border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                        : 'border-2 border-slate-700'
            }`}>
                 <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${isConnected ? 'bg-black' : 'bg-slate-900'}`}>
                    <canvas ref={canvasRef} width="160" height="160" className="opacity-80 rounded-full" />
                 </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 z-10 font-serif">RevolV Voice Coach</h2>
        
        {analysisData ? (
          <div className="flex flex-col items-center mb-12 z-10">
             <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-3 py-1 rounded mb-4 font-mono uppercase tracking-widest">
               Analysis Loaded • Score {analysisData.extractedCreditData.score}
             </span>
             <p className="text-slate-400 text-center max-w-md text-lg font-light">
                "I've reviewed your credit file. Ask me about your approval odds or how to remove specific negative items."
             </p>
          </div>
        ) : (
          <p className="text-slate-500 text-center max-w-md mb-12 z-10 font-light">
              "Upload a report in the dashboard to enable personalized coaching. Currently in general advisory mode."
          </p>
        )}

        {error && (
            <div className="mb-6 text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded border border-red-500/20 z-10">
                {error}
            </div>
        )}

        {!isConnected ? (
            <button
                onClick={connect}
                className="z-10 px-10 py-4 text-lg font-bold text-white bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 hover:border-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/20 group"
            >
                <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-ping"></span>
                    Initialize Voice Link
                </span>
            </button>
        ) : (
            <button
                onClick={disconnect}
                className="z-10 px-8 py-3 text-base font-bold text-slate-400 border border-slate-700 rounded-full hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
            >
                Terminate Session
            </button>
        )}
    </div>
  );
};

export default VoiceAgent;