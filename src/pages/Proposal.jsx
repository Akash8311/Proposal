import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";

const NO_PHRASES = [
  "NO 😅",
  "Nope!",
  "Try again 😜",
  "Nice try!",
  "Not happening",
  "Catch me!",
];

const BALLOON_COLORS = [
  "#ff6fae",
  "#9b6bff",
  "#ffd166",
  "#ff9fc7",
  "#7ed6df",
  "#c9a7ff",
];

/** Random point inside a rectangle, kept away from the rectangle's edges a little. */
function randomPoint(width, height, btnW, btnH) {
  const pad = 12;
  const x = pad + Math.random() * Math.max(1, width - btnW - pad * 2);
  const y = pad + Math.random() * Math.max(1, height - btnH - pad * 2);
  return { x, y };
}

function distance(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

const Proposal = ({ onContinue }) => {
  const playgroundRef = useRef(null);
  const noBtnRef = useRef(null);
  const [noPos, setNoPos] = useState(null); // null = not yet escaped, sits inline next to YES
  const [noLabel, setNoLabel] = useState("NO 😅");
  const [escapeCount, setEscapeCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [flash, setFlash] = useState(false);
  const escapeThreshold = 110; // px proximity that triggers a dodge

  const escape = useCallback(() => {
    const playground = playgroundRef.current;
    const btn = noBtnRef.current;
    if (!playground || !btn) return;
    const pRect = playground.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const { x, y } = randomPoint(
      pRect.width,
      pRect.height,
      bRect.width,
      bRect.height,
    );
    setNoPos({ x, y });
    setNoLabel(NO_PHRASES[Math.floor(Math.random() * NO_PHRASES.length)]);
    setEscapeCount((c) => c + 1);
  }, []);

  // Desktop: watch pointer proximity to the NO button and dodge before the click lands.
  useEffect(() => {
    const playground = playgroundRef.current;
    if (!playground || accepted) return;

    const handlePointerMove = (e) => {
      const btn = noBtnRef.current;
      if (!btn) return;
      const bRect = btn.getBoundingClientRect();
      const cx = bRect.left + bRect.width / 2;
      const cy = bRect.top + bRect.height / 2;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      if (distance(clientX, clientY, cx, cy) < escapeThreshold) {
        escape();
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [escape, accepted]);

  const handleNoTouchStart = (e) => {
    // On mobile there's no hover, so the first touch itself must be dodged.
    e.preventDefault();
    escape();
  };

  const fireConfettiCelebration = useCallback(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ["#ff6fae", "#9b6bff", "#ffd166", "#ffffff", "#ff9fc7"];
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors });

    // "fireworks" - staggered bursts from random points
    let bursts = 0;
    const fireworkInterval = setInterval(() => {
      confetti({
        particleCount: 90,
        startVelocity: 45,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() * 0.5 + 0.1 },
        colors,
      });
      bursts += 1;
      if (bursts >= 5) clearInterval(fireworkInterval);
    }, 500);
  }, []);

  const handleYes = () => {
    setAccepted(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
    fireConfettiCelebration();
  };

  const balloons = accepted
    ? Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        size: 46 + Math.random() * 34,
        delay: Math.random() * 2.5,
        duration: 6 + Math.random() * 4,
      }))
    : [];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[linear-gradient(-45deg,#ffd9c2,#ff9fc7,#c9a7ff,#9b6bff)] bg-[length:400%_400%] animate-gradientShift flex flex-col items-center justify-center px-6 py-12 font-body">
      <Sparkles count={30} />
      <FloatingHearts count={accepted ? 40 : 14} />

      {/* rising balloons on acceptance */}
      <AnimatePresence>
        {accepted && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {balloons.map((b) => (
              <motion.div
                key={b.id}
                className="absolute rounded-full"
                style={{
                  left: `${b.left}%`,
                  bottom: "-20%",
                  width: b.size,
                  height: b.size * 1.2,
                  background: `radial-gradient(circle at 30% 30%, #fff8, ${b.color})`,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: "-130vh",
                  opacity: [0, 1, 1, 0],
                  rotate: [0, -8, 8, 0],
                }}
                transition={{
                  duration: b.duration,
                  delay: b.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* screen flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="mb-3 font-display text-[clamp(2rem,7vw,3.75rem)] font-semibold text-white"
              style={{ textShadow: "0 4px 20px rgba(255,90,150,0.6)" }}
            >
              Will You Be Mine?
            </h1>
            <p className="mb-10 max-w-sm font-display text-[clamp(1rem,2.6vw,1.25rem)] italic text-white/90">
              My heart already chose you...now i'm just waiting for your
              answer{" "}
            </p>

            {/* playground holds both buttons so the NO button has room to roam */}
            <div
              ref={playgroundRef}
              className="relative flex h-64 w-full max-w-sm items-center justify-center gap-6 sm:h-56"
            >
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10 rounded-full bg-white px-10 py-4 font-body text-lg font-semibold text-rose shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                YES ❤️
              </motion.button>

              <motion.button
                ref={noBtnRef}
                onClick={escape}
                onMouseEnter={escape}
                onTouchStart={handleNoTouchStart}
                animate={
                  noPos
                    ? {
                        left: noPos.x,
                        top: noPos.y,
                        rotate: [0, -10, 10, -6, 0],
                      }
                    : { rotate: [0, -4, 4, 0] }
                }
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                style={
                  noPos
                    ? { position: "absolute", left: noPos.x, top: noPos.y }
                    : { position: "relative" }
                }
                className="z-10 select-none rounded-full bg-white/80 px-8 py-4 font-body text-lg font-semibold text-rose shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              >
                {noLabel}
              </motion.button>
            </div>

            {escapeCount > 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 font-display text-sm italic text-white/80"
              >
                It's okay, you can just click YES 😌
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="celebrate"
            className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h1
              className="mb-3 font-display text-[clamp(2.25rem,7vw,4rem)] font-semibold text-white"
              style={{ textShadow: "0 4px 24px rgba(255,90,150,0.7)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Congratulations ❤️
            </motion.h1>
            <p className="mb-10 max-w-sm font-display text-[clamp(1rem,2.6vw,1.3rem)] italic text-white/90">
              You just made me the happiest person alive.
            </p>

            <motion.button
              onClick={onContinue}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-full bg-white px-12 py-4 font-body text-lg font-semibold text-rose shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <motion.span
                aria-hidden
                className="absolute -inset-1 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #ff6fae, #9b6bff, #ffd166)",
                  filter: "blur(16px)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Proposal;
