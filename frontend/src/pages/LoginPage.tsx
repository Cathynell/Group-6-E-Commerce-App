import { useState } from 'react';
import leavesBg from '../assets/leaves.jpg';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
    if (password.length < 6) { alert('Please enter your password.'); return; }
    alert('Logged in!');
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #2b1d18;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .phone {
          width: 375px;
          min-height: 812px;
          background: #f5f2ec;
          border-radius: 48px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 220px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,16,6,0.35) 0%,
            rgba(8,16,6,0.15) 40%,
            rgba(8,16,6,0.5) 100%
          );
          z-index: 1;
        }

        .status-bar {
          position: absolute;
          top: 16px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .status-time {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
        }

        .status-icons { display: flex; align-items: center; gap: 5px; }

        .back-btn {
          position: absolute;
          top: 52px;
          left: 18px;
          z-index: 10;
          width: 30px;
          height: 30px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(6px);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .hero-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-size: 38px;
          font-weight: 600;
          color: #ffffff;
          z-index: 10;
          text-shadow: 0 2px 24px rgba(0,0,0,0.5);
          white-space: nowrap;
        }

        /* ── FORM CARD ── */
        .form-card {
          background: #f5f2ec;
          border-radius: 0;
          margin-top: -18px;
          flex: 1;
          z-index: 5;
          position: relative;
          padding: 30px 26px 36px;
          overflow-y: auto;
        }

        /* Cormorant Garamond for heading only */
        .form-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          color: #1a4d2e;
          margin-bottom: 6px;
        }

        .form-sub {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #999;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .field { margin-bottom: 16px; }

        .field-label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          margin-bottom: 7px;
        }

        .field-wrap { position: relative; }

        .field-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .field-input {
          width: 100%;
          height: 48px;
          background: #ffffff;
          border: 1.5px solid #e6e1db;
          border-radius: 10px;
          padding: 0 44px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #222;
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .field-input:focus {
          border-color: #2d7a4f;
          box-shadow: 0 0 0 3px rgba(45,122,79,0.12);
        }

        .eye-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        /* remember + forgot row */
        .remember-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
          margin-top: 4px;
        }

        .remember-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remember-checkbox {
          width: 14px;
          height: 14px;
          accent-color: #1a4d2e;
          cursor: pointer;
        }

        .remember-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #888;
        }

        .forgot-link {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #e53935;
          text-decoration: none;
        }

        .forgot-link:hover { text-decoration: underline; }

        /* CTA */
        .cta-btn {
          width: 100%;
          height: 52px;
          background: linear-gradient(140deg, #1a4d2e 0%, #2d7a4f 100%);
          border: none;
          border-radius: 30px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(26,77,46,0.38);
          transition: transform 0.14s ease;
        }

        .cta-btn:hover { transform: translateY(-1px); }

        /* divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0 18px;
        }

        .divider-line { flex: 1; height: 1px; background: #dbd6d0; }

        .divider-text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #aaa;
          white-space: nowrap;
        }

        /* social */
        .social-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .social-btn {
          width: 50px;
          height: 50px;
          background: #ffffff;
          border: 1.5px solid #e6e1db;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.14s ease;
        }

        .social-btn:hover { transform: translateY(-2px); }

        /* signup link */
        .signup-row {
          font-family: 'Inter', sans-serif;
          text-align: center;
          font-size: 12.5px;
          color: #999;
        }

        .signup-row a {
          color: #2d7a4f;
          font-weight: 600;
          text-decoration: none;
          margin-left: 3px;
        }

        .home-bar {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 4px;
          background: rgba(0,0,0,0.18);
          border-radius: 3px;
        }
      `}</style>

      <div className="phone">

        {/* HERO */}
        <div
          className="hero"
          style={{
            backgroundImage: `url(${leavesBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="hero-overlay" />

          <div className="status-bar">
            <span className="status-time">9:41</span>
            <div className="status-icons">
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

          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <h1 className="hero-title">Log in</h1>
        </div>

        {/* FORM */}
        <div className="form-card">

          <h2 className="form-heading">Welcome back!</h2>
          <p className="form-sub">Continue curating your taste by logging in</p>

          {/* Email */}
          <div className="field">
            <label className="field-label" htmlFor="email">Email address</label>
            <div className="field-wrap">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="2,7 12,14 22,7"/>
                </svg>
              </span>
              <input className="field-input" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <label className="field-label" htmlFor="password">Password</label>
            <div className="field-wrap">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input className="field-input" id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}/>
              <button className="eye-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="remember-row">
            <div className="remember-left">
              <input className="remember-checkbox" type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)}/>
              <label className="remember-label" htmlFor="remember">Remember me</label>
            </div>
            <a className="forgot-link" href="#">Forgot Password?</a>
          </div>

          {/* Login button */}
          <button className="cta-btn" type="button" onClick={handleLogin}>Login</button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"/>
            <span className="divider-text">Login with</span>
            <div className="divider-line"/>
          </div>

          {/* Social */}
          <div className="social-row">
            <button className="social-btn" type="button">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button className="social-btn" type="button">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </button>
            <button className="social-btn" type="button">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#0f0f0f">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>

          <p className="signup-row">Don't have an account? <a href="#" onClick={() => navigate('/signup')}>Sign up.</a></p>
        </div>

        <div className="home-bar"/>
      </div>
    </>
  );
}
