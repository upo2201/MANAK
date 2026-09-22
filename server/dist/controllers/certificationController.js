import { CERTIFICATION_SCHEMES } from '../db/knowledgeBase.js';
export function getCertificationSchemes(req, res) {
    res.json({
        schemes: CERTIFICATION_SCHEMES
    });
}
