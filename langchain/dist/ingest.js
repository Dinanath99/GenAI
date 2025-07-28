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
exports.embedPdf = exports.loadPdf = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const text_splitter_1 = require("langchain/text_splitter");
const memory_1 = require("langchain/vectorstores/memory");
const openai_1 = require("@langchain/openai");
const loadPdf = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const dataBuffer = fs_1.default.readFileSync(path);
    const pdfData = yield (0, pdf_parse_1.default)(dataBuffer);
    return pdfData.text;
});
exports.loadPdf = loadPdf;
// loadPdf("./data/Resume.pdf")
const embedPdf = () => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield (0, exports.loadPdf)("./data/Resume.pdf");
    const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
        //generate embeddings for the chunks
    });
    const chunks = yield splitter.createDocuments([text]);
    const vectorstores = yield memory_1.MemoryVectorStore.fromDocuments(chunks, new openai_1.OpenAIEmbeddings());
    return vectorstores;
});
exports.embedPdf = embedPdf;
