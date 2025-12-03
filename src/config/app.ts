import "dotenv/config";

import { Application } from "express";

const PORT = process.env.PORT || 8000;

export const startApp = (app: Application) => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
        console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
    });
}