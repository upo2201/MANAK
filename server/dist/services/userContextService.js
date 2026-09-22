import { findUserById, getUserByToken } from '../db/userRepo.js';
/**
 * Retrieves normalized user context / profile metadata by userId or token.
 * Database-agnostic helper to supply user domain background to downstream services.
 */
export function getUserContext(identifier) {
    if (!identifier || typeof identifier !== 'string')
        return undefined;
    // Attempt resolution by session token first, then by direct user ID
    const user = getUserByToken(identifier) || findUserById(identifier);
    if (!user || !user.profile)
        return undefined;
    return {
        userId: user.id,
        preferredName: user.profile.preferredName || user.name,
        role: user.profile.role || 'Manufacturer',
        organizationName: user.profile.organizationName,
        businessType: user.profile.businessType,
        industrySector: user.profile.industrySector,
        companySize: user.profile.companySize,
        city: user.profile.city,
        state: user.profile.state,
        country: user.profile.country,
        productCategories: user.profile.productCategories || [],
        mainProducts: user.profile.mainProducts || [],
        materialsUsed: user.profile.materialsUsed || [],
        bisInterestAreas: user.profile.bisInterestAreas || [],
        preferredLanguage: user.profile.preferredLanguage || 'en',
        informationDepth: user.profile.informationDepth || 'Quick',
        isOnboarded: !!user.profile.isOnboarded,
    };
}
