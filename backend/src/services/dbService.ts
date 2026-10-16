import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.resolve(process.cwd(), 'db.json');

// In-Memory Cloud Database Mock
export interface Document {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  token: string;
  xp: number;
  level: number;
  streak: number;
  lastLogin: string;
}

class PersistentCloudDB {
  private usersByEmail: Map<string, UserProfile> = new Map();
  private usersByToken: Map<string, UserProfile> = new Map();
  private documents: Map<string, Document> = new Map();

  constructor() {
    this.load();
    // Ensure we have a dummy user for dev if DB is empty
    if (this.usersByEmail.size === 0) {
      const dummyUser: UserProfile = {
        id: 'user-1',
        name: 'Demo Writer',
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
      this.save();
    }
  }

  private save() {
    const data = {
      users: Array.from(this.usersByEmail.values()),
      documents: Array.from(this.documents.values())
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }

  private load() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        data.users.forEach((u: UserProfile) => {
          this.usersByEmail.set(u.email, u);
          this.usersByToken.set(u.token, u);
        });
        data.documents.forEach((d: Document) => {
          this.documents.set(d.id, d);
        });
      } catch (err) {
        console.error('Failed to load DB:', err);
      }
    }
  }

  public register(email: string, phone: string, passwordHash: string, name?: string): UserProfile {
    const normalizedEmail = email.trim().toLowerCase();
    if (this.usersByEmail.has(normalizedEmail)) throw new Error('User already exists');
    const token = `mock-jwt-${randomUUID()}`;
    const user: UserProfile = {
      id: `usr-${randomUUID()}`,
      name: name?.trim() || normalizedEmail.split('@')[0],
      email: normalizedEmail,
      phoneNumber: phone,
      password: passwordHash,
      token,
      xp: 100,
      level: 1,
      streak: 1,
      lastLogin: new Date().toISOString()
    };
    this.usersByEmail.set(normalizedEmail, user);
    this.usersByToken.set(token, user);
    this.save();
    return user;
  }

  public login(email: string, passwordHash?: string): UserProfile {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.usersByEmail.get(normalizedEmail);
    if (!user || (passwordHash && user.password !== passwordHash)) throw new Error('Invalid email or password');
    this.usersByToken.delete(user.token);
    user.token = `mock-jwt-${randomUUID()}`;
    user.lastLogin = new Date().toISOString();
    this.usersByToken.set(user.token, user);
    this.save();
    return user;
  }

  public verifyToken(token?: string): UserProfile | undefined {
    if (!token) return undefined;
    return this.usersByToken.get(token);
  }

  public getDocuments(userId: string): Document[] {
    return Array.from(this.documents.values())
      .filter(d => d.userId === userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public getDocument(id: string, userId: string): Document | null {
    const doc = this.documents.get(id);
    return (doc && doc.userId === userId) ? doc : null;
  }

  public saveDocument(userId: string, id: string | null, title: string, content: string): Document {
    const docId = id || `doc-${randomUUID()}`;
    const newDoc: Document = {
      id: docId, userId, title: title || 'Untitled Draft', content,
      updatedAt: new Date().toISOString()
    };
    this.documents.set(docId, newDoc);
    this.save();
    return newDoc;
  }

  public deleteDocument(id: string, userId: string): boolean {
    const doc = this.documents.get(id);
    if (doc && doc.userId === userId) {
      this.documents.delete(id);
      this.save();
      return true;
    }
    return false;
  }
}

export const dbStore = new PersistentCloudDB();
