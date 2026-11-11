import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@/components/ui/Icons";
import { playWoodTap, resumeAudioContext } from "@/utils/sound";

type DominoPhase =
  | "standing"
  | "teeter"
  | "hit1"
  | "hit2"
  | "slam"
  | "bounce"
  | "settled";

export const NotFoundPage = () => {
  const [phase, setPhase] = useState<DominoPhase>("standing");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioReadyRef = useRef(false);

  const startDominoCascade = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // Phase 1: Anticipation / Teetering (700ms)
    const tTeeter = setTimeout(() => setPhase("teeter"), 700);

    // Phase 2: Block 1 plunges forward (1050ms)
    const tHit1 = setTimeout(() => setPhase("hit1"), 1050);

    // Impact 1 audio — Soft hardwood knock (1360ms)
    const tAudio1 = setTimeout(() => {
      if (audioReadyRef.current) playWoodTap("soft", true);
    }, 1360);

    // Phase 3: Momentum transfer (1380ms)
    const tHit2 = setTimeout(() => setPhase("hit2"), 1380);

    // Impact 2 audio — Resonant timber clash (1680ms)
    const tAudio2 = setTimeout(() => {
      if (audioReadyRef.current) playWoodTap("switch", true);
    }, 1680);

    // Phase 4: Block 3 gravitational slam (1700ms)
    const tSlam = setTimeout(() => setPhase("slam"), 1700);

    // Impact 3 audio — Heavy solid thud (2000ms)
    const tAudio3 = setTimeout(() => {
      if (audioReadyRef.current) playWoodTap("deep", true);
    }, 2000);

    // Phase 5: Micro-bounce (2020ms)
    const tBounce = setTimeout(() => setPhase("bounce"), 2020);

    // Phase 6: Settled (2160ms)
    const tSettled = setTimeout(() => setPhase("settled"), 2160);

    timersRef.current = [tTeeter, tHit1, tAudio1, tHit2, tAudio2, tSlam, tAudio3, tBounce, tSettled];
  }, []);

  const handleRebuild = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    playWoodTap("soft", true);
    setPhase("standing");

    const tRestart = setTimeout(() => startDominoCascade(), 3200);
    timersRef.current = [tRestart];
  }, [startDominoCascade]);

  useEffect(() => {
    // Start visual cascade immediately — always visible regardless of audio state
    startDominoCascade();

    // Try to unlock AudioContext right away (succeeds when user navigated via click)
    resumeAudioContext()
      .then(() => { audioReadyRef.current = true; })
      .catch(() => {});

    // Fallback: on first user gesture anywhere on page, unlock audio and restart
    // cascade with sound (only if audio wasn't already unlocked above)
    const unlock = () => {
      if (audioReadyRef.current) return;
      resumeAudioContext()
        .then(() => { audioReadyRef.current = true; })
        .catch(() => {});
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      timersRef.current.forEach(clearTimeout);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [startDominoCascade]);

  const isFallen = phase === "settled" || phase === "bounce" || phase === "slam";

  // Block 1 dynamic 3D transform & transition curve
  const getBlock1Style = () => {
    const base = { transformOrigin: "bottom right" };
    switch (phase) {
      case "teeter":
        return {
          ...base,
          transform: "rotateX(2deg) rotateY(4deg) rotateZ(-3deg) translate3d(-1px, -1px, 0)",
          transition: "transform 350ms ease-in-out",
        };
      case "hit1":
        return {
          ...base,
          transform: "rotateX(5deg) rotateY(-8deg) rotateZ(54deg) translate3d(6px, 4px, 0)",
          transition: "transform 320ms cubic-bezier(0.5, 0, 0.75, 0.2)",
        };
      case "hit2":
        return {
          ...base,
          transform: "rotateX(7deg) rotateY(-11deg) rotateZ(70deg) translate3d(10px, 7px, 0)",
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.6, 1)",
        };
      case "slam":
      case "bounce":
      case "settled":
        return {
          ...base,
          transform: "rotateX(8deg) rotateY(-12deg) rotateZ(74deg) translate3d(12px, 8px, 0)",
          transition: "transform 350ms ease-out",
        };
      default:
        return {
          ...base,
          transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0, 0, 0)",
          transition: "transform 400ms ease-out",
        };
    }
  };

  // Block 2 dynamic 3D transform & transition curve (Roasted Walnut)
  const getBlock2Style = () => {
    const base = { transformOrigin: "bottom right" };
    switch (phase) {
      case "hit2":
        return {
          ...base,
          transform: "rotateX(-5deg) rotateY(10deg) rotateZ(64deg) translate3d(8px, 6px, 0)",
          transition: "transform 320ms cubic-bezier(0.5, 0, 0.75, 0.2)",
        };
      case "slam":
      case "bounce":
      case "settled":
        return {
          ...base,
          transform: "rotateX(-7deg) rotateY(13deg) rotateZ(78deg) translate3d(13px, 9px, 0)",
          transition: "transform 350ms ease-out",
        };
      default:
        return {
          ...base,
          transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0, 0, 0)",
          transition: "transform 400ms ease-out",
        };
    }
  };

  // Block 3 dynamic 3D transform & transition curve (Oak Finisher with micro-bounce)
  const getBlock3Style = () => {
    const base = { transformOrigin: "bottom right" };
    switch (phase) {
      case "slam":
        return {
          ...base,
          transform: "rotateX(4deg) rotateY(-6deg) rotateZ(88deg) translate3d(15px, 13px, 0)",
          transition: "transform 300ms cubic-bezier(0.55, 0.05, 0.85, 0.3)",
        };
      case "bounce":
        return {
          ...base,
          transform: "rotateX(2deg) rotateY(-4deg) rotateZ(82deg) translate3d(13px, 10px, 0)",
          transition: "transform 140ms ease-out",
        };
      case "settled":
        return {
          ...base,
          transform: "rotateX(3deg) rotateY(-5deg) rotateZ(85.5deg) translate3d(14px, 12px, 0)",
          transition: "transform 160ms cubic-bezier(0.25, 1, 0.5, 1)",
        };
      default:
        return {
          ...base,
          transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0, 0, 0)",
          transition: "transform 400ms ease-out",
        };
    }
  };

  const getShadow1Class = () => {
    if (phase === "teeter") return "w-12 -translate-x-1 opacity-35";
    if (phase === "hit1") return "w-20 translate-x-3 translate-y-1 scale-x-120 opacity-60";
    if (phase === "hit2" || phase === "slam" || phase === "bounce" || phase === "settled") {
      return "w-23 translate-x-4 translate-y-1 scale-x-130 opacity-70";
    }
    return "w-13 translate-x-0 translate-y-0 opacity-40 group-hover:scale-95";
  };

  const getShadow2Class = () => {
    if (phase === "hit2") return "w-21 translate-x-4 translate-y-2 scale-x-120 opacity-70";
    if (phase === "slam" || phase === "bounce" || phase === "settled") {
      return "w-24 translate-x-5 translate-y-2 scale-x-130 opacity-75";
    }
    return "w-13 translate-x-0 translate-y-0 opacity-40 group-hover:scale-95";
  };

  const getShadow3Class = () => {
    if (phase === "slam") return "w-26 translate-x-7 translate-y-3 scale-x-140 opacity-80 blur-[3px]";
    if (phase === "bounce") return "w-22 translate-x-6 translate-y-2 scale-x-125 opacity-65 blur-[2.5px]";
    if (phase === "settled") return "w-25 translate-x-7 translate-y-3 scale-x-135 opacity-75 blur-[2px]";
    return "w-13 translate-x-0 translate-y-0 opacity-40 group-hover:scale-95";
  };

  return (
    <div className="mx-auto flex min-h-[60vh] flex-col items-center justify-center px-3.5 sm:px-4 py-12 sm:py-16 text-center">
      <div className="tactile-card rounded-2xl p-7 sm:p-10 max-w-sm w-full">
        {/* 3D Domino Stage with Realistic Perspective */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleRebuild}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleRebuild();
          }}
          title="Click to reset and knock down the dominoes"
          className="group relative mx-auto my-4 flex h-32 items-end justify-center gap-3.5 sm:gap-4.5 cursor-pointer select-none [perspective:1000px]"
        >
          {/* Table surface line */}
          <div className="absolute -bottom-1 h-2.5 w-68 rounded-full bg-[#B89670]/60 shadow-[inset_0_2px_4px_rgba(42,22,6,0.3)] dark:bg-[#3D2616] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />

          {/* Block 1: '4' (Light Nordic Oak — Domino Initiator with Anticipation & Follow-through) */}
          <div className="relative flex flex-col items-center">
            {/* Tabletop Dynamic Shadow */}
            <div
              className={`absolute -bottom-2 h-3 rounded-full bg-[#26170C]/35 blur-[2px] transition-all duration-300 ease-out dark:bg-black/50 ${getShadow1Class()}`}
            />
            <div
              style={getBlock1Style()}
              className={`wood-btn flex h-20 w-15 sm:h-22 sm:w-16 items-center justify-center rounded-2xl font-mono text-4xl sm:text-5xl font-extrabold ${
                isFallen || phase === "hit1" || phase === "hit2"
                  ? "shadow-[0_2px_0_#8A6542,0_5px_8px_rgba(42,22,6,0.25)] dark:shadow-[0_2px_0_#221106]"
                  : "shadow-[0_10px_0_#8A6542,0_16px_22px_rgba(42,22,6,0.35)] group-hover:-translate-y-1 dark:shadow-[0_10px_0_#221106,0_16px_22px_rgba(0,0,0,0.55)]"
              }`}
            >
              4
            </div>
          </div>

          {/* Block 2: '0' (Deep Roasted Walnut — Dark Accent Domino with Secondary Momentum) */}
          <div className="relative flex flex-col items-center">
            {/* Tabletop Dynamic Shadow */}
            <div
              className={`absolute -bottom-2 h-3 rounded-full bg-[#26170C]/40 blur-[2px] transition-all duration-300 ease-out dark:bg-black/60 ${getShadow2Class()}`}
            />
            <div
              style={getBlock2Style()}
              className={`wood-btn-walnut flex h-20 w-15 sm:h-22 sm:w-16 items-center justify-center rounded-2xl font-mono text-4xl sm:text-5xl font-extrabold ${
                isFallen || phase === "hit2"
                  ? "shadow-[0_2px_0_#221106,0_5px_8px_rgba(0,0,0,0.3)]"
                  : "shadow-[0_10px_0_#221106,0_16px_22px_rgba(0,0,0,0.55)] group-hover:-translate-y-1"
              }`}
            >
              0
            </div>
          </div>

          {/* Block 3: '4' (Light Nordic Oak — Domino Finisher with Micro-bounce) */}
          <div className="relative flex flex-col items-center">
            {/* Tabletop Dynamic Shadow */}
            <div
              className={`absolute -bottom-2 h-3 rounded-full bg-[#26170C]/35 transition-all duration-200 ease-out dark:bg-black/50 ${getShadow3Class()}`}
            />
            <div
              style={getBlock3Style()}
              className={`wood-btn flex h-20 w-15 sm:h-22 sm:w-16 items-center justify-center rounded-2xl font-mono text-4xl sm:text-5xl font-extrabold ${
                isFallen
                  ? "shadow-[0_2px_0_#8A6542,0_4px_8px_rgba(42,22,6,0.22)] dark:shadow-[0_2px_0_#221106]"
                  : "shadow-[0_10px_0_#8A6542,0_16px_22px_rgba(42,22,6,0.35)] group-hover:-translate-y-1 dark:shadow-[0_10px_0_#221106,0_16px_22px_rgba(0,0,0,0.55)]"
              }`}
            >
              4
            </div>
          </div>
        </div>

        {/* Playful Rebuild Indicator */}
        <div className="mt-2 min-h-[22px]">
          <button
            type="button"
            onClick={handleRebuild}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#735744] hover:text-[#26170C] dark:text-[#A8927B] dark:hover:text-[#F5EBE0] transition-opacity duration-500 cursor-pointer ${
              isFallen ? "opacity-90" : "opacity-0 pointer-events-none"
            }`}
          >
            <span>↺ Tap to rebuild dominoes</span>
          </button>
        </div>

        <h1 className="mt-2 text-xl font-extrabold tracking-tight text-[#26170C] dark:text-[#F5EBE0]">
          Page not found
        </h1>
        <p className="mt-1 text-xs text-[#5C4938] dark:text-[#D8C2A8]">
          The page you are looking for does not exist.
        </p>
        <div className="mt-5">
          <Link
            to="/"
            className="wood-btn inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            <span>Go to catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
