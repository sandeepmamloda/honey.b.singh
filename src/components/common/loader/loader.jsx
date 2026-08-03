"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import styles from "./loader.module.css";


const LoaderContext =
  createContext(null);


/* ══════════════════════════════
   TIMINGS
══════════════════════════════ */

// First load
const INTRO_COVER_MS = 500;
const INTRO_TEXT_HOLD_MS = 1100;
const INTRO_TEXT_EXIT_MS = 700;
const INTRO_REVEAL_MS = 900;


// Navigation
const NAV_COVER_MS = 700;
const NAV_REVEAL_MS = 900;


// Total navigation animation time
const NAV_TOTAL_MS =
  NAV_COVER_MS +
  NAV_REVEAL_MS;


// Navigate when 48% of the
// complete loader animation is done
const NAVIGATION_AT_48_PERCENT =
  NAV_TOTAL_MS * 0.48;


/* ══════════════════════════════
   LOADER COLORS
══════════════════════════════ */

const LOADER_COLORS = [
  "rgba(255, 197, 234, 1)",
  "rgba(180, 162, 237, 1)",
  "rgba(255, 237, 168, 1)",
  "rgba(255, 161, 162, 1)",
];


/* ══════════════════════════════
   LOADER
══════════════════════════════ */

export default function Loader({
  children,
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();


  const [
    phase,
    setPhase,
  ] = useState(
    "introCovering"
  );


  const [
    isBehind,
    setIsBehind,
  ] = useState(
    false
  );


  const [
    loaderColor,
    setLoaderColor,
  ] = useState(
    LOADER_COLORS[0]
  );


  const pendingHref =
    useRef(null);


  const navigationTimers =
    useRef([]);


  const colorIndex =
    useRef(0);


  /* ══════════════════════════════
     FIRST LOAD
  ══════════════════════════════ */

  useEffect(() => {

    document.documentElement.style.overflowY =
      "hidden";


    // Bottom → Center
    const coverTimer =
      setTimeout(() => {

        setPhase(
          "introCovered"
        );

      }, INTRO_COVER_MS);


    // Text exits
    const textExitTimer =
      setTimeout(() => {

        setPhase(
          "introExit"
        );

      }, (
        INTRO_COVER_MS +
        INTRO_TEXT_HOLD_MS
      ));


    // Center → Top
    const revealTimer =
      setTimeout(() => {

        setPhase(
          "introRevealing"
        );

      }, (
        INTRO_COVER_MS +
        INTRO_TEXT_HOLD_MS +
        INTRO_TEXT_EXIT_MS
      ));


    // Intro complete
    const doneTimer =
      setTimeout(() => {

        setIsBehind(
          true
        );


        setPhase(
          "idle"
        );


        document.documentElement.style.overflowY =
          "";

      }, (
        INTRO_COVER_MS +
        INTRO_TEXT_HOLD_MS +
        INTRO_TEXT_EXIT_MS +
        INTRO_REVEAL_MS
      ));


    return () => {

      clearTimeout(
        coverTimer
      );


      clearTimeout(
        textExitTimer
      );


      clearTimeout(
        revealTimer
      );


      clearTimeout(
        doneTimer
      );


      document.documentElement.style.overflowY =
        "";

    };

  }, []);


  /* ══════════════════════════════
     CUSTOM NAVIGATION
  ══════════════════════════════ */

  const navigate = (
    href
  ) => {

    if (!href) {
      return;
    }


    if (
      href === pathname
    ) {
      return;
    }


    if (
      phase !== "idle"
    ) {
      return;
    }


    /*
      Clear previous timers
    */

    navigationTimers.current.forEach(
      clearTimeout
    );


    navigationTimers.current =
      [];


    /*
      CHANGE LOADER COLOR

      Every navigation gets
      the next color.
    */

    colorIndex.current =
      (
        colorIndex.current +
        1
      ) %
      LOADER_COLORS.length;


    setLoaderColor(
      LOADER_COLORS[
        colorIndex.current
      ]
    );


    /*
      Bring loader above
      the page
    */

    setIsBehind(
      false
    );


    pendingHref.current =
      href;


    document.documentElement.style.overflowY =
      "hidden";


    /*
      STEP 1

      Bottom → Center
    */

    setPhase(
      "covering"
    );


    /*
      STEP 2

      Center → Top
    */

    const revealTimer =
      setTimeout(() => {

        setPhase(
          "revealing"
        );

      }, NAV_COVER_MS);


    /*
      STEP 3

      Navigate at 48%
    */

    const navigationTimer =
      setTimeout(() => {

        if (
          pendingHref.current
        ) {

          router.push(
            pendingHref.current
          );


          pendingHref.current =
            null;
        }

      }, NAVIGATION_AT_48_PERCENT);


    navigationTimers.current =
      [
        revealTimer,
        navigationTimer,
      ];

  };


  /* ══════════════════════════════
     REVEALING → IDLE
  ══════════════════════════════ */

  useEffect(() => {

    if (
      phase !== "revealing"
    ) {
      return;
    }


    const timer =
      setTimeout(() => {

        setIsBehind(
          true
        );


        setPhase(
          "idle"
        );


        document.documentElement.style.overflowY =
          "";

      }, NAV_REVEAL_MS);


    return () => {

      clearTimeout(
        timer
      );

    };

  }, [phase]);


  /* ══════════════════════════════
     CLEANUP
  ══════════════════════════════ */

  useEffect(() => {

    return () => {

      navigationTimers.current.forEach(
        clearTimeout
      );


      document.documentElement.style.overflowY =
        "";

    };

  }, []);


  /* ══════════════════════════════
     VISUAL STATES
  ══════════════════════════════ */

  /*
    Text is visible during:

    First load:
    introCovered → introExit

    Every navigation:
    covering → revealing
  */

  const showText =
    phase === "introCovered" ||
    phase === "introExit" ||
    phase === "covering" ||
    phase === "revealing";


  const overlayClass =
    {

      introCovering:
        styles.overlayVisible,

      introCovered:
        styles.overlayVisible,

      introExit:
        styles.overlayVisible,

      introRevealing:
        styles.curtainUp,


      covering:
        styles.overlayVisible,

      revealing:
        styles.curtainUp,


      idle:
        styles.overlayHidden,

    }[
      phase
    ] ||
    styles.overlayHidden;


  return (

    <LoaderContext.Provider
      value={{
        navigate,
      }}
    >

      {/* ══════════════════════════════
          LOADER
      ══════════════════════════════ */}

      <div
        className={`
          ${styles.overlay}
          ${overlayClass}
          ${
            isBehind
              ? styles.overlayBehind
              : ""
          }
        `}
        style={{
          backgroundColor:
            loaderColor,
        }}
        aria-hidden="true"
      >

        {showText && (

          <span
            className={`
              ${styles.text}
              ${
                phase === "introExit" ||
                phase === "revealing"
                  ? styles.textExit
                  : styles.textEnter
              }
            `}
          >
            welcome to honeybsingh.com
          </span>

        )}

      </div>


      {/* ══════════════════════════════
          PAGE
      ══════════════════════════════ */}

      <div
        className={styles.page}
      >
        {children}
      </div>

    </LoaderContext.Provider>

  );

}


/* ══════════════════════════════
   HOOK
══════════════════════════════ */

export function useLoaderNavigate() {

  const context =
    useContext(
      LoaderContext
    );


  if (
    !context
  ) {

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

  const navigate =
    useLoaderNavigate();


  return (
    <a
    
      href={href}
      className={className}

      onClick={(event) => {

        event.preventDefault();


        navigate(
          href
        );

      }}

      {...rest}
    >

      {children}

    </a>

  );

}