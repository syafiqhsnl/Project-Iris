"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TransmissionForm() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;
    setIsSending(true);
    try {
      await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "secure_message",
          message: message,
          timestamp: new Date().toISOString(),
        }),
      });
    } finally {
      setIsSent(true);
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-lg p-4">
      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.p
            key="success"
            className="text-zinc-500 font-mono text-xs"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Transmission logged. Connection terminated.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=">_ Transmit secure log..."
              rows={1}
              className="flex-1 resize-none bg-transparent outline-none border-none font-mono text-sm text-zinc-300 placeholder:text-zinc-600 leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
            />
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed shrink-0"
              aria-label="Send"
            >
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
