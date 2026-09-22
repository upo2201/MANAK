export function calculateConfidence(results) {
    if (results.length === 0) {
        return {
            level: 'Low',
            score: 15,
            reasoning: 'No relevant official BIS knowledge chunks were retrieved for this query.'
        };
    }
    const topScore = results[0].combinedScore;
    const resultCount = results.length;
    const officialSourcesCount = results.filter(r => r.combinedScore >= 30).length;
    let score = 50;
    if (topScore >= 50)
        score += 30;
    else if (topScore >= 25)
        score += 15;
    if (officialSourcesCount >= 2)
        score += 15;
    if (resultCount >= 3)
        score += 5;
    score = Math.min(98, Math.max(10, score));
    let level = 'Low';
    let reasoning = '';
    if (score >= 75) {
        level = 'High';
        reasoning = 'Strong direct match grounded in official BIS standards and regulatory documentation.';
    }
    else if (score >= 45) {
        level = 'Medium';
        reasoning = 'Moderate evidence available. Verification with official BIS portal is recommended for complete clause specifics.';
    }
    else {
        level = 'Low';
        reasoning = 'Limited retrieved evidence. Please refine your query or consult bis.gov.in directly.';
    }
    return { level, score, reasoning };
}
