"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const index_1 = __importDefault(require("./routes/index"));
const adminAuth_1 = __importDefault(require("./routes/adminAuth"));
app.use(express_1.default.json());
app.use("/", index_1.default);
app.use("/admin", adminAuth_1.default);
app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`);
});
