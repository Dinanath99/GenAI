"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chromadb_1 = require("chromadb");
const chromaClient = new chromadb_1.ChromaClient({
    host: "localhost",
    port: 8000,
});
chromaClient.heartbeat();
