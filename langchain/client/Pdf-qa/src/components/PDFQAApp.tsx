import { useState } from "react";
import type { ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PDFQAApp() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsk = async (): Promise<void> => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching answer. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-sky-700">
          LangChain PDF Question Answering
        </h1>

        <Card className="p-6 shadow-xl">
          <div className="space-y-4">
            <Textarea
              placeholder="Ask a question about the PDF..."
              value={question}
              onChange={handleChange}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleAsk} disabled={loading} className="px-6">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Asking...
                  </>
                ) : (
                  "Ask"
                )}
              </Button>
            </div>
            {answer && (
              <div className="pt-4 border-t text-gray-700 whitespace-pre-wrap">
                <strong className="block mb-2 text-sky-600">Answer:</strong>
                {answer}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
