import { Application } from "express";

declare class Exha {
    public app: Application;
    constructor(app?: Application);
    public init(): void;
}

export { Exha };
