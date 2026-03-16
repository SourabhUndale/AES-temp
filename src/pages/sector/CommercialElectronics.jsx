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
    title: "Lean, Application-Specific Design",
    desc: "We strip away everything a generic module carries that your product doesn't need — and engineer the hardware and firmware around what your specific application requires. The result is a cleaner, more reliable product with a unit cost that drops meaningfully at medium and high volumes.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
  },
  {
    icon: "⏱️",
    title: "Your Product's Electronics - Your IP",
    desc: "A custom embedded design developed with AESPL belongs to you. Your competitors can't replicate it by placing a component order. Your product has an electronic identity that is genuinely proprietary - and that is a competitive advantage that compounds over time.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80"
  },
  {
    icon: "✅",
    title: "IoT& Connectivity Integration",
    desc: "For commercial products that require connected capability - remote monitoring, cloud data logging, app control, or over-the-air firmware updates - we design the embedded connectivity architecture that makes it reliable and secure, not an add-on that creates reliability problems.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
  },
  {
    icon: "🏅",
    title: "Power Optimization & Energy Efficiency",
    desc: "Commercial products are increasingly judged on energy consumption. We design embedded systems with power optimization as a primary parameter - using sleep modes, dynamic voltage scaling, and efficient power architecture to extend battery life or reduce operating costs for mains-powered products.",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
  }
];

const problems = [
  { icon: "⚡", title: "Off-the-shelf modules fail in clinical settings", desc: "Generic embedded modules carry features and processing capacity your product will never use - but you pay for them in every unit you ship. At volume, that embedded overhead becomes a significant and avoidable cost" },
  { icon: "🎯", title: "Standard PLCs lack medical-grade precision", desc: "Off-the-shelf modules are available to every competitor. When your product's core electronics can be replicated by anyone who places the same module order, your competitive differentiation is limited to packaging and software - not the product itself." },
  { icon: "📋", title: "Regulatory compliance is a design constraint", desc: "Module manufacturers discontinue products on their own timelines - leaving OEMs scrambling for redesigns at the worst possible moment in their product lifecycle." },
  { icon: "🔍", title: "Rare intersection of skills", desc: "Integration is never as smooth as the datasheet suggests. Every product has unique requirements that generic modules don't address cleanly - and the engineering time spent on workarounds adds up fast." }
];

const trackItems = [
  "Custom embedded controllers for building automation and HVAC systems",
  "Energy monitoring, metering, and power management modules",
  "Display and user interface control systems",
  "Wireless communication modules - Wi-Fi, Bluetooth",
  "Battery management systems for portable commercial products",
  "Industrial instrumentation and measurement electronics",
  "Custom thermostat and environmental control systems",
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

export default function CommercialElectronics() {
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
          Your Product Is Ready for the Market. Is the Electronics Inside{" "}
          <em style={{ fontStyle: "normal", color: "#b8c8f5" }}>It Ready for Your Product?</em>
        </motion.h1>

        <motion.p
          style={{ fontSize: "clamp(1rem,1.6vw,1.15rem)", color: "rgba(255,255,255,0.8)", maxWidth: 680, lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          AESPL designs custom embedded electronics that replace generic modules to improve performance and reduce production cost.
Built specifically for the application, our solutions help products stand out in competitive markets.
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
          <h2>Commercial Electronics OEMs Are Leaving Performance and Margin on the Table.</h2>
          <p className="section-desc">The pressure to move fast in commercial electronics is real - and it pushes many OEMs toward generic embedded modules as a shortcut.But that shortcut comes with long-term costs that erode product quality and margin</p>
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
          <h2>Custom Embedded Modules That Are Designed for Your Product - and Only Your Product.</h2>
          <p className="section-desc">We design embedded electronics for commercial applications from first principles — using only the components your product needs, optimized for your product's power budget, form factor, and performance requirements. The result is an electronic core that is lean, proprietary, and purpose-built.</p>
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
            "Honeywell chose AESPL to develop AHU embedded controller electronics for their building automation systems. When a global brand trusts your custom electronics, it says something about the quality of the work."
          </blockquote>
          <p className="quote-attr">— AESPL Engineering Leadership</p>
        </div>
      </FadeSection>

      {/* ── CTA ── */}
      <section className="cta-section-tf">
        <FadeSection>
          {/* <p className="section-label">Get Started</p> */}
          <span className="section-label-e text-white" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>Get Started</span>
          <h2>Want Electronics That Give Your Commercial Product a Real Edge?</h2>
          <p>If your product is ready to move from a generic embedded module to purpose-built electronics - or if you're designing a new product and want to get the electronics right from the start - AESPL is the partner to call. Custom, in-house, end-to-end.</p>
          <div>
            <motion.a href="#" className="btn-white" whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.97 }}>
              Share Your Application →
            </motion.a>
            <motion.a href="#" className="btn-outline" whileHover={{ borderColor: "white", background: "rgba(255,255,255,0.07)"  }} whileTap={{ scale: 0.97 }}>
              Learn About Our Process
            </motion.a>
          </div>
        </FadeSection>
      </section>
    </div>
  );
}