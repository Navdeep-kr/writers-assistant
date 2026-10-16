export declare const getUserStats: (userId: string) => Promise<{
    id: string;
    xp: number;
    streak: number;
    level: number;
    last_post_date: string;
}>;
export declare const addXP: (userId: string, amount: number) => Promise<{
    id: string;
    xp: number;
    streak: number;
    level: number;
    last_post_date: string;
}>;
export declare const updateStreak: (userId: string) => Promise<{
    id: string;
    xp: number;
    streak: number;
    level: number;
    last_post_date: string;
}>;
//# sourceMappingURL=userService.d.ts.map