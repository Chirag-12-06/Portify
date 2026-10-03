import { useState } from "react";
import { Bot, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import RagChatBox from "./RagChatBox";

export default function RagButton() {
  const [isOpen, setIsOpen] = useState(false);

  const CHAT_WIDTH = 380;
  const GAP = 12;

  const shiftDistance = CHAT_WIDTH + GAP;

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              x: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              x: 30,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-0 right-0 origin-bottom-right"
          >
            <RagChatBox onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bot Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        animate={{
          x: isOpen ? -shiftDistance : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.8,
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/90 text-cyan-400 shadow-2xl backdrop-blur-xl hover:bg-cyan-500/10"
        style={{
          zIndex: 10,
        }}
        aria-label={isOpen ? "Close RAG Chat" : "Open RAG Chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Bot className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Greeting Message */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            className="absolute right-16 top-1/2 w-max max-w-64 -translate-y-1/2 rounded-xl border border-cyan-400/20 bg-slate-900 px-4 py-3 text-sm text-white shadow-xl"
          >
            <p className="font-semibold text-cyan-400">Hi, I'm your RAG Bot!</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              Let me help you with your queries.
            </p>

            <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-cyan-400/20 bg-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
