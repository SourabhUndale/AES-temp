import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*
  AESPL — Certifications Page
  ────────────────────────────
  • Bootstrap 5  →  all layout, grid, spacing, responsive
  • container-xl →  consistent max-width with responsive gutters
  • section-pad  →  uniform vertical rhythm (py-section)
  • Satoshi font via Fontshare CDN
  • Brand #445793
  • Lightbox gallery for certificate images
  
  TO ADD IMAGES: change  img: null  →  img: "/path/to/cert.jpg"
*/

/* ─── Bootstrap + Font loader ────────────────────────────────── */
const BootstrapLoader = () => (
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
  />
);

/* ─── Certificate data ───────────────────────────────────────── */
const CERTS = [
  { id: 1, code: "ISO 9001:2015",  scope: "Quality Management System",              status: "Active",     since: "2014", img: "./assets/images/aboutPage/Akshay Embedded ISO 9001 Certificate_page-0001.jpg" },
  { id: 2, code: "ISO 13485:2016", scope: "Medical Device Quality Management",       status: "Active",     since: "2019", img: "./assets/images/aboutPage/ISO 13485 2016 Certificate_page-0001.jpg" },
  { id: 3, code: "PATENT No 542783",  scope: "",      status: "Recognised",     since: "2020", img: "./assets/images/aboutPage/PATENT CERTIFICATE HFOV_page-0001.jpg" },
  { id: 4, code: "PATENT No 573255",  scope: "",        status: "Recognised",     since: "2020", img: "./assets/images/aboutPage/Bubbel CPAP Patent Certificate_page-0001.jpg" },
  { id: 5, code: "PATENT No 573255",          scope: "",         status: "Recognised", since: "2022", img: "./assets/images/aboutPage/Bubbel CPAP Patent Certificate_page-0002.jpg" },
  { id: 6, code: "StartUpIndia Certificate",          scope: "Startup India Recognition — 2022",      status: "Recognised",     since: "—",    img: "./assets/images/aboutPage/DIPP93440_AKSHAY_EMBEDDED_SYSTEMS_PRIVATE_LIMITED_RECOGNITION_3942222499764765202_page-0001.jpg" },
];

const mgmtCerts = [
  {
    code: "ISO 9001:2015",
    scope: "Quality Management System",
    since: "2014",
    body: "International standard for quality management across all operations. Governs how AESPL plans, executes, reviews, and improves every project from initial brief to final delivery.",
    applies: ["All embedded product design", "PCB manufacturing", "Testing & inspection", "Customer communication"],
  },
  {
    code: "ISO 13485:2016",
    scope: "Medical Device Quality Management",
    since: "2019",
    body: "The international standard for organisations involved in the design, manufacture, and servicing of medical devices. Required by regulators in India, the US, and the EU for medical device approval.",
    applies: ["Ventilator development", "Baby warmer controllers", "Patient monitoring systems", "Human milk pasteurization"],
  },
];

const standardsList = [
  { code: "IEC 60601-1-2", cat: "Medical",    title: "EMC — Medical Electrical Equipment",    products: "Ventilator, Baby Warmer",  what: "Ensures medical devices don't emit EMI that interferes with other equipment, and can withstand interference from hospital environments." },
  { code: "IEC 61000-4-2", cat: "Medical",    title: "Electrostatic Discharge (ESD) Immunity", products: "Scanner Card",             what: "Verifies embedded systems can survive ESD events without malfunction or data loss." },
  { code: "IEC 61000-4-4", cat: "Industrial", title: "EFT / Burst Immunity",                   products: "Medical & Industrial",     what: "Tests immunity to fast transient electrical bursts common in industrial switch environments and motor-driven equipment." },
  { code: "IEC 61000-4-5", cat: "Industrial", title: "Surge Immunity",                          products: "Medical & Industrial",     what: "Validates that embedded systems withstand high-energy voltage surges from switching events and lightning coupling." },
  { code: "IEC 61000-4-6", cat: "Industrial", title: "Conducted Disturbances Immunity",         products: "Industrial Systems",       what: "Tests product immunity to RF-conducted interference on power and signal lines." },
];

/* ─── Styles ─────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,900&display=swap');

    /* ── Brand tokens ── */
    :root {
      --blue:       #445793;
      --blue-dim:   rgba(68,87,147,0.08);
      --blue-bdr:   rgba(68,87,147,0.22);
      --warm:       #f5f4f0;
      --rule:       #dddbd6;
      --ink:        #0f1117;
      --body-clr:   #44424e;
      --muted-clr:  #7a7874;

      /* Vertical rhythm — one source of truth */
      --sec-py: 80px;
    }

    /* ── Base ── */
    *, *::before, *::after { box-sizing: border-box; }
    body, button, input, select, textarea {
      font-family: 'Satoshi', sans-serif !important;
    }
    ::selection { background: var(--blue); color: #fff; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: var(--blue); }

    /* ── Section vertical padding ── */
    .sec-pad { padding-top: var(--sec-py); padding-bottom: var(--sec-py); }
    @media (max-width: 768px) { :root { --sec-py: 52px; } }

    /* ── Top blue accent rule ── */
    .page-top-rule { height: 3px; background: var(--blue); }

    /* ── Dividers ── */
    .rule       { border: none; border-top: 1px solid var(--rule); margin: 0; }
    .rule-bold  { border: none; border-top: 2px solid var(--ink);  margin: 0; }

    /* ── Section eyebrow row ── */
    .sec-header-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 40px;
    }
    .sec-idx {
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--blue); white-space: nowrap; flex-shrink: 0;
    }
    .sec-header-rule { flex: 1; height: 1px; background: var(--rule); }
    .sec-overline {
      font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--muted-clr); white-space: nowrap; flex-shrink: 0;
    }

    /* ── Tags ── */
    .tag {
      display: inline-block;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 4px 10px; border-radius: 3px;
    }
    .tag-green  { background: rgba(22,163,74,0.08);  border: 1px solid rgba(22,163,74,0.28);  color: #16a34a; }
    .tag-blue   { background: var(--blue-dim);        border: 1px solid var(--blue-bdr);        color: var(--blue); }
    .tag-muted  { background: var(--warm);            border: 1px solid var(--rule);            color: var(--muted-clr); }
    .tag-amber  { background: rgba(217,119,6,0.08);   border: 1px solid rgba(217,119,6,0.28);   color: #d97706; }

    /* ── Buttons (override Bootstrap for brand) ── */
    .btn-brand {
      background: var(--blue) !important;
      border-color: var(--blue) !important;
      color: #fff !important;
      font-weight: 700;
      font-size: 14px;
      padding: 11px 24px;
      border-radius: 6px;
      transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
    }
    .btn-brand:hover {
      background: #3a4d80 !important;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(68,87,147,0.28);
    }
    .btn-brand-outline {
      background: transparent !important;
      border: 1.5px solid var(--blue-bdr) !important;
      color: var(--blue) !important;
      font-weight: 700;
      font-size: 14px;
      padding: 10px 22px;
      border-radius: 6px;
      transition: background 0.2s, border-color 0.2s;
    }
    .btn-brand-outline:hover {
      background: var(--blue-dim) !important;
      border-color: var(--blue) !important;
    }
    .btn-white-solid {
      background: #fff;
      border: none;
      color: var(--blue);
      font-weight: 700;
      font-size: 14px;
      padding: 11px 24px;
      border-radius: 6px;
      transition: transform 0.18s, box-shadow 0.2s;
    }
    .btn-white-solid:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.18);
    }

    /* ── Cert thumbnail card ── */
    .cert-thumb {
      aspect-ratio: 210 / 297;
      border: 1px solid var(--rule);
      background: var(--warm);
      cursor: pointer;
      overflow: hidden;
      position: relative;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    .cert-thumb:hover {
      border-color: var(--blue);
      box-shadow: 0 8px 32px rgba(68,87,147,0.16);
    }
    .cert-thumb:hover .th-overlay { opacity: 1; }
    .cert-thumb:hover .th-zoom    { opacity: 1; transform: scale(1); }

    .th-overlay {
      position: absolute; inset: 0;
      background: rgba(68,87,147,0.78);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.25s;
    }
    .th-zoom {
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      color: #fff;
      opacity: 0; transform: scale(0.84);
      transition: opacity 0.25s, transform 0.3s;
    }
    .th-zoom-ring {
      width: 52px; height: 52px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.9);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
    }
    .th-zoom-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }

    /* ── Placeholder cert design ── */
    .cert-ph { width: 100%; height: 100%; padding: 18px; display: flex; flex-direction: column; }
    .cert-ph-topbar  { height: 4px; background: var(--blue); border-radius: 1px; margin-bottom: 16px; }
    .cert-ph-seal {
      width: 44px; height: 44px; border-radius: 50%;
      border: 2px solid var(--blue-bdr); background: var(--blue-dim);
      display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 14px; color: var(--blue);
      margin: 0 auto 10px;
    }
    .cert-ph-code  { font-weight: 900; font-size: 11px; color: var(--blue); text-align: center; margin-bottom: 10px; }
    .cert-ph-line  { height: 5px; background: var(--rule); border-radius: 2px; margin-bottom: 5px; }
    .cert-ph-foot  { margin-top: auto; padding-top: 10px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; }

    /* ── Mgmt cert card ── */
    .mgmt-card {
      background: #fff;
      border: 1px solid var(--rule);
      border-top: 3px solid var(--blue);
      height: 100%;
    }

    /* ── Standards table row ── */
    .std-row {
      border-bottom: 1px solid var(--rule);
      cursor: pointer;
      transition: background 0.18s;
    }
    .std-row:hover  { background: rgba(68,87,147,0.03); }
    .std-row.active { background: rgba(68,87,147,0.05); }
    .std-cell { padding: 18px 12px; vertical-align: top; }

    /* ── Lightbox ── */
    .lb-backdrop {
      position: fixed; inset: 0; z-index: 1050;
      background: rgba(6,7,12,0.96);
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
    }
    .lb-close {
      position: fixed; top: 20px; right: 20px; z-index: 1060;
      width: 42px; height: 42px; border-radius: 50%;
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
      color: #fff; font-size: 20px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .lb-close:hover { background: rgba(255,255,255,0.22); }
    .lb-counter {
      position: fixed; top: 26px; left: 50%; transform: translateX(-50%);
      font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(255,255,255,0.4); z-index: 1060;
    }
    .lb-wrap {
      position: relative; max-width: 820px; width: 100%;
      display: flex; align-items: center; justify-content: center;
    }
    .lb-nav {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
      color: #fff; font-size: 24px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s; z-index: 1060;
    }
    .lb-nav:hover { background: rgba(255,255,255,0.22); }
    .lb-nav-l { left: -60px; }
    .lb-nav-r { right: -60px; }
    .lb-img   { max-width: 100%; max-height: 82vh; object-fit: contain; display: block; box-shadow: 0 32px 80px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.06); }
    .lb-ph    { width: 480px; max-width: 100%; aspect-ratio: 210/297; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 40px; }
    .lb-ph-ring { width: 60px; height: 60px; border-radius: 50%; border: 2px solid rgba(68,87,147,0.55); display: flex; align-items: center; justify-content: center; font-size: 24px; color: rgba(68,87,147,0.85); }
    .lb-info  { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); text-align: center; pointer-events: none; z-index: 1060; }
    .lb-info-code  { font-size: 15px; font-weight: 900; color: #fff; }
    .lb-info-scope { font-size: 12px; color: rgba(255,255,255,0.42); margin-top: 4px; }
    .lb-info-hint  { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 8px; letter-spacing: 0.05em; }

    /* ── Stats divider row ── */
    .stat-block {
      padding: 32px 28px;
      border-right: 1px solid var(--rule);
    }
    .stat-block:last-child { border-right: none; }
    @media (max-width: 768px) {
      .stat-block { border-right: none; border-bottom: 1px solid var(--rule); padding: 24px 0; }
      .stat-block:last-child { border-bottom: none; }
    }

    /* ── Note bar ── */
    .note-bar {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 14px 20px;
      background: var(--warm); border: 1px solid var(--rule);
      border-radius: 4px;
    }

    /* ── Quality numbers split ── */
    .qual-left  { padding-right: 56px; border-right: 1px solid var(--rule); }
    .qual-right { padding-left: 56px; }
    @media (max-width: 992px) {
      .qual-left  { padding-right: 0; border-right: none; border-bottom: 1px solid var(--rule); padding-bottom: 40px; }
      .qual-right { padding-left: 0; padding-top: 40px; }
    }

    /* ── Mobile lightbox nav ── */
    @media (max-width: 576px) {
      .lb-nav-l { left: 4px; }
      .lb-nav-r { right: 4px; }
      .lb-nav   { width: 36px; height: 36px; font-size: 18px; }
    }
  `}</style>
);

/* ─── Scroll reveal wrapper ──────────────────────────────────── */
const Fade = ({ children, delay = 0, y = 16 }) => {
  const ref = useRef(null);
  const io  = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={io ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

/* ─── Section header row ─────────────────────────────────────── */
const SecHeader = ({ idx, label }) => (
  <Fade>
    <div className="sec-header-row mb-4">
      <span className="sec-idx">{idx}</span>
      <div className="sec-header-rule" />
      <span className="sec-overline">{label}</span>
    </div>
  </Fade>
);

/* ══════════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════════ */
const Lightbox = ({ certs, idx, onClose, onPrev, onNext }) => {
  const cert = certs[idx];

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div className="lb-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }} onClick={onClose}>

      <div className="lb-counter">{idx + 1} / {certs.length}</div>
      <button className="lb-close" onClick={onClose}>✕</button>

      <div className="lb-wrap" onClick={e => e.stopPropagation()}>
        <button className="lb-nav lb-nav-l" onClick={onPrev}>‹</button>

        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            {cert.img ? (
              <img src={cert.img} alt={cert.code} className="lb-img" draggable={false} />
            ) : (
              <div className="lb-ph">
                <div className="lb-ph-ring">✓</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "rgba(255,255,255,0.82)", marginBottom: 6 }}>{cert.code}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>{cert.scope}</div>
                </div>
                <div style={{ padding: "8px 18px", border: "1px dashed rgba(255,255,255,0.14)", borderRadius: 3, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontWeight: 600, letterSpacing: "0.07em" }}>
                    Replace img: null with your image path
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button className="lb-nav lb-nav-r" onClick={onNext}>›</button>
      </div>

      <div className="lb-info">
        <div className="lb-info-code">{cert.code}</div>
        <div className="lb-info-scope">{cert.scope}</div>
        <div className="lb-info-hint">← → arrow keys &nbsp;·&nbsp; ESC to close</div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="sec-pad mt-5">
    <div className="" style={{margin:"0rem 3rem 3rem 3rem"}}>

      {/* Breadcrumb */}
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        aria-label="breadcrumb" className="mb-5">
        <ol className="breadcrumb mb-0" style={{ fontSize: 12, fontWeight: 500 }}>
          <li className="breadcrumb-item">
            <a href="/" style={{ color: "var(--muted-clr)", textDecoration: "none" }}>Home</a>
          </li>
          <li className="breadcrumb-item active" style={{ color: "var(--blue)", fontWeight: 700 }}>
            Quality & Certifications
          </li>
        </ol>
      </motion.nav>

      {/* Hero content */}
      <div className="row align-items-center g-5 mb-5 pb-2">
        {/* Headline */}
        <div className="col-12 col-lg-7">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <span className="tag tag-blue mb-3 d-inline-block">Quality & Certifications</span>
            <h1 className="mb-0"
              style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: "var(--ink)" }}>
              Quality Isn't a Claim.<br />
              <span style={{ color: "var(--blue)" }}>It's a Record.</span>
            </h1>
          </motion.div>
        </div>

        {/* Body + CTA */}
        <div className="col-12 col-lg-5">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <p className="mb-4" style={{ fontSize: 15.5, color: "var(--body-clr)", lineHeight: 1.85, fontWeight: 400 }}>
              Every certification AESPL holds is the result of a process that runs through every project — not a plaque on a wall. Our quality systems are the reason our rework rate is below 0.20% and our complaint rate below 0.10%.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <a href="#gallery" className="btn btn-brand">View Certificates</a>
              <a href="/contact" className="btn btn-brand-outline">Request Documentation</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <hr className="rule mb-0" />
      <div className="row g-0">
        {[
          { n: "<0.20%", label: "In-house rework rate" },
          { n: "<0.10%", label: "Customer complaint rate" },
          { n: "29+",    label: "Years under quality discipline" },
          { n: "6",      label: "Active certifications & standards" },
        ].map((s, i) => (
          <div key={i} className="col-6 col-md-3">
            <Fade delay={i * 0.07}>
              <div className="stat-block">
                <div style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, color: "var(--blue)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {s.n}
                </div>
                <div className="mt-2" style={{ fontSize: 12.5, color: "var(--muted-clr)", fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            </Fade>
          </div>
        ))}
      </div>
      <hr className="rule mt-0" />
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════════
   CERTIFICATE GALLERY  (with Lightbox)
══════════════════════════════════════════════════════════════ */
const CertGallery = () => {
  const [lbIdx, setLbIdx] = useState(null);
  const close = useCallback(() => setLbIdx(null), []);
  const prev  = useCallback(() => setLbIdx(i => (i - 1 + CERTS.length) % CERTS.length), []);
  const next  = useCallback(() => setLbIdx(i => (i + 1) % CERTS.length), []);

  const tagClass = s => s === "Active" ? "tag-green" : s === "Recognised" ? "tag-blue" : "tag-muted";

  return (
    <>
      <AnimatePresence>
        {lbIdx !== null && (
          <Lightbox certs={CERTS} idx={lbIdx} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>

      <section id="gallery" className="mb-5" style={{ background: "#fff" }}>
        <div className="container-xl">
          <SecHeader idx="01" label="Certificate Documents" />

          {/* Sub-header */}
          <Fade>
            <div className="row align-items-end g-4 mb-5">
              <div className="col-12 col-lg-6">
                <h2 className="mb-0"
                  style={{ fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.18 }}>
                  Our Certifications<br />
                  {/* <span style={{ color: "var(--blue)" }}>The Original Documents.</span> */}
                </h2>
              </div>
              <div className="col-12 col-lg-5 offset-lg-1">
                <p className="mb-0"
                  style={{ fontSize: 14.5, color: "var(--body-clr)", lineHeight: 1.85, fontWeight: 400 }}>
                  Click any certificate to open the full document. Use arrow keys or on-screen buttons to navigate between certificates.
                </p>
              </div>
            </div>
          </Fade>

          {/* Thumbnail grid */}
          <div className="row g-4">
            {CERTS.map((cert, i) => {
              const ref = useRef(null);
              const io  = useInView(ref, { once: true, margin: "-20px" });
              return (
                <div key={cert.id} ref={ref} className="col-6 col-sm-4 col-md-4 col-lg-2">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={io ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.07 }}>

                    {/* Thumbnail image / placeholder */}
                    <div className="cert-thumb"
                      onClick={() => setLbIdx(i)}
                      role="button" tabIndex={0}
                      aria-label={`View ${cert.code} certificate`}
                      onKeyDown={e => e.key === "Enter" && setLbIdx(i)}>

                      {cert.img ? (
                        <img src={cert.img} alt={cert.code}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <div className="cert-ph">
                          <div className="cert-ph-topbar" />
                          <div className="cert-ph-seal">✓</div>
                          <div className="cert-ph-code">{cert.code}</div>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                            {[78, 60, 70, 52].map((w, j) => (
                              <div key={j} className="cert-ph-line" style={{ width: `${w}%`, opacity: 0.45 }} />
                            ))}
                          </div>
                          <div className="cert-ph-foot">
                            <div className="cert-ph-line" style={{ width: "32%", opacity: 0.35 }} />
                            <div className="cert-ph-line" style={{ width: "20%", background: "var(--blue-bdr)" }} />
                          </div>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="th-overlay">
                        <div className="th-zoom">
                          <div className="th-zoom-ring">⤢</div>
                          <span className="th-zoom-label">View</span>
                        </div>
                      </div>
                    </div>

                    {/* Label below thumbnail */}
                    <div className="mt-3">
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                        <span style={{ fontWeight: 800, fontSize: 13.5, color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                          {cert.code}
                        </span>
                        <span className={`tag ${tagClass(cert.status)}`} style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
                          {cert.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--body-clr)", fontWeight: 500, lineHeight: 1.5 }}>
                        {cert.scope}
                      </div>
                      {cert.since !== "—" && (
                        <div className="mt-1" style={{ fontSize: 11.5, color: "var(--muted-clr)" }}>
                          Since {cert.since}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Note bar */}
          {/* <Fade delay={0.1}>
            <div className="note-bar mt-4">
              <span style={{ fontSize: 18, flexShrink: 0 }}>📎</span>
              <p className="mb-0" style={{ fontSize: 13, color: "var(--muted-clr)", fontWeight: 500 }}>
                Need a copy for vendor qualification or regulatory submission?{" "}
                <a href="/contact" style={{ color: "var(--blue)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Contact us
                </a>{" "}
                and we'll send the relevant documents directly.
              </p>
            </div>
          </Fade> */}
        </div>
      </section>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════
   MANAGEMENT SYSTEM CERTIFICATIONS
══════════════════════════════════════════════════════════════ */
const ManagementCerts = () => (
  <section className="sec-pad" style={{ background: "var(--warm)" }}>
    <div className="container-xl">
      <SecHeader idx="02" label="Management System Certifications" />

      <Fade>
        <div className="row align-items-end g-4 mb-5">
          <div className="col-12 col-lg-6">
            <h2 className="mb-0"
              style={{ fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.18 }}>
              The Standards That Govern<br />
              <span style={{ color: "var(--blue)" }}>How We Engineer.</span>
            </h2>
          </div>
          <div className="col-12 col-lg-5 offset-lg-1">
            <p className="mb-0" style={{ fontSize: 14.5, color: "var(--body-clr)", lineHeight: 1.85, fontWeight: 400 }}>
              Both certifications are maintained under a unified, integrated quality management system audited annually by an accredited third-party body.
            </p>
          </div>
        </div>
      </Fade>

      <div className="row g-4">
        {mgmtCerts.map((c, i) => {
          const ref = useRef(null);
          const io  = useInView(ref, { once: true });
          return (
            <div key={i} ref={ref} className="col-12 col-md-6">
              <motion.div className="mgmt-card h-100"
                initial={{ opacity: 0, y: 22 }} animate={io ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}>

                {/* Card header */}
                <div className="p-4 pb-3" style={{ borderBottom: "1px solid var(--rule)" }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="tag tag-green">Active</span>
                    <span style={{ fontSize: 11, color: "var(--muted-clr)", fontWeight: 500 }}>Since {c.since}</span>
                  </div>
                  <div className="mb-1"
                    style={{ fontWeight: 900, fontSize: "1.55rem", letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ink)" }}>
                    {c.code}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)" }}>{c.scope}</div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="mb-4" style={{ fontSize: 14, color: "var(--body-clr)", lineHeight: 1.8, fontWeight: 400 }}>{c.body}</p>
                  <div className="mb-2"
                    style={{ fontSize: 10.5, fontWeight: 700, color: "var(--muted-clr)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Applies to
                  </div>
                  {c.applies.map((a, j) => (
                    <div key={j} className="d-flex align-items-center gap-2 py-2"
                      style={{ borderBottom: j < c.applies.length - 1 ? "1px solid var(--rule)" : "none" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
                      <span style={{ fontSize: 13.5, color: "var(--body-clr)", fontWeight: 500 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════════
   TESTING STANDARDS  (interactive table)
══════════════════════════════════════════════════════════════ */
const Standards = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="sec-pad" style={{ background: "#fff" }}>
      <div className="container-xl">
        <SecHeader idx="03" label="Testing Standards" />

        <Fade>
          <div className="row align-items-end g-4 mb-5">
            <div className="col-12 col-lg-6">
              <h2 className="mb-0"
                style={{ fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.18 }}>
                Standards We Test To —<br />
                <span style={{ color: "var(--blue)" }}>So You Don't Have To Worry.</span>
              </h2>
            </div>
            <div className="col-12 col-lg-5 offset-lg-1">
              <p className="mb-0" style={{ fontSize: 14.5, color: "var(--body-clr)", lineHeight: 1.85, fontWeight: 400 }}>
                We design with compliance in mind from the first schematic. By the time your product reaches regulatory testing, there are no surprises.
              </p>
            </div>
          </div>
        </Fade>

        {/* Table */}
        <hr className="rule-bold mb-0" />
        <div className="row g-0 py-2" style={{ borderBottom: "1px solid var(--rule)" }}>
          <div className="col-4 col-md-2 ps-0">
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-clr)" }}>Standard</span>
          </div>
          <div className="col-6 col-md-7">
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-clr)" }}>What it covers</span>
          </div>
          <div className="col-2 d-none d-md-block">
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--muted-clr)" }}>Applied to</span>
          </div>
          <div className="col-2 col-md-1" />
        </div>

        {standardsList.map((s, i) => {
          const ref    = useRef(null);
          const io     = useInView(ref, { once: true });
          const isOpen = open === i;
          return (
            <motion.div key={i} ref={ref}
              initial={{ opacity: 0 }} animate={io ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.06 }}>
              <div className={`std-row row g-0 align-items-start ${isOpen ? "active" : ""}`}
                onClick={() => setOpen(isOpen ? null : i)}>
                <div className="col-4 col-md-2 std-cell ps-0">
                  <div style={{ fontWeight: 800, fontSize: 13.5, color: "var(--blue)", marginBottom: 6 }}>{s.code}</div>
                  <span className="tag tag-muted" style={{ fontSize: 9.5 }}>{s.cat}</span>
                </div>
                <div className="col-5 col-md-7 std-cell">
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)", marginBottom: isOpen ? 10 : 0 }}>
                    {s.title}
                  </div>
                  {isOpen && (
                    <motion.p className="mb-0"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
                      style={{ fontSize: 13.5, color: "var(--body-clr)", lineHeight: 1.75, fontWeight: 400 }}>
                      {s.what}
                    </motion.p>
                  )}
                </div>
                <div className="col-2 d-none d-md-block std-cell">
                  <span style={{ fontSize: 13, color: "var(--body-clr)", fontWeight: 500 }}>{s.products}</span>
                </div>
                <div className="col-3 col-md-1 std-cell text-end pe-0">
                  <span style={{
                    fontSize: 22, color: "var(--blue)", fontWeight: 300, lineHeight: 1,
                    display: "inline-block",
                    transition: "transform 0.25s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>+</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        <p className="mt-3 mb-0" style={{ fontSize: 12.5, color: "var(--muted-clr)", fontStyle: "italic" }}>
          ↑ Click any row to expand the description.
        </p>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   QUALITY NUMBERS
══════════════════════════════════════════════════════════════ */
const QualityNumbers = () => (
  <section className="sec-pad" style={{ background: "var(--warm)" }}>
    <div className="container-xl">
      <SecHeader idx="04" label="Quality Performance" />

      <hr className="rule mb-0" />
      <div className="row g-0">

        {/* Big numbers */}
        <div className="col-12 col-lg-5 qual-left">
          {[
            { n: "<0.20%", label: "In-house rework rate",    note: "Across all PCB assemblies and embedded product builds." },
            { n: "<0.10%", label: "Customer complaint rate", note: "Measured against total products shipped, maintained over 29 years." },
          ].map((m, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div className="py-5" style={{ borderBottom: i === 0 ? "1px solid var(--rule)" : "none" }}>
                <div style={{ fontSize: "clamp(2.8rem,5vw,4.6rem)", fontWeight: 900, color: "var(--blue)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {m.n}
                </div>
                <div className="mt-3 mb-2" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>{m.label}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted-clr)", lineHeight: 1.7, fontWeight: 400 }}>{m.note}</div>
              </div>
            </Fade>
          ))}
        </div>

        {/* Context */}
        <div className="col-12 col-lg-7 qual-right pt-lg-5">
          <Fade delay={0.12}>
            <h2 className="mb-4"
              style={{ fontSize: "clamp(1.4rem,2.4vw,2rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
              These Numbers Are the Result of a Culture — Not a Target.
            </h2>
            <p className="mb-3" style={{ fontSize: 14.5, color: "var(--body-clr)", lineHeight: 1.85, fontWeight: 400 }}>
              In most organisations, quality metrics are aspirational. At AESPL, they're descriptive — a record of what actually happened across 29 years of embedded product development.
            </p>
            <p className="mb-4" style={{ fontSize: 14.5, color: "var(--body-clr)", lineHeight: 1.85, fontWeight: 400 }}>
              The reason our rework rate stays below 0.20% is that the hardware engineer and the firmware developer work side by side. The reason our complaint rate stays below 0.10% is that the people who built it are the people who support it.
            </p>
            {[
              "IEC 60601-1-2 medical device compliance — first pass",
              "ESD, EFT, and surge testing — in-house capability",
              "Full design traceability from requirement to production",
              "Post-delivery support as standard — not an add-on",
            ].map((pt, i) => (
              <div key={i} className="d-flex align-items-start gap-3 py-3"
                style={{ borderBottom: "1px solid var(--rule)" }}>
                <span style={{ fontWeight: 900, color: "var(--blue)", fontSize: 13, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontSize: 14, color: "var(--body-clr)", fontWeight: 500, lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════════
   WHY IT MATTERS  (brand blue BG)
══════════════════════════════════════════════════════════════ */
const WhyItMatters = () => (
  <section className="sec-pad" style={{ background: "var(--blue)" }}>
    <div className="container-xl">
      <div className="row align-items-start g-5">
        <Fade>
          <div className="col-12 col-lg-2">
            <div style={{ paddingTop: 4 }}>
              <div style={{ width: 28, height: 2, background: "rgba(255,255,255,0.3)", marginBottom: 14 }} />
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.42)", textTransform: "uppercase", lineHeight: 2 }}>
                Why it<br />matters to<br />your OEM
              </div>
            </div>
          </div>
        </Fade>
        <div className="col-12 col-lg-10">
          <Fade delay={0.1}>
            <h2 className="mb-4"
              style={{ fontSize: "clamp(1.6rem,3.2vw,2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.18, letterSpacing: "-0.025em" }}>
              When your embedded partner is ISO 13485 certified, your device is already built inside a quality system that regulators recognise.
            </h2>
            <p className="mb-4"
              style={{ fontSize: 15.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.85, fontWeight: 400 }}>
              Medical device OEMs using AESPL don't start from zero on documentation, design controls, or traceability. The framework is already there, third-party audited, reducing your regulatory approval risk significantly.
            </p>
            <a href="/contact" className="btn btn-white-solid">
              Request Quality Documentation →
            </a>
          </Fade>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════════
   CTA STRIP
══════════════════════════════════════════════════════════════ */
const CTAStrip = () => (
  <section className="sec-pad" style={{ background: "var(--warm)", borderTop: "1px solid var(--rule)" }}>
    <div className="container-xl">
      <Fade>
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <div className="sec-overline mb-2">Working with a quality partner</div>
            <h2 className="mb-0"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Need a certified embedded partner for your next OEM product?
            </h2>
          </div>
          <div className="col-12 col-lg-5 d-flex flex-wrap gap-2 justify-content-lg-end">
            <a href="/contact" className="btn btn-brand">Start a Conversation</a>
            <a href="/about"   className="btn btn-brand-outline">About AESPL</a>
          </div>
        </div>
      </Fade>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function CertificationsPage() {
  return (
    <>
      <BootstrapLoader />
      <Styles />
      <div className="page-top-rule" />
      <main>
        <Hero />
        <CertGallery />
        <ManagementCerts />
        {/* <Standards /> */}
        {/* <QualityNumbers /> */}
        <WhyItMatters />
        <CTAStrip />
      </main>
    </>
  );
}