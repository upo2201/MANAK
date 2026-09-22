export type IntentType = 
  | 'PRODUCT_STANDARD_RECOMMENDATION'
  | 'CERTIFICATION_PROCESS_GUIDANCE'
  | 'LABORATORY_LOOKUP'
  | 'HALLMARKING_INQUIRY'
  | 'CONSUMER_RIGHTS_VERIFICATION'
  | 'STANDARD_LOOKUP'
  | 'GENERAL_BIS_INQUIRY';

export interface IntentAnalysis {
  intent: IntentType;
  normalizedQuery: string;
  expandedQuery: string[];
  extractedIsNumbers: string[];
  productKeywords: string[];
}

export function detectIntent(query: string): IntentAnalysis {
  const normalizedQuery = query.trim().toLowerCase();
  
  // Extract IS numbers like "IS 3042", "IS 10500:2012", "IS-694"
  const isRegex = /is\s*[-:]?\s*(\d+)(?:\s*\([^)]+\))?(?::\d+)?/gi;
  const matches = [...query.matchAll(isRegex)];
  const extractedIsNumbers = matches.map(m => `IS ${m[1]}`);

  let intent: IntentType = 'GENERAL_BIS_INQUIRY';
  const expandedQuery: string[] = [normalizedQuery];
  const productKeywords: string[] = [];

  if (/hallmark|huid|gold|jewel|jeweller|karat|fineness|22k|18k|assaying|ahc/i.test(normalizedQuery)) {
    intent = 'HALLMARKING_INQUIRY';
    expandedQuery.push('gold jewellery hallmarking', 'HUID 6-digit code', 'IS 1417', 'IS 15820 assaying centre');
  } else if (/lab|laboratory|test|testing|scope|facility|sample|testing lab/i.test(normalizedQuery)) {
    intent = 'LABORATORY_LOOKUP';
    expandedQuery.push('BIS recognized testing laboratory', 'empanelled lab', 'testing scope', 'sample drawn');
  } else if (/certificate|certification|isi mark|licence|cml|scheme|apply|step|process|how to get|qco|mandatory|register|registration|manakonline/i.test(normalizedQuery)) {
    intent = 'CERTIFICATION_PROCESS_GUIDANCE';
    expandedQuery.push('BIS Product Certification Scheme I', 'ManakOnline application process', 'ISI mark licence', 'factory inspection');
  } else if (/consumer|fake|complaint|bis care|mark verification|verify mark|misuse/i.test(normalizedQuery)) {
    intent = 'CONSUMER_RIGHTS_VERIFICATION';
    expandedQuery.push('BIS Care app', 'verify ISI mark CML', 'consumer complaint portal', 'enforcement');
  } else if (extractedIsNumbers.length > 0 || (/is\s*\d+/i.test(normalizedQuery))) {
    intent = 'STANDARD_LOOKUP';
    expandedQuery.push('Indian Standard specification', 'BIS Know Your Standard', ...extractedIsNumbers);
  } else if (/product|cooker|water|cable|wire|battery|toy|bolt|bottle|steel|packaging|applies to/i.test(normalizedQuery)) {
    intent = 'PRODUCT_STANDARD_RECOMMENDATION';
    expandedQuery.push('applicable Indian Standard', 'mandatory QCO', 'product specification');
  } else if (/standard|specification|requirement|clause|edition/i.test(normalizedQuery)) {
    intent = 'STANDARD_LOOKUP';
    expandedQuery.push('Indian Standard specification', 'BIS Know Your Standard');
  }

  // Tokenize key product terms
  const tokens = normalizedQuery.split(/\s+/).filter(t => t.length > 2);
  tokens.forEach(t => {
    if (!['what', 'how', 'which', 'where', 'the', 'is', 'for', 'and', 'can', 'with', 'about'].includes(t)) {
      productKeywords.push(t);
    }
  });

  return {
    intent,
    normalizedQuery,
    expandedQuery,
    extractedIsNumbers,
    productKeywords
  };
}
