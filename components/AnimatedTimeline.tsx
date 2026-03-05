"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TimelineEvent } from "@/lib/timelineData";

interface AnimatedTimelineProps {
  events: TimelineEvent[];
  isDebugMode: boolean;
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function AnimatedTimeline({
  events,
  isDebugMode,
}: AnimatedTimelineProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Timeline track */}
      <div className="absolute left-1.75 top-2 bottom-2 w-px bg-white/10" />

      <div className="flex flex-col gap-12">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="relative pl-8"
            variants={nodeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08 }}
          >
            {/* Node dot */}
            <motion.div
              className="absolute left-0 top-1.5 w-3.75 h-3.75 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08 + 0.15,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className={`block w-1.25 h-1.25 rounded-full transition-colors duration-500 ${
                  isDebugMode ? "bg-zinc-400" : "bg-zinc-600"
                }`}
              />
            </motion.div>

            {/* Date label */}
            <p className="text-xs text-zinc-600 font-mono mb-3 tracking-widest uppercase">
              {event.date}
            </p>

            {/* Card */}
            <div className="border border-white/5 bg-zinc-900/20 rounded-xl p-6 backdrop-blur-sm">
              <AnimatePresence mode="wait" initial={false}>
                {!isDebugMode ? (
                  <motion.div
                    key={`${event.id}-professional`}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="text-zinc-100 font-medium text-base mb-2 tracking-tight">
                      {event.professionalTitle}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {event.professionalDescription}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${event.id}-personal`}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="text-zinc-100 font-medium text-base mb-2 tracking-tight">
                      {event.personalTitle}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {event.personalDescription}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
