import { STANDARDS } from '../db/knowledgeBase.js';
import { detectIntent } from '../rag/intent.js';
import { performHybridRetrieval } from '../rag/retriever.js';
import { getUserContext } from '../services/userContextService.js';
export function getAllStandards(req, res) {
    const { search, sector, status, category } = req.query;
    let filtered = [...STANDARDS];
    if (search && typeof search === 'string') {
        const s = search.toLowerCase();
        filtered = filtered.filter(st => st.isNumber.toLowerCase().includes(s) ||
            st.title.toLowerCase().includes(s) ||
            st.description.toLowerCase().includes(s));
    }
    if (sector && typeof sector === 'string' && sector !== 'all') {
        const secStr = sector.toString().toLowerCase();
        filtered = filtered.filter(st => st.sector.toLowerCase() === secStr);
    }
    if (status && typeof status === 'string' && status !== 'all') {
        const statStr = status.toString().toLowerCase();
        filtered = filtered.filter(st => st.status.toLowerCase() === statStr);
    }
    res.json({
        total: filtered.length,
        standards: filtered
    });
}
export function getStandardById(req, res) {
    const { id } = req.params;
    const targetId = String(id || '').toLowerCase().replace(/\s+/g, '');
    const standard = STANDARDS.find(st => st.id === id || st.isNumber.toLowerCase().replace(/\s+/g, '') === targetId);
    if (!standard) {
        res.status(404).json({ error: 'Standard not found.' });
        return;
    }
    res.json(standard);
}
export function recommendStandard(req, res) {
    const body = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
    const userContext = (body.userId || token) ? getUserContext(body.userId || token) : undefined;
    // Reuse profile data if fields are omitted in the request
    const productName = body.productName || userContext?.mainProducts?.[0] || '';
    const category = body.category || userContext?.productCategories?.[0] || userContext?.industrySector || '';
    const material = body.material || userContext?.materialsUsed?.[0] || '';
    const intendedUse = body.intendedUse || '';
    const manufacturingProcess = body.manufacturingProcess || '';
    if (!productName.trim()) {
        res.status(400).json({ error: 'Product name or main product specification is required for recommendation. Please provide product details or complete your profile.' });
        return;
    }
    const queryText = `${productName} ${category} ${material} ${intendedUse} ${manufacturingProcess}`;
    const intent = detectIntent(queryText);
    const retrievalHits = performHybridRetrieval(intent, 4);
    const recommendations = [];
    for (const hit of retrievalHits) {
        const isNum = hit.chunk.metadata?.isNumber;
        const std = STANDARDS.find(s => s.isNumber === isNum) || STANDARDS[0];
        const matchScore = Math.min(95, Math.max(40, hit.combinedScore * 1.2));
        const confidence = matchScore > 75 ? 'High' : matchScore > 50 ? 'Medium' : 'Low';
        recommendations.push({
            standard: std,
            matchScore: parseFloat(matchScore.toFixed(1)),
            confidence,
            relevanceReasoning: `Potentially relevant based on product keywords (${hit.matchingTerms.join(', ')}) and mandatory QCO coverage in official BIS specifications.`,
            mandatoryNotice: std.isMandatory ? 'Mandatory ISI Mark certification required under Quality Control Order (QCO).' : 'Voluntary Certification Scheme',
            testingScopeSummary: `Includes physical, pressure, and material testing under ${std.isNumber}`
        });
    }
    // De-duplicate recommendations by standard ID
    const uniqueRecs = Array.from(new Map(recommendations.map(r => [r.standard.id, r])).values());
    res.json({
        productQuery: {
            productName,
            category,
            material,
            intendedUse,
            manufacturingProcess
        },
        recommendations: uniqueRecs,
        disclaimer: 'Potentially relevant standards identified based on product description. Final applicability depends on exact technical specifications and current BIS notifications. Verify with BIS before production.'
    });
}
