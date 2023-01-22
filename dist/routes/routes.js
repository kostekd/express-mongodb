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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const models_js_1 = __importDefault(require("../models/models.js"));
exports.router = express_1.default.Router();
exports.router.post("/post", (req, res) => {
    const { name, age } = req.body;
    const data = new models_js_1.default({
        name,
        age,
    });
    data.save((err) => {
        if (err) {
            console.log("Dupa");
            res.status(500).send(err);
        }
        else {
            console.log("Super");
            res.status(201).send("Data Saved");
        }
    });
});
exports.router.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, minAge, maxAge } = req.query;
    let query = {
        $and: [{ age: { $gte: minAge } }, { age: { $lte: maxAge } }],
    };
    if (name) {
        query = {
            $and: [
                { name: { $regex: name, $options: "i" } },
                { age: { $gte: minAge } },
                { age: { $lte: maxAge } },
            ],
        };
    }
    try {
        const data = yield models_js_1.default.find(query);
        res.json(data);
    }
    catch ({ message }) {
        res.status(500).json({ message: message });
    }
}));
