"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

// Lazy-load heavy/interactive components and mount them in a phased manner
const SessionReminder = dynamic(() => import("@/components/session-reminder").then(m => m.SessionReminder), { ssr: false });
const SubscriptionModal = dynamic(() => import("@/components/subscription-modal"), { ssr: false });
const SpeedDialWidget = dynamic(() => import("@/components/speed-dial-widget"), { ssr: false });

export default function EngagementOrchestrator() {
  const [showSpeedDial, setShowSpeedDial] = useState(false);
  const [showSessionReminder, setShowSessionReminder] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const didTrackShown = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const docH = document.documentElement.scrollHeight || document.body.scrollHeight;
      const progress = (scrollTop + vh) / Math.max(docH, 1);

      // Reveal progressively on meaningful engagement
      if (!showSpeedDial && progress > 0.35) {
        setShowSpeedDial(true);
        if (!didTrackShown.current) {
          track('speed_dial.shown', { cause: 'scroll', progress });
          didTrackShown.current = true;
        }
      }
      if (!showSubscriptionModal && progress > 0.5) setShowSubscriptionModal(true);
    };

    // Time-based fallbacks so features still appear on short pages
    const timers: number[] = [];
    timers.push(window.setTimeout(() => {
      setShowSpeedDial(true);
      if (!didTrackShown.current) {
        track('speed_dial.shown', { cause: 'timer', ms: 8000 });
        didTrackShown.current = true;
      }
    }, 8000));
    timers.push(window.setTimeout(() => setShowSessionReminder(true), 15000));
    timers.push(window.setTimeout(() => setShowSubscriptionModal(true), 22000));

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize

    return () => {
      timers.forEach(t => window.clearTimeout(t));
      window.removeEventListener('scroll', onScroll);
    };
  }, [showSpeedDial, showSubscriptionModal]);

  return (
    <>
      {showSpeedDial && <SpeedDialWidget />}
      {showSessionReminder && <SessionReminder />}
      {showSubscriptionModal && <SubscriptionModal />}
    </>
  );
}
