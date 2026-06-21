"use client";

import { useMemo } from "react";

const shellStyles = `
  .app-shell {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background:
      radial-gradient(circle at 18% 20%, rgba(75, 162, 255, 0.18), transparent 24%),
      radial-gradient(circle at 82% 18%, rgba(32, 214, 255, 0.12), transparent 20%),
      radial-gradient(circle at 50% 108%, rgba(255, 90, 90, 0.15), transparent 28%),
      linear-gradient(180deg, #020816 0%, #061326 48%, #020816 100%);
  }

  .app-frame {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    background: transparent;
  }

  .app-overlay {
    position: absolute;
    left: 18px;
    top: 18px;
    z-index: 2;
    width: min(360px, calc(100vw - 36px));
    padding: 16px;
    border-radius: 20px;
    background: rgba(5, 16, 33, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  }

  .app-kicker {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.46);
  }

  .app-title {
    margin-top: 6px;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .app-copy {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.72);
  }

  .app-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 14px;
  }

  .app-pill {
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.84);
  }

  .app-note {
    position: absolute;
    left: 18px;
    bottom: 18px;
    z-index: 2;
    max-width: min(420px, calc(100vw - 36px));
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(5, 16, 33, 0.64);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    line-height: 1.5;
  }

  @media (max-width: 680px) {
    .app-overlay {
      width: calc(100vw - 24px);
      left: 12px;
      top: 12px;
      padding: 14px;
    }

    .app-note {
      left: 12px;
      right: 12px;
      bottom: 12px;
      max-width: none;
    }

    .app-title {
      font-size: 21px;
    }
  }
`;

export default function Page() {
  const title = useMemo(() => "Seismic Globe", []);

  return (
    <main className="app-shell">
      <style jsx>{shellStyles}</style>
      <iframe
        className="app-frame"
        title={title}
        src="/index.html"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <section className="app-overlay">
        <div className="app-kicker">React Migration Baseline</div>
        <h1 className="app-title">{title}</h1>
        <p className="app-copy">
          This Next.js shell preserves the current immersive globe experience while we migrate the project
          into a maintainable React architecture one feature at a time.
        </p>
        <div className="app-row">
          <div className="app-pill">Next.js App Router</div>
          <div className="app-pill">Ready for componentization</div>
          <div className="app-pill">Current UX preserved</div>
        </div>
      </section>
      <div className="app-note">
        Phase 1 keeps the working globe intact inside the React app shell so we can safely move scene,
        panels, replay, and data layers into reusable React components next.
      </div>
    </main>
  );
}
