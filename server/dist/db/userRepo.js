// In-memory User and Session Store (PostgreSQL schema abstraction ready)
const usersStore = new Map();
const sessionsStore = new Map(); // token -> userId
// Seed initial Demo User
const demoUser = {
    id: 'user-demo-01',
    email: 'demo@manak.ai',
    name: 'Demo Manufacturer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    authProvider: 'demo',
    isDemo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    profile: {
        userId: 'user-demo-01',
        preferredName: 'Ramesh Kumar',
        role: 'Manufacturer',
        organizationName: 'National Cookware Industries',
        businessType: 'Private Limited',
        industrySector: 'Mechanical Engineering & Consumer Goods',
        companySize: '10-50 Employees',
        city: 'Ghaziabad',
        state: 'Uttar Pradesh',
        country: 'India',
        productCategories: ['Cookware', 'Kitchenware', 'Pressure Cookers'],
        mainProducts: ['Stainless steel domestic pressure cooker'],
        materialsUsed: ['Food grade stainless steel IS 5522'],
        bisInterestAreas: ['Indian Standards', 'Product Certification', 'Laboratory Testing'],
        preferredLanguage: 'en',
        informationDepth: 'Detailed',
        isOnboarded: true
    }
};
usersStore.set(demoUser.id, demoUser);
usersStore.set(demoUser.email.toLowerCase(), demoUser);
export function findUserByEmail(email) {
    return usersStore.get(email.toLowerCase());
}
export function findUserById(id) {
    return usersStore.get(id);
}
export function createUser(data) {
    const now = new Date().toISOString();
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newUser = {
        id: userId,
        email: data.email.toLowerCase(),
        name: data.name,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
        authProvider: data.authProvider,
        isDemo: !!data.isDemo,
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
        profile: {
            userId,
            role: 'Manufacturer',
            productCategories: [],
            mainProducts: [],
            materialsUsed: [],
            bisInterestAreas: [],
            preferredLanguage: 'en',
            informationDepth: 'Quick',
            isOnboarded: false
        }
    };
    usersStore.set(newUser.id, newUser);
    usersStore.set(newUser.email, newUser);
    return newUser;
}
export function updateUserProfile(userId, profileData) {
    const user = usersStore.get(userId);
    if (!user)
        return undefined;
    const now = new Date().toISOString();
    user.updatedAt = now;
    user.profile = {
        ...(user.profile || {
            userId,
            role: 'Manufacturer',
            productCategories: [],
            mainProducts: [],
            materialsUsed: [],
            bisInterestAreas: [],
            preferredLanguage: 'en',
            informationDepth: 'Quick',
            isOnboarded: true
        }),
        ...profileData,
        isOnboarded: true
    };
    usersStore.set(user.id, user);
    usersStore.set(user.email, user);
    return user;
}
export function createSession(userId) {
    const token = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionsStore.set(token, userId);
    return token;
}
export function getUserByToken(token) {
    const userId = sessionsStore.get(token);
    if (!userId)
        return undefined;
    return findUserById(userId);
}
