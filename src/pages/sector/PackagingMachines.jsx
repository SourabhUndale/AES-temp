import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const css = `
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --brand: #445793; --brand-light: #6478b8; --brand-dark: #2e3d6b;
    --accent: #e8ecf7; --white: #fff; --text: #1a1e2e;
    --text-muted: #5c637a; --border: #d6daea; --surface: #f7f8fc;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Satoshi', sans-serif; background: var(--white); color: var(--text); }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
  @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }

  .dot { width:7px;height:7px;border-radius:50%;background:#7ee8a2;animation:pulse 2s infinite;display:inline-block; }

  .hero {
    background: linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 60%, var(--brand-light) 100%);
    color: white; padding: 100px 5% 80px; position: relative; overflow: hidden;
  }
  .hero::before {
    content:'';position:absolute;top:-80px;right:-80px;width:420px;height:420px;
    border-radius:50%;background:rgba(255,255,255,0.05);pointer-events:none;
  }
  .hero::after {
    content:'';position:absolute;bottom:-120px;left:10%;width:600px;height:300px;
    border-radius:50%;background:rgba(255,255,255,0.04);pointer-events:none;
  }

  .hero-badge {
    display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:6px 16px;
    font-size:13px;font-weight:500;letter-spacing:0.04em;margin-bottom:28px;
  }

  .stat { border-left:2px solid rgba(255,255,255,0.25);padding-left:18px; }
  .stat-num { font-size:2rem;font-weight:700; }
  .stat-label { font-size:13px;color:rgba(255,255,255,0.65);margin-top:2px; }

  section { padding: 90px 5%; }
  .section-label-e { font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--brand);margin-bottom:14px; }
  h2 { font-size:clamp(1.6rem,3vw,2.5rem);font-weight:700;line-height:1.2;color:var(--text);max-width:700px;margin-bottom:18px; }
  .section-desc { font-size:1.05rem;color:var(--text-muted);max-width:640px;line-height:1.75;margin-bottom:50px; }

  .problems { background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border); }
  .problem-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px; }
  .problem-card {
    background:var(--white);border:1px solid var(--border);border-radius:14px;padding:30px 26px;
    transition:box-shadow 0.25s,transform 0.25s;
  }
  .problem-icon { width:44px;height:44px;border-radius:10px;background:var(--accent);display:flex;align-items:center;justify-content:center;margin-bottom:18px;font-size:20px; }
  .problem-card h3 { font-size:1.05rem;font-weight:600;margin-bottom:10px;color:var(--text); }
  .problem-card p { font-size:0.93rem;color:var(--text-muted);line-height:1.7; }

  /* SOLUTION CARDS - hover image reveal */
  .solutions { background:var(--white); }
  .solution-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px; }
  .solution-card {
    border:1px solid var(--border);border-radius:16px;padding:34px 28px;
    position:relative;overflow:hidden;cursor:pointer;
    background:var(--white);
  }
  .solution-card-top-bar {
    position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--brand),var(--brand-light));
    border-radius:16px 16px 0 0;
  }
  .solution-card h3 { font-size:1.05rem;font-weight:700;margin-bottom:12px;color:var(--text);position:relative;z-index:2; }
  .solution-card p { font-size:0.93rem;color:var(--text-muted);line-height:1.7;position:relative;z-index:2; }
  .solution-icon {
    width:42px;height:42px;border-radius:10px;
    background:linear-gradient(135deg,var(--brand),var(--brand-light));
    display:flex;align-items:center;justify-content:center;
    margin-bottom:20px;font-size:18px;position:relative;z-index:2;
  }
  .solution-img-overlay {
    position:absolute;inset:0;border-radius:16px;overflow:hidden;z-index:1;
  }
  .solution-img-overlay img {
    width:100%;height:100%;object-fit:cover;
  }
  .solution-img-overlay-tint {
    position:absolute;inset:0;
    background:linear-gradient(180deg, rgba(68,87,147,0.88) 0%, rgba(46,61,107,0.96) 100%);
  }
  .solution-card-content { position:relative;z-index:2; }
  .solution-card-content-hovered h3 { color:white; }
  .solution-card-content-hovered p { color:rgba(255,255,255,0.8); }
  .solution-card-content-hovered .solution-icon {
    background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);
    border:1px solid rgba(255,255,255,0.2);
  }

  .track-record { background:var(--brand-dark);color:white; }
  .track-record h2 { color:white; }
  .track-record .section-desc { color:rgba(255,255,255,0.65); }
  .track-record .section-label { color:#b8c8f5; }
  .track-list { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px; }
  .track-item {
    background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;padding:20px 22px;display:flex;align-items:flex-start;gap:12px;
  }
  .track-arrow { color:#7eb3f5;font-size:16px;margin-top:1px;flex-shrink:0;font-weight:700; }
  .track-item span { font-size:0.93rem;line-height:1.55;color:rgba(255,255,255,0.85); }

  .quote-band {
    background:var(--accent);border-top:1px solid var(--border);border-bottom:1px solid var(--border);
    padding:64px 5%;text-align:center;
  }
  .quote-band blockquote {
    font-size:clamp(1.05rem,2vw,1.45rem);font-weight:500;color:var(--brand-dark);
    max-width:820px;margin:0 auto 16px;line-height:1.7;font-style:italic;
  }
  .quote-attr { font-size:0.88rem;color:var(--brand);font-weight:700;letter-spacing:0.05em;text-transform:uppercase; }

  .cta-section-tf {
    background:linear-gradient(135deg,var(--brand) 0%,var(--brand-dark) 100%);
    color:white;padding:90px 5%;text-align:center;
  }
  .cta-section-tf h2 { color:white;margin:0 auto 18px;text-align:center;max-width:640px; }
  .cta-section-tf p { color:rgba(255,255,255,0.75);font-size:1.05rem;max-width:580px;margin:0 auto 40px;line-height:1.7; }
  .cta-section-tf .section-label { color:#b8c8f5; }

  .btn-white {
    display:inline-block;background:white;color:var(--brand);font-family:'Satoshi',sans-serif;
    font-weight:700;font-size:0.97rem;padding:15px 34px;border-radius:100px;border:none;
    cursor:pointer;text-decoration:none;margin:6px;
  }
  .btn-outline {
    display:inline-block;background:transparent;color:white;font-family:'Satoshi',sans-serif;
    font-weight:600;font-size:0.97rem;padding:14px 32px;border-radius:100px;
    border:2px solid rgba(255,255,255,0.4);cursor:pointer;text-decoration:none;margin:6px;
  }

  .iso-badge {
    display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:12px 20px;
    margin-top:40px;font-size:0.88rem;color:rgba(255,255,255,0.72);
  }
  .iso-badge strong { color:white;font-weight:700; }
`;

// Unsplash images relevant to each solution
const solutions = [
  {
    icon: "🔧",
    title: "High-Speed, Low-Latency Control Architecture",
    desc: "Our embedded systems are designed for real-time, deterministic control - with interrupt-driven firmware that responds to sensor signals and actuator commands within microseconds. Whether your machine runs at 100 packs per minute or 1,000, the control system keeps pace without introducing timing errors.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
  },
  {
    icon: "⏱️",
    title: "Precision Motion & Sequence Control",
    desc: "We design servo and stepper motor control, encoder feedback integration, and multi-axis synchronization logic into your controller - giving your machine the precise, repeatable motion it needs to maintain quality at speed.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80"
  },
  {
    icon: "✅",
    title: "Flexible Recipe & Format Management",
    desc: "Product changeovers and format switches are a daily reality in packaging operations. We build recipe management systems into our controllers - allowing operators to switch formats quickly, store multiple product configurations, and maintain consistent output across product runs.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
  },
  {
    icon: "🏅",
    title: "Smart Fault Detection & Diagnostics",
    desc: "Our controllers include built-in fault logging, alarm management, and diagnostic displays - so when something goes wrong, your operators know exactly what happened, when it happened, and what to do about it. Downtime is minimized. Root cause is clear.",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
  }
];

const problems = [
  { icon: "⚡", title: "Off-the-shelf modules fail in clinical settings", desc: "Generic PLCs introduce scan cycle delays that cause mis-timing at high machine speeds - leading to seal defects, fill inaccuracies, or product rejections that don't happen during testing but surface in full production." },
  { icon: "🎯", title: "Standard PLCs lack medical-grade precision", desc: "Standard motion control platforms often don't integrate cleanly with the specific sensors, encoders, and actuators your machine uses - forcing engineering workarounds that add cost and fragility." },
  { icon: "📋", title: "Regulatory compliance is a design constraint", desc: "When a packaging line expands or changes product format, the controller needs to adapt quickly. Rigid PLC-based systems make format changeovers and recipe management unnecessarily complex. " },
  { icon: "🔍", title: "Rare intersection of skills", desc: "Downtime on a packaging line is expensive. Embedded systems that weren't designed for your specific machine make fault diagnosis slower and maintenance harder than it needs to be." }
];

const trackItems = [
  "Servo and stepper motor control systems with encoder feedback",
  "Product detection, position, and speed sensor integration",
  "Multi-product recipe management and format changeover systems",
  "Filling, sealing, and cutting cycle precision control",
  "Fault logging, alarm management, and diagnostic display systems",
  "Operator HMI panels with touchscreen and keypad interface",
  "Production counter, OEE tracking, and data logging modules",
];

// Reusable scroll-triggered section wrapper
function FadeSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SolutionCard({ s, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="solution-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 18px 50px rgba(68,87,147,0.18)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="solution-card-top-bar" />

      {/* Image overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="solution-img-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.img
              src={s.img}
              alt={s.title}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="solution-img-overlay-tint" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className={`solution-card-content ${hovered ? "solution-card-content-hovered" : ""}`}>
        <motion.div
          className="solution-icon"
          animate={hovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {s.icon}
        </motion.div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.88rem",
                fontWeight: 600,
                letterSpacing: "0.04em"
              }}
            >
              Learn more <span style={{ fontSize: 14 }}>→</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PackagingMachines() {
  return (
    <div style={{ fontFamily: "'Satoshi', sans-serif", background: "#fff" }}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <div className="hero ">
        <motion.div
          className="hero-badge mt-5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="dot" />
          ISO 13485:2016 Certified · 29 Years in Medical Electronics
        </motion.div>

        <motion.h1
          style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", fontWeight: 700, lineHeight: 1.15, maxWidth: 780, marginBottom: 24, color: "white" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          At High Speed, There's No Room for an Embedded System {" "}
          <em style={{ fontStyle: "normal", color: "#b8c8f5" }}>That's Almost Fast Enough.</em>
        </motion.h1>

        <motion.p
          style={{ fontSize: "clamp(1rem,1.6vw,1.15rem)", color: "rgba(255,255,255,0.8)", maxWidth: 680, lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          AESPL builds custom embedded controllers for packaging machines, designed for speed, precision, and reliable throughput.
Each controller is engineered around your machine’s exact mechanical and operational requirements.
        </motion.p>

        <motion.div
          className="iso-badge"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <span>🏥</span>
          <strong>Ventilators · Baby Warmers · Patient Monitors · Pasteurization Systems</strong>
        </motion.div>

        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: 40, marginTop: 52 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
        >
          {[
            { num: "29+", label: "Years of Medical Embedded Experience" },
            { num: "IEC 60601", label: "Compliance-First Design Process" },
            { num: "2", label: "Continents — UCLA & KEM Hospital" }
          ].map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROBLEMS ── */}
      <section className="problems">
        <FadeSection>
          {/* <p className="section-label">The Challenge</p> */}
          <span className="section-label-e" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>The Challenge</span>
          <h2>Packaging OEMs Are Running High-Speed Machines on Embedded Systems Built for a Different World.</h2>
          <p className="section-desc">Packaging machinery is a uniquely demanding application for embedded electronics.</p>
        </FadeSection>
        <div className="problem-grid">
          {problems.map((p, i) => (
            <motion.div
              className="problem-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 10px 36px rgba(68,87,147,0.12)" }}
            >
              <div className="problem-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="solutions">
        <FadeSection>
          {/* <p className="section-label">How We Solve It</p> */}
          <span className="section-label-e" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>How We Solve It</span>
          <h2>Custom Embedded Controllers That Keep Up With Your Machine - at Every Speed, Every Format, Every Shift.</h2>
          <p className="section-desc">We design packaging machine control systems around your machine's exact mechanical profile - the cycle times, the sensor positions, the actuator response requirements, and the operator workflows that define how your machine runs in the real world.</p>
        </FadeSection>
        <div className="solution-grid">
          {solutions.map((s, i) => (
            <SolutionCard key={i} s={s} i={i} />
          ))}
        </div>
      </section>

      {/* ── TRACK RECORD ── */}
      <section className="track-record">
        <FadeSection>
          {/* <p className="section-label">Proven Track Record</p> */}
          <span className="section-label-e text-white" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>Proven Track Record</span>
          <h2 style={{ color: "white" }}>What We Have Built — And Can Build for You.</h2>
          <p className="section-desc" style={{ color: "rgba(255,255,255,0.65)" }}>Three decades of critical medical applications, built under the accountability that ICU environments demand.</p>
        </FadeSection>
        <div className="track-list">
          {trackItems.map((item, i) => (
            <motion.div
              className="track-item"
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ background: "rgba(255,255,255,0.1)" }}
            >
              <span className="track-arrow">→</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <FadeSection>
        <div className="quote-band">
          <blockquote>
            "Ready to Give Your Packaging Machine the Control System It Deserves?"
          </blockquote>
          <p className="quote-attr">— AESPL Engineering Leadership</p>
        </div>
      </FadeSection>

      {/* ── CTA ── */}
      {/* <section className="cta-section-tf">
        <FadeSection>
          <span className="section-label-e text-white" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>Get Started</span>
          <h2>Building a Medical Device? Let's Talk Embedded Electronics.</h2>
          <p>Whether you're designing a new device from scratch or re-engineering the electronics inside an existing product, AESPL has the expertise, compliance experience, and engineering discipline your OEM needs.</p>
          <div>
            <motion.a href="#" className="btn-white" whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.97 }}>
              Share Your Application →
            </motion.a>
            <motion.a href="#" className="btn-outline" whileHover={{ borderColor: "white", background: "rgba(255,255,255,0.07)"  }} whileTap={{ scale: 0.97 }}>
              Learn About Our Process
            </motion.a>
          </div>
        </FadeSection>
      </section> */}
    </div>
  );
}