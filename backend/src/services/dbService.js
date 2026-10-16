import { randomUUID } from 'crypto';
class MockCloudDB {
    usersByEmail = new Map();
    usersByToken = new Map();
    documents = new Map();
    constructor() {
        // Seed generic user
        const dummyUser = {
            id: 'user-1',
            email: 'demo@writingassistant.ai',
            password: 'password123',
            token: 'dummy-token',
            xp: 450,
            level: 4,
            streak: 12,
            lastLogin: new Date().toISOString()
        };
        this.usersByEmail.set(dummyUser.email, dummyUser);
        this.usersByToken.set(dummyUser.token, dummyUser);
    }
    // --- Auth & Profiles ---
    register(email, phone, passwordHash) {
        if (this.usersByEmail.has(email)) {
            throw new Error('User already exists');
        }
        const token = `mock-jwt-${randomUUID()}`;
        const user = {
            id: `usr-${randomUUID()}`,
            email,
            phoneNumber: phone,
            password: passwordHash,
            token,
            xp: 0,
            level: 1,
            streak: 1,
            lastLogin: new Date().toISOString()
        };
        this.usersByEmail.set(email, user);
        this.usersByToken.set(token, user);
        return user;
    }
    login(email, passwordHash) {
        const user = this.usersByEmail.get(email);
        // Allowing legacy login without password if it's the demo logic or enforcing password check
        if (!user || (passwordHash && user.password !== passwordHash)) {
            throw new Error('Invalid email or password');
        }
        // Update token
        this.usersByToken.delete(user.token);
        user.token = `mock-jwt-${randomUUID()}`;
        user.lastLogin = new Date().toISOString();
        this.usersByToken.set(user.token, user);
        return user;
    }
    verifyToken(token) {
        // Fallback to dummy user for multi-platform dev if no real token sent
        return this.usersByToken.get(token) || this.usersByToken.get('dummy-token');
    }
    // --- Documents Layer ---
    getDocuments(userId) {
        const docs = Array.from(this.documents.values()).filter(d => d.userId === userId);
        return docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    getDocument(id, userId) {
        const doc = this.documents.get(id);
        return (doc && doc.userId === userId) ? doc : null;
    }
    saveDocument(userId, id, title, content) {
        const docId = id || `doc-${randomUUID()}`;
        const newDoc = {
            id: docId,
            userId,
            title: title || 'Untitled Draft',
            content,
            updatedAt: new Date().toISOString()
        };
        this.documents.set(docId, newDoc);
        return newDoc;
    }
    deleteDocument(id, userId) {
        const doc = this.documents.get(id);
        if (doc && doc.userId === userId) {
            this.documents.delete(id);
            return true;
        }
        return false;
    }
}
export const dbStore = new MockCloudDB();
//# sourceMappingURL=dbService.js.map