import { getUserByToken } from '../db/userRepo.js';
/**
 * Middleware ensuring a valid session token is provided.
 */
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query?.token;
    if (!token) {
        res.status(401).json({ error: 'Authentication token required.' });
        return;
    }
    const user = getUserByToken(token);
    if (!user) {
        res.status(401).json({ error: 'Invalid or expired session token.' });
        return;
    }
    req.user = user;
    next();
}
/**
 * Middleware ensuring the authenticated user possesses Admin privileges.
 */
export function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query?.token;
    if (!token) {
        res.status(401).json({ error: 'Authentication token required.' });
        return;
    }
    const user = getUserByToken(token);
    if (!user) {
        res.status(401).json({ error: 'Invalid or expired session token.' });
        return;
    }
    req.user = user;
    if (user.profile?.role !== 'Admin') {
        res.status(403).json({ error: 'Forbidden: Admin authorization required.' });
        return;
    }
    next();
}
