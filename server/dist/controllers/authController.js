import { findUserByEmail, createUser, createSession, getUserByToken, updateUserProfile } from '../db/userRepo.js';
export function handleLogin(req, res) {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'Email address is required.' });
        return;
    }
    let user = findUserByEmail(email);
    if (!user) {
        // For seamless prototype demo, auto-create user on first login if email/password provided
        const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ');
        user = createUser({
            email,
            name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
            authProvider: 'email'
        });
    }
    user.lastLoginAt = new Date().toISOString();
    const token = createSession(user.id);
    res.json({
        token,
        user
    });
}
export function handleSignup(req, res) {
    const { name, email, password, role } = req.body;
    if (!email || !name) {
        res.status(400).json({ error: 'Name and email address are required.' });
        return;
    }
    let user = findUserByEmail(email);
    if (user && !user.isDemo) {
        res.status(400).json({ error: 'An account with this email address already exists.' });
        return;
    }
    user = createUser({
        email,
        name,
        authProvider: 'email'
    });
    if (role) {
        updateUserProfile(user.id, { role });
    }
    const token = createSession(user.id);
    res.json({
        token,
        user
    });
}
export function handleDemoLogin(req, res) {
    let demoUser = findUserByEmail('demo@manak.ai');
    if (!demoUser) {
        demoUser = createUser({
            email: 'demo@manak.ai',
            name: 'Demo Manufacturer',
            authProvider: 'demo',
            isDemo: true
        });
    }
    demoUser.lastLoginAt = new Date().toISOString();
    const token = createSession(demoUser.id);
    res.json({
        token,
        user: demoUser
    });
}
export function handleGoogleAuth(req, res) {
    const { googleToken, email, name, avatar } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Google credential verification failed.' });
        return;
    }
    let user = findUserByEmail(email);
    if (!user) {
        user = createUser({
            email,
            name: name || 'Google User',
            authProvider: 'google'
        });
    }
    if (avatar)
        user.avatar = avatar;
    user.lastLoginAt = new Date().toISOString();
    const token = createSession(user.id);
    res.json({ token, user });
}
export function getCurrentUser(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query.token;
    if (!token) {
        res.status(401).json({ error: 'Authorization header token missing.' });
        return;
    }
    const user = getUserByToken(token);
    if (!user) {
        res.status(401).json({ error: 'Invalid or expired session token.' });
        return;
    }
    res.json({ user });
}
export function handleUpdateProfile(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query.token;
    if (!token) {
        res.status(401).json({ error: 'Authorization token required.' });
        return;
    }
    const user = getUserByToken(token);
    if (!user) {
        res.status(401).json({ error: 'Invalid session.' });
        return;
    }
    const updatedUser = updateUserProfile(user.id, req.body);
    res.json({ user: updatedUser });
}
