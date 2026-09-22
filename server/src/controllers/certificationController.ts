import { Request, Response } from 'express';
import { CERTIFICATION_SCHEMES } from '../db/knowledgeBase.js';

export function getCertificationSchemes(req: Request, res: Response): void {
  res.json({
    schemes: CERTIFICATION_SCHEMES
  });
}
