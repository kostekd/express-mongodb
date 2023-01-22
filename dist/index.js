"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_js_1 = require("./routes/routes.js");
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    dotenv_1.default.config();
    const mongoString = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "";
    yield mongoose_1.default
        .connect(mongoString)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
    const database = mongoose_1.default.connection;
    database.on("error", () => {
        console.log("There has been an error connecting to the database");
    });
    database.once("connected", () => {
        console.log("Database Connected");
    });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api", routes_js_1.router);
    app.listen(process.env.PORT, () => {
        console.log(`Server Started at ${process.env.PORT}`);
    });
});
server();
