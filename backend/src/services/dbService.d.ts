export interface Document {
    id: string;
    userId: string;
    title: string;
    content: string;
    updatedAt: string;
}
export interface UserProfile {
    id: string;
    email: string;
    phoneNumber?: string;
    password?: string;
    token: string;
    xp: number;
    level: number;
    streak: number;
    lastLogin: string;
}
declare class MockCloudDB {
    private usersByEmail;
    private usersByToken;
    private documents;
    constructor();
    register(email: string, phone: string, passwordHash: string): UserProfile;
    login(email: string, passwordHash?: string): UserProfile;
    verifyToken(token: string): UserProfile | undefined;
    getDocuments(userId: string): Document[];
    getDocument(id: string, userId: string): Document | null;
    saveDocument(userId: string, id: string | null, title: string, content: string): Document;
    deleteDocument(id: string, userId: string): boolean;
}
export declare const dbStore: MockCloudDB;
export {};
//# sourceMappingURL=dbService.d.ts.map