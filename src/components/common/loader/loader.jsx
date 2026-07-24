"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./loader.module.css";

const LoaderContext = createContext(null);

/* ══════════════════════════════
   TIMINGS
══════════════════════════════ */

// First load
const INTRO_COVER_MS = 700;
const INTRO_TEXT_HOLD_MS = 1100;
const INTRO_TEXT_EXIT_MS = 700;
const INTRO_REVEAL_MS = 900;

// Navigation
const NAV_COVER_MS = 700;
const NAV_HOLD_MS = 150;
const NAV_REVEAL_DELAY_MS = 150;
const NAV_REVEAL_MS = 900;


/* ══════════════════════════════
   LOADER
══════════════════════════════ */

export default function Loader({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState("introCovering");

  /*
    z-index is controlled separately.

    true  → loader is behind the page
    false → loader is above the page
  */
  const [isBehind, setIsBehind] = useState(false);

  const previousPathname = useRef(pathname);

  const pendingHref = useRef(null);

  const customNavigation = useRef(false);


  /* ══════════════════════════════
     FIRST LOAD
  ══════════════════════════════ */

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";


    // Bottom → Center
    const coverTimer = setTimeout(() => {
      setPhase("introCovered");
    }, INTRO_COVER_MS);


    // Text exits
    const textExitTimer = setTimeout(() => {
      setPhase("introExit");
    }, INTRO_COVER_MS + INTRO_TEXT_HOLD_MS);


    // Center → Top
    const revealTimer = setTimeout(() => {
      setPhase("introRevealing");
    }, INTRO_COVER_MS + INTRO_TEXT_HOLD_MS + INTRO_TEXT_EXIT_MS);


    // Intro complete
    const doneTimer = setTimeout(() => {
      setIsBehind(true);

      setPhase("idle");

      document.documentElement.style.overflow = "";
    }, INTRO_COVER_MS + INTRO_TEXT_HOLD_MS + INTRO_TEXT_EXIT_MS + INTRO_REVEAL_MS);


    return () => {
      clearTimeout(coverTimer);
      clearTimeout(textExitTimer);
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);

      document.documentElement.style.overflow = "";
    };
  }, []);


  /* ══════════════════════════════
     CUSTOM NAVIGATION
  ══════════════════════════════ */

  const navigate = (href) => {
    if (!href) return;

    if (href === pathname) return;

    if (phase !== "idle") return;


    /*
      Bring loader back above the page
      before starting a new animation.
    */
    setIsBehind(false);


    customNavigation.current = true;

    pendingHref.current = href;


    document.documentElement.style.overflow = "hidden";


    // Bottom → Center
    setPhase("covering");
  };


  /* ══════════════════════════════
     COVERING → COVERED
  ══════════════════════════════ */

  useEffect(() => {
    if (phase !== "covering") return;


    const timer = setTimeout(() => {
      setPhase("covered");
    }, NAV_COVER_MS);


    return () => {
      clearTimeout(timer);
    };
  }, [phase]);


  /* ══════════════════════════════
     COVERED → ROUTE CHANGE
  ══════════════════════════════ */

  useEffect(() => {
    if (phase !== "covered") return;


    const timer = setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current);

        pendingHref.current = null;
      }
    }, NAV_HOLD_MS);


    return () => {
      clearTimeout(timer);
    };
  }, [phase, router]);


  /* ══════════════════════════════
     PATHNAME CHANGE
  ══════════════════════════════ */

  useEffect(() => {
    if (pathname === previousPathname.current) {
      return;
    }


    previousPathname.current = pathname;


    /*
      LoaderLink navigation:

      Loader is already centered.
      New page has mounted.
      Start center → top.
    */

    if (customNavigation.current) {
      const timer = setTimeout(() => {
        setPhase("revealing");
      }, NAV_REVEAL_DELAY_MS);


      return () => {
        clearTimeout(timer);
      };
    }


    /*
      External navigation:

      Normal Link
      router.push()
      browser back / forward

      The route has already changed.
    */

    setIsBehind(false);

    document.documentElement.style.overflow = "hidden";


    // Bottom → Center
    setPhase("covering");


    const timer = setTimeout(() => {
      setPhase("covered");


      const revealTimer = setTimeout(() => {
        setPhase("revealing");
      }, NAV_HOLD_MS + NAV_REVEAL_DELAY_MS);


      return () => {
        clearTimeout(revealTimer);
      };
    }, NAV_COVER_MS);


    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);


  /* ══════════════════════════════
     REVEALING → IDLE
  ══════════════════════════════ */

  useEffect(() => {
    if (
      phase !== "revealing" &&
      phase !== "introRevealing"
    ) {
      return;
    }


    const timer = setTimeout(() => {
      /*
        Once the loader has completely moved
        above the viewport, send it behind
        the page.
      */
      setIsBehind(true);


      setPhase("idle");


      customNavigation.current = false;


      document.documentElement.style.overflow = "";
    }, NAV_REVEAL_MS);


    return () => {
      clearTimeout(timer);
    };
  }, [phase]);


  /* ══════════════════════════════
     VISUAL STATES
  ══════════════════════════════ */

  const showText =
    phase === "introCovered" ||
    phase === "introExit";


  const overlayClass =
    {
      introCovering: styles.overlayVisible,

      introCovered: styles.overlayVisible,

      introExit: styles.overlayVisible,

      introRevealing: styles.curtainUp,

      covering: styles.overlayVisible,

      covered: styles.overlayVisible,

      revealing: styles.curtainUp,

      idle: styles.overlayHidden,
    }[phase] || styles.overlayHidden;


  return (
    <LoaderContext.Provider value={{ navigate }}>

      {/* Loader is always mounted */}
      <div
        className={`${styles.overlay} ${overlayClass} ${
          isBehind ? styles.overlayBehind : ""
        }`}
        aria-hidden="true"
      >
        {showText && (
          <span
            className={`${styles.text} ${
              phase === "introExit"
                ? styles.textExit
                : styles.textEnter
            }`}
          >
            honey oh honey
          </span>
        )}
      </div>


      {/* Page */}
      <div className={styles.page}>
        {children}
      </div>

    </LoaderContext.Provider>
  );
}


/* ══════════════════════════════
   HOOK
══════════════════════════════ */

export function useLoaderNavigate() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error(
      "useLoaderNavigate must be used inside <Loader>"
    );
  }

  return context.navigate;
}


/* ══════════════════════════════
   LOADER LINK
══════════════════════════════ */

export function LoaderLink({
  href,
  children,
  className,
  ...rest
}) {
  const navigate = useLoaderNavigate();


  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();

        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}