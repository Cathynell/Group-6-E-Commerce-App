import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import leavesBg from '../assets/leaves.jpg';

export default function SplashPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #2b1d18;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
        }

        .splash-phone {
          width: 375px;
          height: 812px;
          border-radius: 48px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7);
          background-image: url(${leavesBg});
          background-size: cover;
          background-position: center;
        }

        /* ── INTRO SCREEN ── */
        .intro-screen {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-image: url(${leavesBg});
          background-size: cover;
          background-position: center;
          transition: opacity 0.8s ease;
        }

        .intro-screen.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .intro-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 20, 8, 0.58);
        }

        .intro-logo-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }

        .intro-logo {
          font-family: 'Plaster', serif;
          font-size: 82px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -2px;
          display: flex;
          align-items: center;
        }

        .intro-logo .v-letter {
          color: ##4EA8A66;
        }

        .intro-logo .ale-letters {
          color: #f0e8db;
        }

        .intro-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #4E8A66;
          letter-spacing: 0.5px;
        }

        .intro-tagline em {
          font-style: italic;
          color: #4E8A66;
          font-weight: 300;
        }

        /* ── MAIN SPLASH ── */
        .splash-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,18,8,0.25) 0%,
            rgba(10,18,8,0.15) 30%,
            rgba(8,15,6,0.6) 65%,
            rgba(5,10,4,0.93) 100%
          );
          z-index: 2;
        }

        .splash-status {
          position: absolute;
          top: 16px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .splash-time { font-size: 15px; font-weight: 600; color: #fff; }
        .splash-icons { display: flex; align-items: center; gap: 5px; }

        .splash-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 28px 52px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .splash-pill {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .splash-title {
          font-family: 'Playfair Display', serif;
          font-size: 44px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 14px;
          animation: fadeUp 0.6s ease 0.25s both;
        }

        .splash-title em { font-style: italic; color: #9dd99d; }

        .splash-desc {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 290px;
          animation: fadeUp 0.6s ease 0.4s both;
        }

        .splash-btn-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          animation: fadeUp 0.6s ease 0.55s both;
        }

        .btn-primary {
          width: 100%;
          height: 54px;
          background: linear-gradient(140deg, #2e6e2e 0%, #3d9a3d 100%);
          border: none;
          border-radius: 30px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(45,110,45,0.45);
          transition: transform 0.14s ease;
        }

        .btn-primary:hover { transform: translateY(-2px); }

        .btn-secondary {
          width: 100%;
          height: 54px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.22);
          border-radius: 30px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          transition: background 0.14s ease;
        }

        .btn-secondary:hover { background: rgba(255,255,255,0.14); }

        .splash-home-bar {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 4px;
          background: rgba(255,255,255,0.25);
          border-radius: 3px;
          z-index: 10;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="splash-phone">

        {/* ── INTRO SCREEN — shows for 2.5s then fades out ── */}
        <div className={`intro-screen ${!showIntro ? 'hidden' : ''}`}>
          <div className="intro-overlay" />
          <div className="intro-logo-wrap">
            <div className="intro-logo">
              <span className="v-letter">V</span>
              <span className="ale-letters">ale</span>
            </div>
            <p className="intro-tagline">
              Find comfort in <em>every</em> choice
            </p>
          </div>
        </div>

        {/* ── MAIN SPLASH CONTENT ── */}
        <div className="splash-overlay" />

        <div className="splash-status">
          <span className="splash-time">9:41</span>
          <div className="splash-icons">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
              <rect x="0" y="7" width="3" height="5" rx="0.8" opacity="0.4"/>
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" opacity="0.6"/>
              <rect x="9" y="2" width="3" height="10" rx="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.8"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M1 6.5C4.5 3 9 1 12 1s7.5 2 11 5.5"/>
              <path d="M4 10c2-2 4.5-3.5 8-3.5s6 1.5 8 3.5"/>
              <path d="M7.5 13.5c1.5-1.5 2.5-2 4.5-2s3 .5 4.5 2"/>
              <circle cx="12" cy="17" r="1.5" fill="white"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="2.2" stroke="white" strokeWidth="1.5"/>
              <rect x="2.5" y="2.5" width="16" height="7" rx="1.2" fill="white"/>
              <rect x="23" y="4" width="2" height="4" rx="1" fill="white" opacity="0.5"/>
            </svg>
          </div>
        </div>

        <div className="splash-content">
          <span className="splash-pill">New Collection</span>
          <h1 className="splash-title">
            Shop with<br /><em>comfort</em><br />in mind.
          </h1>
          <p className="splash-desc">
            Discover products you love, delivered fast.
            Quality you can trust, prices that make sense.
          </p>
          <div className="splash-btn-row">
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              I already have an account
            </button>
          </div>
        </div>

        <div className="splash-home-bar" />
      </div>
    </>
  );
}
