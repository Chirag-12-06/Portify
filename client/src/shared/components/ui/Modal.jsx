import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-3xl",
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className={`relative z-10 w-full ${maxWidth}
              overflow-hidden rounded-3xl
              border border-slate-700/60
              bg-linear-to-br
              from-slate-900
              via-slate-900
              to-slate-800
              shadow-[0_30px_80px_rgba(0,0,0,.5)]`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
