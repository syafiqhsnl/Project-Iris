"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}



export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const triggerShake = () => {
    setHasError(true);
    setShakeKey((k) => k + 1);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      const normalized = inputValue.toLowerCase().replace(/\s+/g, "");
      const targetCollege = (process.env.NEXT_PUBLIC_TARGET_COLLEGE ?? "").toLowerCase().replace(/\s+/g, "");
      const valid = normalized === targetCollege;
      if (valid) {
        setHasError(false);
        setInputValue("");
        setStep(2);
      } else {
        triggerShake();
      }
    } else {
      if (inputValue.trim() === (process.env.NEXT_PUBLIC_TARGET_DOB ?? "")) {
        setHasError(false);
        setInputValue("");
        setStep(1);
        onSuccess();
      } else {
        triggerShake();
      }
    }
  };

  const handleClose = () => {
    setStep(1);
    setInputValue("");
    setHasError(false);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={14} strokeWidth={1.5} />
            </button>

            {/* Fixed header */}
            <div className="mb-1">
              <h2 className="text-zinc-100 font-semibold text-base tracking-tight">
                System Encrypted.
              </h2>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-1.5 mb-5">
              {[1, 2].map((s) => (
                <span
                  key={s}
                  className={`block h-0.5 w-4 rounded-full transition-colors duration-400 ${
                    s <= step ? "bg-zinc-400" : "bg-zinc-700"
                  }`}
                />
              ))}
              <span className="text-xs font-mono text-zinc-600 ml-1">
                {step}/2
              </span>
            </div>

            {/* Animated step content */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                  {step === 1
                    ? "Clearance Level 1: What was the name of the college / matriculation you first moved to?"
                    : "Clearance Level 2: Enter target birthdate (DDMM)."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <motion.div
                    key={shakeKey}
                    {...(hasError && shakeKey > 0
                      ? {
                          animate: { x: [-10, 10, -10, 10, 0] },
                          transition: { duration: 0.4, ease: "easeOut" },
                        }
                      : {})}
                  >
                    <input
                      type={step === 2 ? "tel" : "text"}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        if (hasError) setHasError(false);
                      }}
                      placeholder={step === 1 ? "e.g., uitm" : "DDMM"}
                      autoFocus
                      autoComplete="off"
                      spellCheck={false}
                      maxLength={step === 2 ? 4 : undefined}
                      className={`w-full bg-zinc-950 border rounded-lg px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-700 outline-none transition-colors duration-200 font-mono ${
                        hasError
                          ? "border-red-500/40 focus:border-red-500/60"
                          : "border-white/10 focus:border-white/20"
                      }`}
                    />
                    <AnimatePresence>
                      {hasError && (
                        <motion.p
                          className="text-xs text-red-400/70 mt-1.5 font-mono"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          Access denied.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-white/5 hover:border-white/10 transition-colors duration-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-white/10 hover:border-white/20 transition-colors duration-200 cursor-pointer"
                    >
                      {step === 1 ? "Next →" : "Unlock"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
