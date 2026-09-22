import { LABORATORIES } from '../db/knowledgeBase.js';
export function getLaboratories(req, res) {
    const { search, state, standard } = req.query;
    let filtered = [...LABORATORIES];
    if (search && typeof search === 'string') {
        const s = search.toLowerCase();
        filtered = filtered.filter(l => l.name.toLowerCase().includes(s) ||
            l.city.toLowerCase().includes(s) ||
            l.testingScopes.some(scope => scope.toLowerCase().includes(s)));
    }
    if (state && typeof state === 'string' && state !== 'all') {
        const stateStr = state.toString().toLowerCase();
        filtered = filtered.filter(l => l.state.toLowerCase() === stateStr);
    }
    if (standard && typeof standard === 'string') {
        const stdStr = String(standard).toLowerCase();
        filtered = filtered.filter(l => l.standardsSupported.some(st => st.toLowerCase().includes(stdStr)));
    }
    res.json({
        total: filtered.length,
        laboratories: filtered
    });
}
