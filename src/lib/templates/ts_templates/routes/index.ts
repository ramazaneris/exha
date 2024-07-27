import { Request, Response } from "express";

export const event = (req: Request, res: Response) => {
    res.send("Hello World!");
};
