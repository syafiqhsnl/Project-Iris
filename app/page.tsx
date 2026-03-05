"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineEvents } from "@/lib/timelineData";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import AuthModal from "@/components/AuthModal";
import TransmissionForm from "@/components/TransmissionForm";

export default function Home() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-zinc-800 selection:text-zinc-100 flex flex-col items-center py-24 px-6">
      {/* Hero */}
      <motion.header
        className="w-full max-w-2xl mb-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Iris
          </h1>
          {/* Glowing dot */}
          <span className="relative flex h-2 w-2 mt-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-30" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500" />
          </span>
          {/* Version badge — secret trigger */}
          <AnimatePresence mode="wait" initial={false}>
            {!isDebugMode ? (
              <motion.button
                key="badge-locked"
                onClick={() => setIsModalOpen(true)}
                className="ml-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                v11.03
              </motion.button>
            ) : (
              <motion.button
                key="badge-unlocked"
                onClick={() => setIsDebugMode(false)}
                className="ml-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                &gt;_ unlocked
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
          A temporal study in chronological data orchestration.
        </p>
      </motion.header>

      {/* Timeline */}
      <main className="w-full max-w-2xl flex-1">
        <AnimatedTimeline events={timelineEvents} isDebugMode={isDebugMode} />
      </main>

      {/* Secure Transmission — only visible when unlocked */}
      <AnimatePresence>
        {isDebugMode && (
          <motion.section
            className="w-full max-w-2xl mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-zinc-600 mb-2 tracking-widest uppercase">
              Secure Transmission
            </p>
            <TransmissionForm />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="w-full max-w-2xl mt-24 pt-8 border-t border-white/5 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isDebugMode ? (
            <motion.p
              key="footer-professional"
              className="text-xs text-zinc-600 font-mono"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              System Status: Nominal.
            </motion.p>
          ) : (
            <motion.p
              key="footer-personal"
              className="text-xs text-zinc-600 font-mono"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              System remains open for reconnection. Happy Birthday.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.footer>

      {/* Auth modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsDebugMode(true);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
