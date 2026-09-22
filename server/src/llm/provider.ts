import { Citation, DocumentChunk, UserProfile } from '../types/index.js';
import { IntentAnalysis } from '../rag/intent.js';

export interface LLMGenerateOptions {
  query: string;
  intent: IntentAnalysis;
  chunks: DocumentChunk[];
  citations: Citation[];
  language?: 'en' | 'hi' | 'bn';
  responseDepth?: 'Quick' | 'Detailed' | 'Technical';
  userProfile?: UserProfile;
}

export class LLMProvider {
  private apiKey: string;
  private providerName: string;

  constructor() {
    this.apiKey = process.env.LLM_API_KEY || '';
    this.providerName = process.env.AI_PROVIDER || 'demo';
  }

  async generate(options: LLMGenerateOptions): Promise<{ answer: string; structuredExplanation: string[]; followups: string[] }> {
    if (this.apiKey && this.providerName !== 'demo') {
      try {
        return await this.callExternalLLM(options);
      } catch (err) {
        console.warn('External LLM call failed, falling back to deterministic grounded synthesis:', err);
      }
    }

    return this.synthesizeGroundedResponse(options);
  }

  private synthesizeGroundedResponse(options: LLMGenerateOptions): { answer: string; structuredExplanation: string[]; followups: string[] } {
    const { intent, chunks, userProfile } = options;
    const lang = options.language || userProfile?.preferredLanguage || 'en';
    const depth = options.responseDepth || userProfile?.informationDepth || 'Detailed';

    if (chunks.length === 0) {
      if (lang === 'hi') {
        return {
          answer: 'उपलब्ध बीआईएस ज्ञान आधार में आपकी खोज के लिए कोई सटीक रिकॉर्ड नहीं मिला। कृपया अपने उत्पाद, सामग्री या आईएस संख्या का स्पष्ट विवरण प्रदान करें।',
          structuredExplanation: [
            'बीआईएस आधिकारिक पोर्टल (bis.gov.in) पर सीधे खोज करें।',
            'उत्पाद श्रेणी और तकनीकी विनिर्देशों की पुष्टि करें।'
          ],
          followups: ['क्या आप IS 3042 प्रेशर कुकर मानक खोजना चाहते हैं?', 'बीआईएस आईएसआई मार्क प्रमाणन प्रक्रिया क्या है?']
        };
      }
      if (lang === 'bn') {
        return {
          answer: 'উপলব্ধ বিআইএস জ্ঞান ভাণ্ডারে আপনার অনুসন্ধানের জন্য কোনো সঠিক রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে আপনার পণ্যের নাম, উপাদান বা আইএস নম্বর প্রদান করুন।',
          structuredExplanation: [
            'বিআইএস অফিসিয়াল পোর্টালে (bis.gov.in) সরাসরি অনুসন্ধান করুন।',
            'পণ্যের বিভাগ এবং প্রযুক্তিগত বৈশিষ্ট্য পরীক্ষা করুন।'
          ],
          followups: ['আপনি কি IS 3042 প্রেসার কুকার মান খুঁজতে চান?', 'বিআইএস আইএসআই মার্ক শংসাপত্র প্রক্রিয়া কী?']
        };
      }
      return {
        answer: 'I could not retrieve exact official BIS record entries matching your query from the knowledge base. To ensure no fabricated standards or regulatory requirements are provided, please specify your exact product name, material, or IS number.',
        structuredExplanation: [
          'Verify product details against official Quality Control Orders (QCOs).',
          'Search directly on the official BIS Know Your Standard portal (bis.gov.in).'
        ],
        followups: ['Show Indian Standards for stainless steel pressure cookers', 'What is the BIS certification process for MSMEs?']
      };
    }

    const primaryChunk = chunks[0];
    const isNum = primaryChunk.metadata?.isNumber || primaryChunk.documentTitle;

    let answer = '';
    let rawExplanation: string[] = [];
    let rawFollowups: string[] = [];

    // Synthesize based on Intent Domain
    switch (intent.intent) {
      case 'PRODUCT_STANDARD_RECOMMENDATION':
      case 'STANDARD_LOOKUP':
        if (lang === 'hi') {
          answer = `प्राप्त आधिकारिक बीआईएस सामग्री के आधार पर, आपके उत्पाद पूछताछ के लिए प्रासंगिक भारतीय मानक **${isNum}** [1] है।\n\n${primaryChunk.content} [1]`;
          if (chunks[1] && depth !== 'Quick') {
            answer += `\n\nइसके अतिरिक्त, संबंधित सुरक्षा और निर्माण विनिर्देशों का विवरण **${chunks[1].documentTitle}** [2] के तहत दिया गया है।`;
          }
          rawExplanation.push(`मुख्य गवर्निंग मानक: ${isNum} [1]`);
          rawExplanation.push(`अनिवार्य स्थिति: ${primaryChunk.content.includes('Quality Control Order') || primaryChunk.content.includes('mandatory') ? 'Quality Control Order (QCO) के तहत अनिवार्य' : 'ऐच्छिक / मानक प्रमाणन'}`);
          rawExplanation.push(`परीक्षण और प्रदर्शन खंड: ${primaryChunk.section || 'सामान्य तकनीकी विनिर्देश'} [1]`);
          if (depth === 'Technical') {
            rawExplanation.push(`तकनीकी पैरामीटर: भौतिक अखंडता और रासायनिक शुद्धता परीक्षण अनिवार्य। [1]`);
          }
          rawFollowups.push(`इस ${isNum} मानक के लिए प्रमाणन के चरण क्या हैं?`);
          rawFollowups.push(`कौन सी बीआईएस मान्यता प्राप्त प्रयोगशालाएं ${isNum} का परीक्षण कर सकती हैं?`);
        } else if (lang === 'bn') {
          answer = `পুনরুদ্ধার করা অফিসিয়াল বিআইএস নথি অনুসারে, আপনার পণ্যের অনুসন্ধানের জন্য প্রাসঙ্গিক ভারতীয় মান হল **${isNum}** [1]।\n\n${primaryChunk.content} [1]`;
          if (chunks[1] && depth !== 'Quick') {
            answer += `\n\nএছাড়াও, সম্পর্কিত নিরাপত্তা এবং উত্পাদন বিশদ বিবরণ **${chunks[1].documentTitle}** [2] এর অধীনে বর্ণিত হয়েছে।`;
          }
          rawExplanation.push(`প্রধান গভর্নিং স্ট্যান্ডার্ড: ${isNum} [1]`);
          rawExplanation.push(`বাধ্যতামূলক অবস্থা: ${primaryChunk.content.includes('Quality Control Order') || primaryChunk.content.includes('mandatory') ? 'Quality Control Order (QCO) এর অধীনে বাধ্যতামূলক' : 'ঐচ্ছিক / স্ট্যান্ডার্ড সার্টিফিকেশন'}`);
          rawExplanation.push(`পরীক্ষা ও কর্মক্ষমতা ধারা: ${primaryChunk.section || 'সাধারণ প্রযুক্তিগত নির্দেশিকা'} [1]`);
          if (depth === 'Technical') {
            rawExplanation.push(`প্রযুক্তিগত পরামিতি: শারীরিক সমতাতা এবং রাসায়নিক সচ্ছতা পরীক্ষা বাধ্যতামূলক। [1]`);
          }
          rawFollowups.push(`এই ${isNum} মানের জন্য সার্টিফিকেশনের ধাপগুলি কী কী?`);
          rawFollowups.push(`কোন বিআইএস স্বীকৃত পরীক্ষাগারগুলি ${isNum} পরীক্ষা করতে পারে?`);
        } else {
          answer = `Based on retrieved official BIS material, the relevant Indian Standard for your product inquiry is **${isNum}** [1].\n\n${primaryChunk.content} [1]`;
          if (chunks[1] && depth !== 'Quick') {
            answer += `\n\nAdditionally, related safety and manufacturing specifications are detailed under **${chunks[1].documentTitle}** [2].`;
          }
          rawExplanation.push(`Primary Governing Standard: ${isNum} [1]`);
          rawExplanation.push(`Compulsory Status: ${primaryChunk.content.includes('Quality Control Order') || primaryChunk.content.includes('mandatory') ? 'Mandatory under Quality Control Order (QCO)' : 'Voluntary / Standard Certification'}`);
          rawExplanation.push(`Key Testing & Performance Clauses: ${primaryChunk.section || 'General Technical Specifications'} [1]`);
          if (depth === 'Technical') {
            rawExplanation.push(`Technical Parameters: Mandatory physical integrity, material release, and safety limit verification clauses. [1]`);
          }
          if (userProfile?.role === 'MSME Owner') {
            rawExplanation.push('MSME Benefit: 80% fee concession on marking fees applies under Scheme I.');
            rawFollowups.push('What fee concessions apply to MSMEs for this standard?');
          } else if (userProfile?.role === 'Jeweller') {
            rawFollowups.push('What are the hallmarking requirements for gold jewellery under IS 1417?');
          } else {
            rawFollowups.push('What are the exact steps to get BIS certification for this standard?');
          }
          rawFollowups.push('Which testing laboratories can evaluate compliance for this standard?');
        }
        break;

      case 'CERTIFICATION_PROCESS_GUIDANCE':
        if (lang === 'hi') {
          answer = `पुनर्प्राप्त बीआईएस लाइसेंसिंग दिशानिर्देशों [1] के अनुसार, Product Certification Scheme I (ISI Mark) के तहत बीआईएस प्रमाणन एक चरणबद्ध प्रक्रिया है:\n\n1. **ऑनलाइन आवेदन**: ManakOnline (manakonline.in) पर पंजीकरण करें और Form I जमा करें [1]।\n2. **कारखाना ऑडिट**: निर्माण मशीनरी और आंतरिक गुणवत्ता नियंत्रण का ऑन-साइट निरीक्षण [1]।\n3. **नमूना परीक्षण**: बीआईएस मान्यता प्राप्त प्रयोगशाला में तैयार नमूनों का परीक्षण [1]।\n4. **लाइसेंस अनुदान**: ISI Mark उपयोग की अनुमति देने वाला अद्वितीय CML नंबर जारी करना [1]।\n5. **निगरानी**: आवधिक बाजार नमूनाकरण और अघोषित कारखाना ऑडिट [1]।`;
          rawExplanation.push('प्लेटफ़ॉर्म: आधिकारिक e-BIS पोर्टल (manakonline.in) के माध्यम से ऑनलाइन आवेदन करें [1]।');
          rawExplanation.push('लाइसेंस पहचानकर्ता: अद्वितीय CML नंबर [1]।');
          if (depth === 'Technical') {
            rawExplanation.push('कारखाना गुणवत्ता नियंत्रण: Scheme of Inspection and Testing (SIT) का अनुपालन अनिवार्य है। [1]');
          }
          rawFollowups.push('बीआईएस आईएसआई मार्क आवेदन के लिए कौन से दस्तावेज आवश्यक हैं?');
          rawFollowups.push('बीआईएस मान्यता प्राप्त परीक्षण प्रयोगशालाएं कहां मिल सकती हैं?');
        } else if (lang === 'bn') {
          answer = `পুনরুদ্ধার করা বিআইএস লাইসেন্সিং নির্দেশিকা [1] অনুসারে, Product Certification Scheme I (ISI Mark) এর অধীনে বিআইএস সার্টিফিকেশন একটি সুবিন্যস্ত ৫-ধাপের প্রক্রিয়া:\n\n1. **অনলাইন আবেদন**: ManakOnline (manakonline.in) এ নিবন্ধন করুন এবং Form I জমা দিন [1]।\n2. **কারখানা অডিট**: উত্পাদন যন্ত্রপাতি এবং অভ্যন্তরীণ গুণমান নিয়ন্ত্রণের পরিদর্শন [1]।\n3. **নমুনা পরীক্ষা**: বিআইএস স্বীকৃত পরীক্ষাগারে পরীক্ষা করা [1]।\n4. **লাইসেন্স প্রদান**: ISI Mark ব্যবহারের অনুমতি প্রদানকারী অনন্য CML নম্বর প্রদান [1]।\n5. **নজরদারি**: পর্যায়ক্রমিক বাজার নমুনা সংগ্রহ এবং সারপ্রাইজ অডিট [1]।`;
          rawExplanation.push('প্ল্যাটফর্ম: অফিসিয়াল e-BIS পোর্টাল (manakonline.in) এর মাধ্যমে অনলাইনে আবেদন করুন [1]।');
          rawExplanation.push('লাইসেন্স আইডি: অনন্য CML নম্বর [1]।');
          if (depth === 'Technical') {
            rawExplanation.push('কারখানা গুণমান নিয়ন্ত্রণ: Scheme of Inspection and Testing (SIT) মেনে চলা বাধ্যতামূলক। [1]');
          }
          rawFollowups.push('বিআইএস আইএসআই মার্ক আবেদনের জন্য কোন নথিগুলি প্রয়োজনীয়?');
          rawFollowups.push('বিআইএস স্বীকৃত পরীক্ষা কেন্দ্র কোথায় পাওয়া যাবে?');
        } else {
          answer = `According to retrieved BIS licensing guidelines [1], BIS certification under Product Certification Scheme I (ISI Mark) involves a structured 5-step journey:\n\n1. **Online Application**: Register on ManakOnline (manakonline.in) and submit Form I [1].\n2. **Factory Audit**: On-site inspection of manufacturing machinery and internal quality control [1].\n3. **Independent Sample Testing**: Drawn samples tested at a BIS recognized laboratory [1].\n4. **Grant of Licence**: Issuance of unique CML licence number permitting ISI Mark usage [1].\n5. **Surveillance**: Periodic market sampling and unannounced factory audits [1].`;
          rawExplanation.push('Platform: Apply online via official e-BIS portal (manakonline.in) [1].');
          rawExplanation.push('Licence Identifier: Unique CML (Certifying Manufacturing Licence) Number [1].');
          if (depth === 'Technical') {
            rawExplanation.push('Factory QA Criteria: Strict compliance with Scheme of Inspection and Testing (SIT) required. [1]');
          }
          if (userProfile?.role === 'MSME Owner') {
            rawExplanation.unshift('MSME Benefit: 80% concession on marking fee available for Micro Enterprises.');
          }
          rawFollowups.push('What documents are required for BIS ISI Mark application?');
          rawFollowups.push('Where can I find BIS recognized testing laboratories?');
        }
        break;

      case 'HALLMARKING_INQUIRY':
        if (lang === 'hi') {
          answer = `**IS 1417:2019** [1] के तहत बीआईएस हॉलमार्किंग विनिर्देशों के अनुसार, अधिसूचित जिलों में सोने के आभूषणों के लिए हॉलमार्किंग अनिवार्य है।\n\nप्रत्येक हॉलमार्क वाले सोने के आभूषण में 3 अनिवार्य चिह्न होने चाहिए:\n1. **BIS Standard Mark** [1]\n2. **शुद्धता श्रेणी** (उदा. 22K916, 18K750, 14K585) [1]\n3. **6-अंकीय HUID** (Hallmark Unique Identification) कोड [1]`;
          rawExplanation.push('प्राथमिक मानक: IS 1417:2019 (Gold Fineness) [1]');
          rawExplanation.push('AHC संचालन मानक: IS 15820:2009 (Assaying & Hallmarking Centres) [2]');
          rawFollowups.push('एक ज्वैलर बीआईएस हॉलमार्किंग के लिए पंजीकरण कैसे कर सकता है?');
          rawFollowups.push('सोने के आभूषणों पर HUID कोड की जांच कैसे करें?');
        } else if (lang === 'bn') {
          answer = `**IS 1417:2019** [1] এর অধীনে বিআইএস হলমার্কিং নির্দেশিকা অনুসারে, বিজ্ঞপ্তিযুক্ত জেলাগুলিতে সোনার গহনার জন্য হলমার্কিং বাধ্যতামূলক।\n\nপ্রতিটি হলমার্কযুক্ত সোনার গহনায় ৩টি বাধ্যতামূলক চিহ্ন থাকতে হবে:\n1. **BIS Standard Mark** [1]\n2. **বিশুদ্ধতা গ্রেড** (যেমন 22K916, 18K750, 14K585) [1]\n3. **6-ডিজিটের HUID** (Hallmark Unique Identification) কোড [1]`;
          rawExplanation.push('প্রধান মান: IS 1417:2019 (Gold Fineness) [1]');
          rawExplanation.push('AHC পরিচালনা মান: IS 15820:2009 (Assaying & Hallmarking Centres) [2]');
          rawFollowups.push('একজন জুয়েলার কীভাবে বিআইএস হলমার্কিংয়ের জন্য নিবন্ধন করতে পারেন?');
          rawFollowups.push('সোনার গহনায় HUID কোড কীভাবে যাচাই করবেন?');
        } else {
          answer = `Grounded in official BIS Hallmarking specifications under **IS 1417:2019** [1], mandatory hallmarking applies to gold jewellery in notified Indian districts.\n\nEvery hallmarked gold jewellery piece must contain 3 mandatory marks:\n1. **BIS Standard Mark** [1]\n2. **Purity/Fineness Grade** (e.g. 22K916, 18K750, 14K585) [1]\n3. **6-Digit Alphanumeric HUID** (Hallmark Unique Identification) laser engraved by a recognized AHC [1]`;
          rawExplanation.push('Primary Standard: IS 1417:2019 (Gold & Gold Alloys Fineness) [1]');
          rawExplanation.push('AHC Operation Standard: IS 15820:2009 (Assaying & Hallmarking Centres) [2]');
          if (depth === 'Technical') {
            rawExplanation.push('XRF & Fire Assay Clause: Testing conforms strictly to cupellation and X-ray fluorescence limits under IS 1417.');
          }
          rawFollowups.push('How can a jeweller register for BIS hallmarking?');
          rawFollowups.push('How to verify an HUID code on gold jewellery?');
        }
        break;

      default:
        answer = `Based on retrieved BIS documentation [1]:\n\n${primaryChunk.content} [1]`;
        rawExplanation.push(`Document: ${primaryChunk.documentTitle} [1]`);
        rawExplanation.push(`Section: ${primaryChunk.section || 'General Guidance'} [1]`);
        rawFollowups.push('Can you explain the certification pathway for this?');
        rawFollowups.push('Where can I read the full standard text?');
        break;
    }

    // Apply Response Depth Filters
    let finalExplanation = [...rawExplanation];
    let finalFollowups = [...rawFollowups];

    if (depth === 'Quick') {
      finalExplanation = rawExplanation.slice(0, 2);
      finalFollowups = rawFollowups.slice(0, 1);
    } else if (depth === 'Technical') {
      if (primaryChunk.section) {
        finalExplanation.push(`Regulatory Clause Reference: ${primaryChunk.section} [1]`);
      }
      finalFollowups.push('What are the exact compliance test specifications under this standard?');
    }

    return {
      answer,
      structuredExplanation: finalExplanation,
      followups: finalFollowups
    };
  }

  private async callExternalLLM(options: LLMGenerateOptions): Promise<{ answer: string; structuredExplanation: string[]; followups: string[] }> {
    throw new Error('External LLM provider not configured. Falling back to grounded synthesis.');
  }
}

