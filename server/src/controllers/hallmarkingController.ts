import { Request, Response } from 'express';
import { HALLMARKING_CENTRES, STANDARDS } from '../db/knowledgeBase.js';

export function getHallmarkingOverview(req: Request, res: Response): void {
  const hallmarkingStandards = STANDARDS.filter(s => s.sector.includes('Hallmarking'));

  res.json({
    standards: hallmarkingStandards,
    centres: HALLMARKING_CENTRES,
    mandatoryPurityGrades: [
      { karat: '24K', fineness: '999', description: '99.9% Pure Gold' },
      { karat: '23K', fineness: '958', description: '95.8% Fineness Gold' },
      { karat: '22K', fineness: '916', description: '91.6% Fineness Gold (Standard Ornaments)' },
      { karat: '20K', fineness: '833', description: '83.3% Fineness Gold' },
      { karat: '18K', fineness: '750', description: '75.0% Fineness Gold (Diamond Jewellery)' },
      { karat: '14K', fineness: '585', description: '58.5% Fineness Gold' }
    ],
    mandatoryMarks: [
      { name: 'BIS Standard Logo', icon: 'Triangle Mark', detail: 'Authentic Bureau of Indian Standards hallmark mark' },
      { name: 'Purity / Fineness Grade', icon: '22K916', detail: 'Specific gold purity marking' },
      { name: '6-Digit HUID Code', icon: 'Unique Code', detail: 'Laser engraved unique Hallmark Identification Code for consumer traceability' }
    ]
  });
}
