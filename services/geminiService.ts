
import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { SYSTEM_INSTRUCTION_VOICE } from "../constants";

// Helper to get API Key
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY is missing from process.env");
    return "";
  }
  return key;
};

// Helper to clean Markdown code blocks from response
const cleanResponseText = (text: string): string => {
  if (!text) return "";
  // Remove ```json ... ``` or ```text ... ``` or just ``` ... ``` wrappers
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-z]*\s*/i, "").replace(/\s*```$/, "");
  }
  return cleaned;
};

// Safety Settings - Critical for Dispute Letters and Financial Analysis
const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

// --- Document Analysis Service ---

export const analyzeCreditReport = async (
  files: { base64: string; mimeType: string }[]
): Promise<any> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key required");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are the "RevolV Senior Compliance Underwriter".
    
    PURPOSE:
    Analyze the provided credit report to determine the "Aggregate Fundability Score" and "Risk Grade" for high-limit business funding.
    
    INPUT:
    Image(s) or PDF of a credit report.
    
    TASKS:
    
    1. **EXTRACT CREDIT DATA**:
       - Extract FICO scores if visible. If multiple versions (FICO 8, 9, 10, Vantage) are present, note them.
       - Total Debt, Utilization %, Inquiries (last 6-12m), Age of History.
       - Negative Items: Creditor, Type, Amount, Date, Status.
    
    2. **CALCULATE AGGREGATE FUNDABILITY SCORE (0-100)**:
       - **Logic**: Estimate the score based on an AGGREGATE view of FICO 8, FICO 9, and VantageScore 3.0/4.0 criteria.
       - **Credit Health (40%)**: Low utilization (<10% is Tier 1), Aged history (5yr+).
       - **Compliance (40%)**: Zero negatives. Presence of ANY collection or late payment (even 1) drops score significantly.
       - **Velocity (20%)**: Inquiries < 2 in 6 months.
       
       **SCORING TIERS**:
       - 80-100: Tier 1 (A Grade) - Ready for $50k+ lines.
       - 60-79: Tier 2 (B Grade) - Fundable with manual review.
       - 40-59: Tier 3 (C Grade) - Repair Required.
       - 0-39: Restricted (D/F Grade) - Do not apply.
    
    3. **DETERMINE RISK GRADE**:
       - Assign a Letter Grade (A+, A, B+, B, C, D, F).
    
    4. **ESTIMATE FUNDING CAPACITY**:
       - **Personal**: Estimate credit card limit capacity.
       - **Startup Business (PG)**: Estimate total funding potential (Cash + Credit) assuming the client acts as a Personal Guarantor (PG) and has perfect "Business Credibility" (411 listed, etc).
    
    5. **UNDERWRITER ANALYSIS**:
       - **Strengths**: What will a bank like Chase/Amex like?
       - **Weaknesses**: What triggers a manual review or auto-decline?
       - **Executive Summary**: A professional summary in the voice of a Bank Underwriter.

    6. **STRATEGIC ROADMAP**:
       - **Clean Up Strategy**: Specific Metro 2 attack plan.
       - **AU Strategy**: Authorized User recommendations to boost "Aggregate" score.
       - **Credit Builder Strategy**: Mandatory growth strategy.
       - **Sequencing**: Order of operations for applications.

    7. **DATA BREACH AUDIT**:
       - Check for Equifax (2017), Experian/T-Mobile, AT&T, Ticketmaster breach indicators.

    Return the response strictly in JSON format matching the schema provided.
  `;

  // Create parts for all uploaded files
  const fileParts = files.map(file => ({
    inlineData: {
      data: file.base64,
      mimeType: file.mimeType,
    },
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          ...fileParts,
          { text: prompt },
        ],
      },
      config: {
        safetySettings: SAFETY_SETTINGS,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING },
            riskGrade: { type: Type.STRING },
            estimatedFundingCapacity: { type: Type.STRING },
            startupFundingCapacity: { type: Type.STRING, description: "Estimated funding range for startup business with personal guarantee" },
            fundabilityScore: {
              type: Type.OBJECT,
              properties: {
                numeric: { type: Type.INTEGER },
                tierLabel: { type: Type.STRING },
                summary: { type: Type.STRING }
              }
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            cleanUpStrategy: { type: Type.STRING },
            auStrategy: { type: Type.STRING },
            creditBuilderStrategy: { type: Type.STRING, description: "Detailed growth strategy. Must not be empty." },
            sequencing: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            breachAnalysis: {
              type: Type.OBJECT,
              properties: {
                isEquifaxVictimLikely: { type: Type.BOOLEAN },
                isExperianVictimLikely: { type: Type.BOOLEAN },
                identifiedBreaches: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of companies or bureaus where a breach likely occurred based on the data"
                },
                reasoning: { type: Type.STRING },
                recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            extractedCreditData: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.INTEGER },
                totalDebt: { type: Type.NUMBER },
                utilization: { type: Type.NUMBER },
                inquiries: { type: Type.INTEGER },
                ageOfHistory: { type: Type.STRING },
                negativeItems: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      creditor: { type: Type.STRING },
                      type: { type: Type.STRING },
                      amount: { type: Type.NUMBER },
                      dateReported: { type: Type.STRING },
                      status: { type: Type.STRING },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const text = response.text || "{}";
    const cleanedText = cleanResponseText(text);
    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

export const assessDataBreachImpact = async (
  extractedCreditData: any
): Promise<any> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
      You are a Data Breach Specialist and FCRA Consultant.
      Based on the provided credit data metadata, determine if the person was likely active during ANY major data breaches.
      
      Specifically check for:
      - Equifax (2017)
      - Experian (2020/2021)
      - T-Mobile, AT&T, Ticketmaster
      - **Union Data Breaches** (e.g., SEIU, Teamsters, or public employee unions if employer data is visible or implied)
      - **Third-party vendor breaches** (e.g., payroll providers like MoveIt, medical providers like Change Healthcare, or any other third-party data handlers)
      
      CREDIT DATA:
      ${JSON.stringify(extractedCreditData)}
      
      TASK:
      1. Check "Age of History" and creditor list for overlaps with known breach dates and companies.
      2. Return a JSON assessment with a list of identified potential breaches.
      3. If likely a victim, your recommended actions MUST include visiting IdentityTheft.gov.
    `,
    config: {
      safetySettings: SAFETY_SETTINGS,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isEquifaxVictimLikely: { type: Type.BOOLEAN },
          isExperianVictimLikely: { type: Type.BOOLEAN },
          identifiedBreaches: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          reasoning: { type: Type.STRING },
          recommendedActions: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  const text = response.text || "{}";
  const cleanedText = cleanResponseText(text);
  return JSON.parse(cleanedText);
}

// --- Live API Helpers ---

export const createBlob = (data: Float32Array, sampleRate: number = 16000): { data: string; mimeType: string } => {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  
  let binary = '';
  const bytes = new Uint8Array(int16.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = btoa(binary);

  return {
    data: base64Data,
    mimeType: `audio/pcm;rate=${sampleRate}`,
  };
};

export const decodeAudioData = async (
  base64String: string,
  ctx: AudioContext,
  sampleRate: number = 24000
): Promise<AudioBuffer> => {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const numChannels = 1;
  const frameCount = dataInt16.length; 
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};

// Helper for sending text via chat for generating letters
export const generateDisputeContent = async (
  template: string,
  data: any
): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  // 1. PRE-FORMAT DATA: Explicitly handle negative items
  let formattedDisputeItems = "";
  if (data.negativeItems && Array.isArray(data.negativeItems) && data.negativeItems.length > 0) {
    formattedDisputeItems = data.negativeItems.map((item: any, index: number) => {
      return `${index + 1}. ${item.creditor} (Account: ${item.id || 'Unknown'}) - Status: ${item.status}. Reason: Unverified account information and/or date discrepancies found during audit.`;
    }).join("\n\n");
  } else {
    formattedDisputeItems = "No specific items listed. Please review the attached report.";
  }

  // Create context object
  const contextData = {
    personalInfo: data.personalInfo || {},
    disputeItemsFormatted: formattedDisputeItems,
    breachContext: data.breachContext || "None"
  };

  const cleanData = JSON.stringify(contextData);

  // STRICT system instruction to behave as a document engine, not a chat bot.
  // RELAXED TONE to avoid Safety Filters blocking "Legal" advice.
  const systemInstruction = `
    You are a Document Formatting Assistant.
    
    TASK:
    Fill in the provided template with the provided user data.
    
    RULES:
    1. Your ONLY output must be the final document text.
    2. Do NOT add introductions, conclusions, markdown code blocks, or conversational filler (e.g. "Here is your letter").
    3. Replace [Placeholders] in the template with values from CLIENT_DATA.
    4. Replace {{DISPUTE_ITEMS_LIST}} with 'disputeItemsFormatted' from CLIENT_DATA.
    5. If a placeholder data is missing, leave the placeholder in the text (e.g. [SSN]).
    6. Keep the text professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { text: `TEMPLATE:\n${template}` },
          { text: `CLIENT_DATA:\n${cleanData}` }
        ]
      },
      config: {
        safetySettings: SAFETY_SETTINGS, // CRITICAL: Disable safety blocks for dispute terms (Fraud, Theft, etc)
        systemInstruction: systemInstruction,
        temperature: 0.3,
      }
    });
    
    const rawText = response.text || "";
    // Clean up if the model still adds markdown wrappers despite instructions
    return cleanResponseText(rawText);

  } catch (err) {
    console.error("Letter Generation Error:", err);
    throw new Error("Failed to generate letter. Please try again.");
  }
};