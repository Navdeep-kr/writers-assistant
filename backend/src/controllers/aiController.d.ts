import type { Request, Response } from 'express';
export declare const checkGrammar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const improveStyle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAnalysis: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSentimentHeatmap: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createCitation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSynonyms: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const generateTemplateDoc: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=aiController.d.ts.map