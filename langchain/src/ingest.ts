import fs from "fs"
import pdfParse from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import {MemoryVectorStore} from "langchain/vectorstores/memory"
import { OpenAIEmbeddings } from "@langchain/openai"

export const loadPdf = async (path:string):Promise<string>=>{
    const dataBuffer = fs.readFileSync(path)
    const pdfData = await pdfParse(dataBuffer)
    return pdfData.text
}

// loadPdf("./data/Resume.pdf")


export const embedPdf = async()=>{
    const text = await loadPdf("./data/Resume.pdf")
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,

        //generate embeddings for the chunks
        
    })
    const chunks = await splitter.createDocuments([text])
    const vectorstores = await MemoryVectorStore.fromDocuments(chunks,
        new OpenAIEmbeddings()
    )
     return vectorstores
}