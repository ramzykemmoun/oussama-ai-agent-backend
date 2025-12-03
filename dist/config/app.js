"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
require("dotenv/config");
const PORT = process.env.PORT || 8000;
const startApp = (app) => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
        console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
    });
};
exports.startApp = startApp;
