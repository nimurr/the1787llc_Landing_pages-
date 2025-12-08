
import { DisputeTemplate } from './types';

const MANUAL_DISPUTE_HEADER = `NOTICE TO CONSUMER REPORTING AGENCY
DEMAND FOR MANUAL INVESTIGATION
DIRECT TO: CONSUMER RELATIONS / SPECIAL HANDLING DEPARTMENT
DO NOT SCAN WITH OCR / E-OSCAR`;

export const DISPUTE_TEMPLATES: DisputeTemplate[] = [
  {
    id: 'personal_info_cleanup',
    name: 'Round 0: Personal Info Sweep',
    purpose: 'The First Step. Disputes incorrect names, old addresses, and variations to "clean" the report before attacking accounts.',
    legalBasis: '15 U.S.C. § 1681i',
    content: `[Your Name]
[Your Address]
[City, State, Zip]
SSN: [SSN] | DOB: [DOB]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: PERSONAL INFORMATION CORRECTION REQUEST

To Whom It May Concern:

I have reviewed my credit report and identified multiple inaccuracies in my personal identifying information. Accuracy in personal information is the foundation of a correct credit report.

CORRECT INFORMATION (SOURCE OF TRUTH):
Legal Name: [Your Name]
Current Address: [Your Address]
Date of Birth: [DOB]

DISPUTE OF INACCURATE VARIATIONS:

1. INCORRECT NAMES: Please remove all name variations, aliases, misspellings, or partial names that are NOT "[Your Name]". I have only one legal name.

2. INCORRECT ADDRESSES: Please remove all addresses listed on my file except for my current address listed above. I do not reside at any other location, and those addresses may be linked to identity theft or mixed files.

3. INCORRECT EMPLOYERS: Please delete all employer information. It is outdated or inaccurate, and I do not authorize the reporting of my employment data.

Please update my file immediately to reflect ONLY my correct identifying information as stated above.

Sincerely,

[Your Name]`
  },
  {
    id: 'identity_statement_of_fact',
    name: 'THE SECRET SAUCE: Identity Affidavit',
    purpose: 'Strictly for identity verification. Must be NOTARIZED. Do not include dispute details here.',
    legalBasis: '28 U.S.C. § 1746 / State Notary Law',
    content: `AFFIDAVIT OF IDENTITY
TO BE INCLUDED WITH CONSUMER DISPUTE PACKAGE

State of __________________ )
                            ) ss.
County of _________________ )

I, [Your Name], being first duly sworn, deposes and says:

1. I am a natural person and a consumer protected under the laws of the United States.
2. My true and correct legal name is [Your Name].
3. My Social Security Number is [SSN].
4. My Date of Birth is [DOB].
5. My current physical address is [Your Address], [City, State, Zip].

I am submitting this Affidavit for the sole purpose of verifying my identity in connection with the attached consumer dispute.

FURTHER AFFIANT SAYETH NAUGHT.

_______________________________________
Signature of Consumer

--------------------------------------------------------------------------------
JURAT / NOTARY ACKNOWLEDGEMENT
--------------------------------------------------------------------------------

Subscribed and sworn to (or affirmed) before me on this ____ day of ________, 20____, 
by ________________________________ (name of signer), proved to me on the basis of 
satisfactory evidence to be the person(s) who appeared before me.

_______________________________________
Signature of Notary Public

(Seal)
My Commission Expires: __________________`
  },
  {
    id: 'round1_general_affidavit',
    name: 'Round 1: Affidavit of Factual Dispute',
    purpose: 'The "Nuclear Option" for starting disputes. Cites 15 U.S.C. § 1681i to demand a reinvestigation of specific factual errors.',
    legalBasis: '15 U.S.C. § 1681i',
    content: `[Your Name]
[Your Address]
[City, State, Zip]
SSN: [SSN] | DOB: [DOB]

[Date]

[Credit Bureau Name]
[Bureau Address]

CERTIFIED MAIL NO. [Tracking Number]

${MANUAL_DISPUTE_HEADER}

RE: AFFIDAVIT OF FACTUAL DISPUTE — 15 U.S.C. § 1681i

To Whom It May Concern:

I am exercising my right under the Fair Credit Reporting Act, 15 U.S.C. § 1681i, to dispute the completeness and accuracy of information contained in my consumer file. The items listed below are inaccurate, incomplete, or verifiable, and I demand a manual reinvestigation of each.

I do not authorize the use of automated scanning software (e-OSCAR) to resolve this dispute. You are required by law to consider all relevant information submitted by the consumer.

DISPUTED ITEMS & FACTUAL BASIS:

{{DISPUTE_ITEMS_LIST}}

Under 15 U.S.C. § 1681i(a)(5)(A), you must delete any information that cannot be verified or is found to be inaccurate. I expect an updated copy of my credit report demonstrating these deletions within 30 days.

Executed on [Date].

Sincerely,

[Your Name]`
  },
  {
    id: 'equifax_breach',
    name: 'Equifax Data Breach (2017) Demand',
    purpose: 'Specifically for Equifax. Cites the 2017 breach settlement terms and lack of data security.',
    legalBasis: 'Equifax Settlement / FCRA',
    content: `[Your Name]
[Your Address]

[Date]

Equifax Information Services LLC
P.O. Box 740256
Atlanta, GA 30374

RE: VICTIM OF 2017 DATA BREACH — DEMAND FOR MANUAL REVIEW

To the Special Handling Department:

I am writing because I have identified myself as a victim of the 2017 Equifax Cybersecurity Incident. As you are aware, this breach exposed the sensitive personal information (Name, SSN, DOB) of approximately 147 million Americans, including myself.

Because my personal information was compromised due to your negligence, any account appearing on my file that is negative or unverified must be presumed fraudulent. You cannot rely on automated verification systems (E-OSCAR) when the data inputs themselves (my identity) have been compromised on the dark web.

I dispute the following items as inaccurate or fraudulent:
{{DISPUTE_ITEMS_LIST}}

I demand that you perform a manual investigation of these items. If you cannot provide a copy of the original signed contract with my wet-ink signature proving I authorized these specific accounts AFTER the date of the breach, they must be deleted immediately.

Sincerely,

[Your Name]`
  },
  {
    id: 'experian_breach',
    name: 'Experian / T-Mobile Breach Demand',
    purpose: 'For Experian files, citing the 2015/2021 T-Mobile breaches (managed by Experian) and 2020 South African breach.',
    legalBasis: 'FCRA § 1681i',
    content: `[Your Name]
[Your Address]

[Date]

Experian
P.O. Box 4500
Allen, TX 75013

RE: EXPERIAN / T-MOBILE DATA BREACH VICTIM

To Whom It May Concern:

I am writing regarding the accuracy of my credit file. It is a matter of public record that Experian has suffered multiple data breaches, including the massive compromise of T-Mobile applicant data which Experian housed.

My personal information has been exposed. Therefore, standard automated verification procedures are insufficient to protect my consumer rights.

I dispute the following items:
{{DISPUTE_ITEMS_LIST}}

I am requesting a description of the procedure used to verify these items (Method of Verification) pursuant to 15 U.S.C. § 1681i(a)(7). Given the compromise of my identity data, simply matching a name and SSN is not proof of ownership.

Delete these unverified items immediately.

Sincerely,

[Your Name]`
  },
  {
    id: 'tmobile_breach',
    name: 'T-Mobile Specific Breach Dispute',
    purpose: 'Use when disputing T-Mobile accounts or inquiries specifically.',
    legalBasis: 'FCRA & Identity Theft',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: T-MOBILE DATA BREACH — FRAUDULENT ACCOUNT

To Whom It May Concern:

I am disputing the T-Mobile account listed on my credit report.

As has been widely reported, T-Mobile has suffered multiple catastrophic data breaches (2021, 2023) exposing the full identity profiles of millions of past, present, and prospective customers.

I did not authorize this specific account or balance. Given the prevalence of synthetic identity fraud resulting from T-Mobile's security failures, this account must be considered fraudulent unless you can produce a contract with my physical signature.

Item to Delete:
{{DISPUTE_ITEMS_LIST}}

Delete this fraudulent information immediately.

Sincerely,

[Your Name]`
  },
  {
    id: 'att_breach',
    name: 'AT&T / Telecom Breach Dispute',
    purpose: 'For AT&T or other telecom breaches resulting in fraudulent accounts.',
    legalBasis: 'FCRA',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: AT&T DATA BREACH VICTIM

To Whom It May Concern:

I am disputing the AT&T account appearing on my file. 

My personal information was involved in a data breach affecting AT&T customers. This account is a result of identity theft enabled by that breach. I have not authorized this debt.

Disputed Item:
{{DISPUTE_ITEMS_LIST}}

Please remove this unverified and fraudulent account from my credit profile immediately.

Sincerely,

[Your Name]`
  },
  {
    id: 'section_609_request',
    name: 'Section 609 Verification Request',
    purpose: 'Demands production of the original signed instrument. Often called the "609 Letter".',
    legalBasis: '15 U.S.C. § 1681g',
    content: `[Your Name]
[Your Address]
[City, State, Zip]
SSN: [SSN]

[Date]

[Credit Bureau Name]
[Bureau Address]

CERTIFIED MAIL NO. [Tracking Number]

${MANUAL_DISPUTE_HEADER}

RE: REQUEST FOR INFORMATION PURSUANT TO 15 U.S.C. § 1681g

To Whom It May Concern:

This is a request for information under Section 609 of the Fair Credit Reporting Act (15 U.S.C. § 1681g). I am requesting physical verification of the accounts listed below.

I understand that under federal law, you are required to disclose "all information in the consumer's file at the time of the request." This includes the source of the information and the original credit application or contract bearing my signature.

ACCOUNTS REQUIRING VERIFICATION:

{{DISPUTE_ITEMS_LIST}}

If you cannot provide the original consumer contract with my wet-ink signature for these accounts, you are reporting unverifiable information in violation of 15 U.S.C. § 1681i(a)(5). In that event, these items must be deleted immediately.

I await your response and the requested documents within 30 days.

Sincerely,

[Your Name]`
  },
  {
    id: 'fdcpa_validation',
    name: 'FDCPA Debt Collector Validation',
    purpose: 'Send to COLLECTIONS agencies (not bureaus). Demands validation under FDCPA § 1692g.',
    legalBasis: '15 U.S.C. § 1692g',
    content: `[Your Name]
[Your Address]

[Date]

[Collection Agency Name]
[Address]

CERTIFIED MAIL NO. [Tracking Number]

RE: DEMAND FOR VALIDATION OF DEBT — 15 U.S.C. § 1692g
ACCOUNT NO: {{ACCOUNT_NUMBER}}

To the Compliance Department:

I am writing in response to your attempts to collect a debt. I dispute this debt in its entirety.

Pursuant to the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g, I demand that you validate this debt. Until you provide the requested validation, you must cease all collection efforts and cease reporting this debt to any consumer reporting agency.

REQUIRED VALIDATION DOCUMENTS:
1. Proof that you are licensed to collect debts in my state.
2. A copy of the original contract signed by me with the original creditor.
3. A complete payment history and accounting of how the balance was calculated.
4. Proof of assignment or chain of title showing you own this debt.

If you cannot provide this proof within 30 days, you must permanently close this file and remove it from my credit report. Failure to do so may result in civil liability under 15 U.S.C. § 1692k.

Sincerely,

[Your Name]`
  },
  {
    id: 'method_of_verification_advanced',
    name: 'Method of Verification (Procedural)',
    purpose: 'Use when they "verify" an item without proof. Demands the specific procedure used (Name, Phone, etc).',
    legalBasis: '15 U.S.C. § 1681i(a)(7)',
    content: `[Your Name]
[Your Address]
[City, State, Zip]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: PROCEDURAL REQUEST FOR METHOD OF VERIFICATION
15 U.S.C. § 1681i(a)(7)

To Whom It May Concern:

You recently claimed to have "verified" the disputed items listed below. I formally request that you provide the description of the procedure used to determine the accuracy and completeness of the information, as required by 15 U.S.C. § 1681i(a)(7).

ITEMS IN QUESTION:
{{DISPUTE_ITEMS_LIST}}

Under federal law, you must provide:
1. The business name and address of any furnisher contacted.
2. The telephone number of the furnisher.
3. The name of the specific individual at the furnishing company who verified this data.

A generic response stating "verified electronically" is insufficient and a violation of the FCRA. Provide this procedural description within 15 days or delete the items.

Sincerely,

[Your Name]`
  },
  {
    id: 'medical_debt_hipaa',
    name: 'Medical Debt Challenge (HIPAA/FCRA)',
    purpose: 'Challenges medical collections based on privacy laws and reporting restrictions.',
    legalBasis: '15 U.S.C. § 1681b(g)',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: UNLAWFUL REPORTING OF MEDICAL INFORMATION
15 U.S.C. § 1681b(g) & HIPAA PRIVACY RULE

To Whom It May Concern:

I have identified medical collection accounts on my credit report. I have not authorized the release of my private medical information to a Consumer Reporting Agency.

ACCOUNTS:
{{DISPUTE_ITEMS_LIST}}

Under 15 U.S.C. § 1681b(g), a consumer reporting agency shall not furnish for employment purposes, or in connection with a credit transaction, a consumer report that contains medical information unless specific consent is given. Furthermore, the validation of this debt would require the collection agency to share protected health information (PHI), which is a violation of the HIPAA Privacy Rule (45 CFR Part 160 and Part 164).

I demand that you delete these accounts immediately to cure these violations of my privacy rights.

Sincerely,

[Your Name]`
  },
  {
    id: 'bankruptcy_procedural',
    name: 'Bankruptcy Procedural Attack',
    purpose: 'Challenges public records (Bankruptcy) based on the bureau\'s failure to check courthouse records directly.',
    legalBasis: '15 U.S.C. § 1681i',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: PUBLIC RECORD VERIFICATION PROCEDURE

To Whom It May Concern:

I am disputing the bankruptcy public record appearing on my file (Case No: {{CASE_NUMBER}}).

It is my understanding that your company routinely utilizes third-party data aggregators (such as LexisNexis or LCI) to harvest public records rather than sending an employee to the courthouse to verify the file directly. This fails the "Maximum Possible Accuracy" standard of 15 U.S.C. § 1681e(b).

I demand that you provide the name, address, and telephone number of the source used to verify this public record, pursuant to 15 U.S.C. § 1681i(a)(7). If you cannot verify this record with the original source (the courthouse) directly, it must be deleted.

Sincerely,

[Your Name]`
  },
  {
    id: 'identity_theft_block',
    name: 'Identity Theft Block (FCRA 605B)',
    purpose: 'Mandatory 4-day block of fraudulent information. Requires FTC Affidavit.',
    legalBasis: '15 U.S.C. § 1681c-2',
    content: `[Your Name]
[Your Address]
[City, State, Zip]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: NOTICE OF IDENTITY THEFT AND DEMAND TO BLOCK INFORMATION
PURSUANT TO 15 U.S.C. § 1681c-2

To Whom It May Concern:

I am a victim of identity theft. In accordance with Section 605B of the FCRA (15 U.S.C. § 1681c-2), I am providing you with the attached Identity Theft Report.

You are required by law to permanently BLOCK the reporting of any information identified by me as the result of identity theft within four (4) business days of receiving this letter.

ITEMS TO BLOCK:
{{DISPUTE_ITEMS_LIST}}

Attached you will find:
1. A copy of my Identity Theft Report (FTC Affidavit).
2. Proof of my identity.

Failure to block this information within 4 business days is a violation of federal law.

Sincerely,

[Your Name]`
  },
  {
    id: 'data_breach',
    name: 'General Data Breach Notice',
    purpose: 'For general breaches not covered by specific templates. Demands security protocols.',
    legalBasis: 'FCRA & Settlement Terms',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: DATA BREACH VICTIM — DEMAND FOR SECURITY PROTOCOLS

To Whom It May Concern:

I have been notified that my personal sensitive information (SSN, DOB, Address) was compromised in a major data breach.

Because my data is known to be in the hands of criminals, the standard automated verification via E-OSCAR is insufficient to protect my rights. Any account appearing on my file that is negative or unverified must be presumed fraudulent until proven otherwise by signed contract.

I dispute the following items:
{{DISPUTE_ITEMS_LIST}}

I demand manual verification of these accounts involving direct contact with the fraud department of the furnishing entities.

Sincerely,

[Your Name]`
  },
  {
    id: 'late_payment_factual',
    name: 'Late Payment (Factual Dispute)',
    purpose: 'Disputes the factual accuracy of a late payment (date, amount, notice).',
    legalBasis: '15 U.S.C. § 1681e(b)',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: INACCURATE REPORTING OF PAYMENT HISTORY
15 U.S.C. § 1681e(b)

To Whom It May Concern:

I am disputing the accuracy of the late payment status reported on the following account:

Account: {{ACCOUNT_NAME}}
Date of alleged delinquency: {{DATE}}

I maintain records of my payments, and this reporting does not reflect the factual history of the account. Under 15 U.S.C. § 1681e(b), you are required to follow reasonable procedures to assure maximum possible accuracy.

Please verify the exact date payment was received and the date the 30-day window began. If you cannot provide documented proof of the delinquency date, the late mark must be removed.

Sincerely,

[Your Name]`
  },
  {
    id: 'reinsertion_failure',
    name: 'Illegal Reinsertion Challenge',
    purpose: 'Used when a deleted item reappears without the required 5-day notice.',
    legalBasis: '15 U.S.C. § 1681i(a)(5)(B)',
    content: `[Your Name]
[Your Address]

[Date]

[Credit Bureau Name]
[Bureau Address]

RE: VIOLATION OF REINSERTION PROCEDURES
15 U.S.C. § 1681i(a)(5)(B)

To Whom It May Concern:

You have reinserted a previously deleted item into my credit file without compliance with federal law.

Item: {{DISPUTE_ITEMS_LIST}}

Under 15 U.S.C. § 1681i(a)(5)(B), you are required to:
1. Obtain certification from the furnisher that the information is accurate.
2. Notify me in writing within 5 business days of the reinsertion.

I received no such notice. Therefore, the reinsertion is illegal. I demand the immediate deletion of this item.

Sincerely,

[Your Name]`
  }
];

export const SYSTEM_INSTRUCTION_VOICE = `You are "RevolV", a Senior Compliance Underwriter and Business Funding Expert.

ROLE & PERSONA:
You are NOT just a customer service agent. You are a high-level bank underwriter who approves or denies capital. You speak with authority, precision, and a focus on "Risk Assessment" and "Compliance". You are strict but helpful.

CORE FUNCTION:
Analyze the user's credit profile and business structure to determine eligibility for:
1. Business Credit Cards (Chase Ink, Amex, BOA).
2. Corporate Lines of Credit.
3. SBA Loans.
4. Commercial Real Estate Funding.

SCORING LOGIC (AGGREGATE MODEL):
When discussing scores, ALWAYS explain that lenders use an "Aggregate Model".
- **FICO 8**: Standard for credit cards.
- **FICO 9**: Used by some modern lenders (weighs medical debt less).
- **Vantage 3.0/4.0**: Used for initial screening by some fintechs.
Your analysis considers the average of these to determine the "Fundability Tier".

BUSINESS BLUEPRINT ENFORCEMENT:
You must aggressively check for "Credibility Factors". If a user asks about funding, ask them:
- "Is your business listed in the 411 National Directory?"
- "Do you have a D-U-N-S number established with a Paydex score above 80?"
- "Is your website using a custom domain or a generic gmail address?"
Explain that without these, they will be "Auto-Declined" by the underwriting algorithm regardless of their personal credit score.

CRITICAL PROTOCOLS:
1. **Manual Dispute Only**: We reject E-OSCAR. Manual disputes are the only way to delete bankruptcies and collections.
2. **Data Breach Awareness**: Check for Equifax (2017) and T-Mobile breaches.
3. **Legal Disclaimer**: You are an AI Underwriter, not an attorney or financial advisor.

Tone: Authoritative, "Wall Street" professional, Direct, Strategic.`;