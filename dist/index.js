"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const app_1 = require("./config/app");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const health_middleware_1 = require("./middlewares/health.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
/***** MIDDLEWARES *****/
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(not_found_middleware_1.notFoundMiddleware);
app.use(error_middleware_1.errorMiddleware);
app.get("/health", health_middleware_1.healthMiddleware);
/***** ROUTES *****/
app.use('/api/user', user_routes_1.default);
app.use('/api/chat', chat_routes_1.default);
/***** CONFIG *****/
(0, db_1.connectDB)();
(0, app_1.startApp)(app);
/***** ROUTES *****/
app.use('/api/user', user_routes_1.default);
app.use('/api/chat', chat_routes_1.default);
/***** CONFIG *****/
(0, db_1.connectDB)();
(0, app_1.startApp)(app);
