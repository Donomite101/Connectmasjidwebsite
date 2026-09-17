import React, { useState, useEffect, useRef } from 'react';
import { Download, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

/* ── Real verified masjids from ConnectMasjid database ── */
const MOSQUE_POOL = [
  { name: 'Masjid e Madina', weight: 700, size: '1rem' },
  { name: 'Masjid E Hassan', weight: 400, size: '1.05rem', italic: true },
  { name: 'Masjid E Tooba', weight: 800, size: '1.1rem', spacing: '-0.02em' },
  { name: 'Masjid Hazrat Bilal', weight: 700, size: '1rem' },
  { name: 'Hazrat Abu Bakr Masjid', weight: 900, size: '1.15rem', spacing: '-0.03em' },
  { name: 'AFMC Masjid', weight: 800, size: '1.1rem', spacing: '-0.01em' },
  { name: 'Azam Campus Masjid', weight: 600, size: '0.98rem' },
  { name: 'Jama Masjid Bahul', weight: 400, size: '1.05rem', italic: true },
  { name: 'Hussenia Masjid', weight: 700, size: '1rem' },
  { name: 'Jai Jawan Society Masjid', weight: 500, size: '0.9rem', spacing: '0.05em', upper: true },
  { name: 'Sholpaur Bazar Masjid', weight: 600, size: '0.97rem' },
  { name: 'New Modikhana Masjid', weight: 700, size: '1rem' },
  { name: 'Poona College Masjid', weight: 800, size: '1.08rem', spacing: '-0.02em' },
  { name: 'Takiya Shahi Masjid', weight: 900, size: '1.15rem', spacing: '-0.03em' },
  { name: 'Mulani Masjid', weight: 500, size: '0.88rem', spacing: '0.06em', upper: true },
  { name: 'Shahi Masjid Markel', weight: 700, size: '1rem' },
  { name: 'Misgar Masjid', weight: 400, size: '1.05rem', italic: true },
  { name: 'Masjid Jamiatul Quraish', weight: 800, size: '1.05rem', spacing: '-0.015em' },
  { name: 'Usmaniya Masjid', weight: 900, size: '1.18rem', spacing: '-0.03em' },
  { name: 'Jama Masjid Ahl E Sunnat', weight: 600, size: '0.95rem' },
  { name: 'Masjid E Maulana Ilyaas', weight: 700, size: '1rem' },
];

function toStyle(m) {
  return {
    fontWeight: m.weight,
    fontSize: m.size,
    fontStyle: m.italic ? 'italic' : 'normal',
    letterSpacing: m.spacing ?? 'normal',
    textTransform: m.upper ? 'uppercase' : 'none',
  };
}

const SLOTS = 6;

function pickRandom(pool, exclude = []) {
  const available = pool.filter(m => !exclude.includes(m.name));
  return available[Math.floor(Math.random() * available.length)];
}

function initSlots() {
  const used = [];
  return Array.from({ length: SLOTS }, (_, i) => {
    const m = pickRandom(MOSQUE_POOL, used);
    used.push(m.name);
    return { mosque: m, uid: `slot-${i}-init` };
  });
}

export default function Hero({ onExplore, openAuthModal }) {
  const [slots, setSlots] = useState(initSlots);
  const [exiting, setExiting] = useState(false);
  const intervalRef = useRef(null);
  const heroRef = useRef(null);
  const ctaBtnRef = useRef(null);

  /* CountUp numbers state */
  const [masjidCount, setMasjidCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [ratingVal, setRatingVal] = useState(0);

  /* GSAP high-CTR animations */
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      /* 1. Main title spring reveal */
      tl.from('.hero-display-title', {
        y: 45,
        opacity: 0,
        scale: 0.95,
        duration: 0.95,
        ease: 'back.out(1.2)',
        delay: 0.1,
      })
        /* 3. Subtitle fade up */
        .from('.hero-sub', {
          y: 25,
          opacity: 0,
          duration: 0.75,
        }, '-=0.6')
        /* 4. CTA row bounce entrance */
        .from('.hero-cta-row', {
          y: 25,
          opacity: 0,
          scale: 0.92,
          duration: 0.8,
          ease: 'back.out(1.4)',
        }, '-=0.5')
        /* 5. Stats card scale pop + trigger number CountUp */
        .from('.hero-stats-card', {
          y: 35,
          opacity: 0,
          scale: 0.9,
          duration: 0.85,
          ease: 'back.out(1.3)',
          onComplete: () => {
            /* Number CountUp Tweens */
            const countObj = { m: 0, u: 0, r: 0 };
            gsap.to(countObj, {
              m: 100,
              u: 500,
              r: 5.0,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                setMasjidCount(Math.floor(countObj.m));
                setUserCount(Math.floor(countObj.u));
                setRatingVal(countObj.r.toFixed(1));
              },
            });

            /* Continuous Levitation / Float Loop */
            gsap.to('.hero-stats-card', {
              y: -10,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        }, '-=0.45')
        /* 6. Social proof bar fade */
        .from('.hero-social-proof', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.4');

      /* Continuous gentle pulse on main CTA button scale */
      gsap.to('.btn-green-pill', {
        scale: 1.025,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* Magnetic hover effect on main CTA */
  const handleMouseMove = (e) => {
    if (!ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distX = e.clientX - btnCenterX;
    const distY = e.clientY - btnCenterY;

    if (Math.abs(distX) < 140 && Math.abs(distY) < 80) {
      gsap.to(ctaBtnRef.current, {
        x: distX * 0.28,
        y: distY * 0.28,
        rotate: distX * 0.03,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(ctaBtnRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (ctaBtnRef.current) {
      gsap.to(ctaBtnRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setSlots(() => {
          const used = [];
          return Array.from({ length: SLOTS }, (_, i) => {
            const m = pickRandom(MOSQUE_POOL, used);
            used.push(m.name);
            return { mosque: m, uid: `slot-${i}-${Date.now()}` };
          });
        });
        setExiting(false);
      }, 400);
    }, 2800);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section ref={heroRef} className="hero-v2" id="hero" aria-label="Hero section">
      {/* Ambient glow blobs */}
      <div className="hero-glow-blob hero-glow-blob-1" aria-hidden="true" />
      <div className="hero-glow-blob hero-glow-blob-2" aria-hidden="true" />
      <div className="hero-glow-blob hero-glow-blob-3" aria-hidden="true" />

      <div className="hero-content">
        {/* Main giant headline */}
        <h1 className="hero-display-title">
          The Masjid App<br />
          Your{' '}
          <span className="green-word">Community</span>
          <br />
          <span className="italic-light">Deserves</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub">
          Live Jama'at timings and verified mosque updates — all in one place.
        </p>

        {/* CTA row with magnetic hover listener */}
        <div
          className="hero-cta-row"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <a
            ref={ctaBtnRef}
            id="hero-download-btn"
            className="btn-green-pill"
            href="https://play.google.com/store/apps/details?id=com.connectmasjid.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download ConnectMasjid app on Google Play"
          >
            <Download size={18} />
            Download the App
          </a>
          <button
            id="hero-signup-btn"
            className="btn-ghost-pill"
            onClick={onExplore}
            aria-label="Sign up for free"
          >
            Sign Up for Free
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Floating stats card with live animated numbers */}
        <div className="hero-stats-card" role="region" aria-label="App statistics">
          <div className="hero-stat-item">
            <div className="hero-stat-number">{masjidCount}<span>+</span></div>
            <div className="hero-stat-label">Verified Masjids</div>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat-item">
            <div className="hero-stat-number">{userCount}<span>+</span></div>
            <div className="hero-stat-label">Active Users</div>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat-item">
            <div className="hero-stat-number">{ratingVal > 0 ? ratingVal : '0.0'}<span>★</span></div>
            <div className="hero-stat-label">App Store Rating</div>
          </div>
        </div>
      </div>

      {/* Social proof — cycling masjid names */}
      <div className="hero-social-proof">
        <div className="hero-proof-tagline">
          <span className="hero-proof-line" />
          <span className="hero-proof-text">
            Trusted by <strong>100+ masjids</strong> and their communities worldwide.
          </span>
          <span className="hero-proof-line" />
        </div>

        <div className="hero-proof-logos">
          {slots.map((slot, i) => (
            <span
              key={slot.uid}
              className={`hero-proof-logo ${exiting ? 'proof-exit' : 'proof-enter'}`}
              style={toStyle(slot.mosque)}
              aria-label={slot.mosque.name}
            >
              {slot.mosque.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
