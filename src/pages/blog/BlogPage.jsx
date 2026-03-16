import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
  AESPL — Blog Page
  ─────────────────────────────────────────────
  Design: Matches reference image layout —
  • Clean white page with centered hero header
  • Search bar + filter tabs row
  • Masonry-style responsive card grid
  • Large image thumbnails on each card
  • Tag chip + date + title + excerpt + "Read More →"
  • "View More" pagination button at bottom
  
  Color:  #445793 replaces orange accent
  Font:   Satoshi (Fontshare CDN)
  Layout: Bootstrap 5
*/

const BSLoader = () => (
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
  />
);

/* ── Posts data ─────────────────────────────────────────────── */
const POSTS = [
  {
    id: 1,
    tag: "Medical Embedded",
    date: "Feb 12, 2024",
    title: "Why Off-the-Shelf Modules Fail in Clinical Environments — and What OEMs Should Do Instead",
    excerpt: "Most general-purpose embedded modules were never designed for the electromagnetic environment of a hospital. Here's what actually goes wrong, and how we approach the problem from scratch.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    read: "8 min read",
  },
  {
    id: 2,
    tag: "Firmware",
    date: "Jan 28, 2024",
    title: "Deterministic Real-Time Control in Safety-Critical Firmware — Our Approach",
    excerpt: "When a ventilator misses an interrupt, the consequence is not a software crash — it's a patient event. We explain how we architect firmware where that outcome is structurally impossible.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    read: "11 min read",
  },
  {
    id: 3,
    tag: "Quality",
    date: "Jan 15, 2024",
    title: "What ISO 13485 Actually Means for an Embedded Design Partner",
    excerpt: "Certification is a process, not a certificate. What changes when your embedded development partner operates under ISO 13485, from requirement traceability to design reviews.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    read: "6 min read",
  },
  {
    id: 4,
    tag: "Industrial",
    date: "Jan 3, 2024",
    title: "Designing Embedded Controllers for Compressors: The Reliability Constraints Nobody Talks About",
    excerpt: "Compressor controllers run for years in dusty, vibration-heavy environments. The design constraints are completely different from a lab prototype. We cover what they are.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    read: "9 min read",
  },
  {
    id: 5,
    tag: "Innovation",
    date: "Dec 18, 2023",
    title: "How We Built India's First Embedded-Controlled Human Milk Pasteurization Machine",
    excerpt: "The full story of the AESPL HMP machine — from the clinical problem it solves to the embedded architecture, and how it ended up in hospitals from Pune to Los Angeles.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
    read: "14 min read",
  },
  {
    id: 6,
    tag: "PCB Design",
    date: "Dec 5, 2023",
    title: "PCB Layout Decisions That Save You From EMC Failures at Compliance Testing",
    excerpt: "Most EMC failures at IEC 60601-1-2 testing can be traced back to PCB layout decisions made early in the design process. We cover the five we see most often.",
    img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    read: "7 min read",
  },
  {
    id: 7,
    tag: "Medical Embedded",
    date: "Nov 20, 2023",
    title: "HFOV Ventilation: The Engineering Challenge Behind Our Patented Apparatus",
    excerpt: "High-frequency oscillatory ventilation requires embedded control logic that operates at timescales standard ventilator architectures simply can't support.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    read: "12 min read",
  },
  {
    id: 8,
    tag: "OEM Insights",
    date: "Nov 8, 2023",
    title: "The Handoff Problem: Why Most OEMs Get Burned When Switching Embedded Partners",
    excerpt: "Changing your embedded development partner mid-product lifecycle is painful. Here's what typically goes wrong, and how to structure an engagement that avoids those problems.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    read: "6 min read",
  },
  {
    id: 9,
    tag: "Firmware",
    date: "Oct 24, 2023",
    title: "ESD, EFT, and Surge: A Practical Guide to Designing for IEC 61000-4 Compliance",
    excerpt: "The IEC 61000-4 series covers a range of immunity tests that trip up even experienced embedded engineers. We explain what each test simulates and how to design for it.",
    img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80",
    read: "10 min read",
  },
];

const ALL_TAGS = ["All Articles", "Medical Embedded", "Firmware", "Quality", "Industrial", "Innovation", "PCB Design", "OEM Insights"];

/* ── Styles ─────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,900&display=swap');

    :root {
      --blue:      #445793;
      --blue-hover:#3a4d80;
      --blue-light:rgba(68,87,147,0.08);
      --blue-bdr:  rgba(68,87,147,0.2);
      --ink:       #1a1d2e;
      --body-c:    #52556a;
      --muted:     #9295a8;
      --rule:      #e8eaf0;
      --bg:        #ffffff;
      --bg-soft:   #f8f9fc;
    }

    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: 'Satoshi', sans-serif !important;
      background: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
    }
    * { font-family: 'Satoshi', sans-serif !important; }
    a { text-decoration: none; color: inherit; }
    ::selection { background: var(--blue); color: #fff; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: var(--blue); }

    /* ── NAV ── */
    .blog-nav {
      background: #fff;
      border-bottom: 1px solid var(--rule);
      position: sticky; top: 0; z-index: 100;
    }
    .blog-nav .container-xl {
      display: flex; align-items: center;
      justify-content: space-between; height: 64px;
    }
    .nav-logo-box {
      width: 34px; height: 34px; background: var(--blue);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .nav-link-plain {
      font-size: 13.5px; font-weight: 500;
      color: var(--body-c); transition: color 0.18s;
    }
    .nav-link-plain:hover { color: var(--blue); }
    .nav-link-active { color: var(--blue) !important; font-weight: 700; }
    .nav-cta-btn {
      font-size: 13px; font-weight: 700;
      padding: 8px 20px; background: var(--blue); color: #fff;
      border-radius: 6px; transition: background 0.18s, transform 0.15s;
      display: inline-block;
    }
    .nav-cta-btn:hover { background: var(--blue-hover); transform: translateY(-1px); }

    /* ── BREADCRUMB ── */
    .bc-link { font-size: 12px; color: var(--muted); font-weight: 500; }
    .bc-link:hover { color: var(--blue); }
    .bc-sep { color: var(--rule); font-size: 12px; margin: 0 6px; }
    .bc-current { font-size: 12px; color: var(--blue); font-weight: 700; }

    /* ── PAGE HERO ── */
    .page-hero {
      background: #fff;
      text-align: center;
      padding: 64px 0 52px;
      border-bottom: 1px solid var(--rule);
    }
    .hero-eyebrow {
      font-size: 11px; font-weight: 800;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--blue); margin-bottom: 16px;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .hero-eyebrow::before, .hero-eyebrow::after {
      content: ''; display: block;
      width: 32px; height: 2px; background: var(--blue); opacity: 0.5;
    }
    .hero-title {
      font-size: clamp(2.2rem, 4.5vw, 3.5rem);
      font-weight: 900;
      letter-spacing: -0.025em;
      color: var(--ink);
      line-height: 1.1;
      margin-bottom: 18px;
    }
    .hero-desc {
      font-size: 15.5px; color: var(--body-c);
      line-height: 1.8; font-weight: 400;
      max-width: 520px; margin: 0 auto;
    }

    /* ── SEARCH + FILTER BAR ── */
    .filter-section {
      background: var(--bg-soft);
      border-bottom: 1px solid var(--rule);
      padding: 20px 0;
    }
    .search-wrap {
      position: relative; max-width: 320px;
    }
    .search-icon {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      font-size: 14px; color: var(--muted); pointer-events: none;
    }
    .search-input {
      width: 100%;
      padding: 10px 14px 10px 40px;
      border: 1.5px solid var(--rule);
      background: #fff;
      color: var(--ink);
      font-size: 13.5px; font-weight: 500;
      outline: none; border-radius: 6px;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: 'Satoshi', sans-serif !important;
    }
    .search-input::placeholder { color: var(--muted); }
    .search-input:focus {
      border-color: var(--blue);
      box-shadow: 0 0 0 3px rgba(68,87,147,0.1);
    }
    .filter-tabs {
      display: flex; align-items: center;
      gap: 6px; flex-wrap: wrap;
    }
    .filter-tab {
      font-size: 12px; font-weight: 700;
      padding: 7px 16px; border-radius: 100px;
      border: 1.5px solid var(--rule);
      background: #fff; color: var(--body-c);
      cursor: pointer; white-space: nowrap;
      transition: all 0.18s;
    }
    .filter-tab:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
    .filter-tab.active {
      background: var(--blue); color: #fff;
      border-color: var(--blue);
    }

    /* ── POST CARD ── */
    .post-card {
      background: #fff;
      border: 1px solid var(--rule);
      border-radius: 10px;
      overflow: hidden;
      transition: box-shadow 0.25s, border-color 0.25s, transform 0.2s;
      cursor: pointer;
      height: 100%;
      display: flex; flex-direction: column;
    }
    .post-card:hover {
      box-shadow: 0 12px 40px rgba(68,87,147,0.12);
      border-color: var(--blue-bdr);
      transform: translateY(-4px);
    }
    .post-card:hover .card-title { color: var(--blue); }
    .post-card:hover .read-more-link { gap: 10px; }

    .card-img-wrap {
      overflow: hidden;
      aspect-ratio: 16 / 10;
      position: relative;
    }
    .card-img-wrap img {
      width: 100%; height: 100%; object-fit: cover;
      display: block;
      transition: transform 0.55s ease;
    }
    .post-card:hover .card-img-wrap img { transform: scale(1.05); }

    .card-body-inner {
      padding: 22px 22px 20px;
      flex: 1; display: flex; flex-direction: column;
    }
    .card-tag-row {
      display: flex; align-items: center;
      justify-content: space-between; gap: 8px;
      margin-bottom: 12px;
    }
    .card-tag {
      font-size: 10.5px; font-weight: 800;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--blue);
      background: var(--blue-light);
      border: 1px solid var(--blue-bdr);
      padding: 3px 10px; border-radius: 100px;
    }
    .card-date {
      font-size: 11.5px; font-weight: 500; color: var(--muted);
    }
    .card-title {
      font-size: 1.05rem; font-weight: 800;
      line-height: 1.35; letter-spacing: -0.01em;
      color: var(--ink); margin-bottom: 10px;
      transition: color 0.18s;
    }
    .card-excerpt {
      font-size: 13.5px; color: var(--body-c);
      line-height: 1.72; font-weight: 400;
      flex: 1; margin-bottom: 18px;
    }
    .card-footer-row {
      display: flex; align-items: center;
      justify-content: space-between; gap: 8px;
      padding-top: 14px;
      border-top: 1px solid var(--rule);
    }
    .read-time {
      font-size: 11.5px; font-weight: 600;
      color: var(--muted);
      display: flex; align-items: center; gap: 5px;
    }
    .read-more-link {
      font-size: 13px; font-weight: 800;
      color: var(--blue);
      display: inline-flex; align-items: center; gap: 6px;
      transition: gap 0.2s;
      letter-spacing: 0.01em;
    }

    /* ── FEATURED CARD (first post, larger) ── */
    .featured-card {
      background: #fff;
      border: 1px solid var(--rule);
      border-radius: 10px;
      overflow: hidden;
      transition: box-shadow 0.25s, border-color 0.25s, transform 0.2s;
      cursor: pointer;
    }
    .featured-card:hover {
      box-shadow: 0 16px 48px rgba(68,87,147,0.13);
      border-color: var(--blue-bdr);
      transform: translateY(-4px);
    }
    .featured-card:hover .feat-card-title { color: var(--blue); }
    .featured-card:hover .card-img-wrap img { transform: scale(1.04); }
    .featured-card:hover .read-more-link { gap: 10px; }

    .feat-card-img {
      aspect-ratio: 16 / 8;
      overflow: hidden;
    }
    .feat-card-img img {
      width: 100%; height: 100%; object-fit: cover;
      display: block; transition: transform 0.55s ease;
    }
    .feat-card-body { padding: 28px 28px 24px; }
    .feat-tag {
      font-size: 10.5px; font-weight: 800;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #fff; background: var(--blue);
      padding: 4px 12px; border-radius: 100px;
      display: inline-block; margin-bottom: 14px;
    }
    .feat-card-title {
      font-size: clamp(1.3rem, 2.2vw, 1.7rem);
      font-weight: 900; line-height: 1.2;
      letter-spacing: -0.02em; color: var(--ink);
      margin-bottom: 12px; transition: color 0.18s;
    }
    .feat-excerpt {
      font-size: 14.5px; color: var(--body-c);
      line-height: 1.8; font-weight: 400; margin-bottom: 20px;
    }
    .feat-footer {
      display: flex; align-items: center;
      justify-content: space-between; gap: 12px;
      padding-top: 16px; border-top: 1px solid var(--rule);
      flex-wrap: wrap;
    }
    .feat-meta {
      display: flex; align-items: center; gap: 10px;
    }
    .feat-author-av {
      width: 32px; height: 32px; border-radius: 50%;
      background: var(--blue); color: #fff;
      font-size: 11px; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
    }
    .feat-author-name { font-size: 13px; font-weight: 700; color: var(--ink); }
    .feat-author-sub  { font-size: 11.5px; color: var(--muted); margin-top: 1px; }

    /* ── SECTION LABEL ── */
    .sec-label-row {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 28px;
    }
    .sec-label {
      font-size: 10.5px; font-weight: 800;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--muted); white-space: nowrap;
    }
    .sec-label-rule { flex: 1; height: 1px; background: var(--rule); }

    /* ── VIEW MORE BUTTON ── */
    .view-more-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 36px;
      border: 2px solid var(--rule);
      background: transparent; color: var(--body-c);
      font-size: 14px; font-weight: 700;
      border-radius: 8px; cursor: pointer;
      transition: all 0.22s;
      font-family: 'Satoshi', sans-serif !important;
    }
    .view-more-btn:hover {
      border-color: var(--blue); color: var(--blue);
      background: var(--blue-light);
      transform: translateY(-1px);
    }

    /* ── NEWSLETTER STRIP ── */
    .nl-strip {
      background: var(--blue);
      padding: 56px 0;
    }
    .nl-strip-title {
      font-size: clamp(1.5rem, 3vw, 2.2rem);
      font-weight: 900; color: #fff;
      letter-spacing: -0.02em; line-height: 1.2;
      margin-bottom: 10px;
    }
    .nl-strip-sub {
      font-size: 15px; color: rgba(255,255,255,0.65);
      line-height: 1.7; margin-bottom: 0;
    }
    .nl-form {
      display: flex; gap: 0; max-width: 420px; width: 100%;
    }
    .nl-email {
      flex: 1; padding: 12px 16px;
      border: 1.5px solid rgba(255,255,255,0.25);
      border-right: none;
      background: rgba(255,255,255,0.1);
      color: #fff; font-size: 14px;
      font-family: 'Satoshi', sans-serif !important;
      outline: none; border-radius: 8px 0 0 8px;
      transition: border-color 0.2s;
    }
    .nl-email::placeholder { color: rgba(255,255,255,0.35); }
    .nl-email:focus { border-color: rgba(255,255,255,0.6); }
    .nl-submit {
      padding: 12px 22px;
      background: #fff; color: var(--blue);
      font-size: 13.5px; font-weight: 800;
      border: none; cursor: pointer;
      border-radius: 0 8px 8px 0;
      transition: background 0.18s;
      font-family: 'Satoshi', sans-serif !important;
      white-space: nowrap;
    }
    .nl-submit:hover { background: var(--bg-soft); }

    /* ── CTA SECTION ── */
    .cta-sec { background: var(--bg-soft); padding: 72px 0; border-top: 1px solid var(--rule); }
    .cta-title {
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      font-weight: 900; letter-spacing: -0.02em;
      color: var(--ink); line-height: 1.15; margin-bottom: 14px;
    }
    .cta-desc { font-size: 15px; color: var(--body-c); line-height: 1.8; margin-bottom: 28px; }
    .cta-btn-p {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 28px; background: var(--blue); color: #fff;
      font-size: 14px; font-weight: 700; border-radius: 8px;
      border: none; cursor: pointer; transition: all 0.2s;
      font-family: 'Satoshi', sans-serif !important;
    }
    .cta-btn-p:hover { background: var(--blue-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(68,87,147,0.3); }
    .cta-btn-s {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border: 1.5px solid var(--blue-bdr); color: var(--blue);
      font-size: 14px; font-weight: 700; border-radius: 8px;
      background: transparent; cursor: pointer; transition: all 0.2s;
      font-family: 'Satoshi', sans-serif !important;
    }
    .cta-btn-s:hover { background: var(--blue-light); border-color: var(--blue); }

    /* ── FOOTER ── */
    .blog-footer {
      background: var(--ink); padding: 32px 0;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    /* ── NO RESULTS ── */
    .no-results {
      text-align: center; padding: 80px 0;
      color: var(--muted); font-size: 15px;
    }

    /* ── Responsive ── */
    @media (max-width: 576px) {
      .filter-tabs { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
      .filter-tabs::-webkit-scrollbar { display: none; }
      .nl-form { flex-direction: column; }
      .nl-email { border-right: 1.5px solid rgba(255,255,255,0.25); border-bottom: none; border-radius: 8px 8px 0 0; }
      .nl-submit { border-radius: 0 0 8px 8px; }
    }
  `}</style>
);

/* ── Scroll reveal ───────────────────────────────────────────── */
const Fade = ({ children, delay = 0, y = 16 }) => {
  const ref = useRef(null);
  const io  = useInView(ref, { once: true, margin: "-32px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={io ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════ */
const Nav = () => (
  <nav className="blog-nav">
    <div className="container-xl">
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div className="nav-logo-box">
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 12 }}>AE</span>
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 14, color: "var(--ink)", lineHeight: 1.2 }}>AESPL</div>
          <div style={{ fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Embedded Systems</div>
        </div>
      </a>

      <div className="d-none d-lg-flex align-items-center gap-4">
        {[["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Sectors", "/sectors"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([l, h]) => (
          <a key={l} href={h} className={`nav-link-plain ${l === "Blog" ? "nav-link-active" : ""}`}>{l}</a>
        ))}
      </div>

      <a href="/contact" className="nav-cta-btn">Contact Us</a>
    </div>
  </nav>
);

/* ══════════════════════════════════════════════════════════════
   PAGE HERO
══════════════════════════════════════════════════════════════ */
const PageHero = () => (
  <div className="page-hero">
    <div className="container-xl">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ marginBottom: 28 }}>
        <a href="/" className="bc-link">Home</a>
        <span className="bc-sep">›</span>
        <span className="bc-current">Blog</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="hero-eyebrow">Engineering Blog</div>
        <h1 className="hero-title">Insights and Updates</h1>
        <p className="hero-desc">
          A collection of hand-picked articles for OEM engineers and product developers. Deep dives, insights, and honest advice to navigate the embedded systems landscape.
        </p>
      </motion.div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   SEARCH + FILTER BAR
══════════════════════════════════════════════════════════════ */
const FilterBar = ({ search, setSearch, activeTag, setActiveTag }) => (
  <div className="filter-section">
    <div className="container-xl">
      <div className="row align-items-center g-3">
        {/* Search */}
        <div className="col-12 col-md-auto">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="col-12 col-md">
          <div className="filter-tabs">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`filter-tab ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   FEATURED POST CARD
══════════════════════════════════════════════════════════════ */
const FeaturedCard = ({ post }) => (
  <Fade>
    <a href={`/blog/${post.id}`} className="featured-card d-block" style={{ textDecoration: "none" }}>
      <div className="feat-card-img">
        <img src={post.img} alt={post.title} />
      </div>
      <div className="feat-card-body">
        <span className="feat-tag">{post.tag}</span>
        <h2 className="feat-card-title">{post.title}</h2>
        <p className="feat-excerpt">{post.excerpt}</p>
        <div className="feat-footer">
          <div className="feat-meta">
            <div className="feat-author-av">AE</div>
            <div>
              <div className="feat-author-name">AESPL Engineering</div>
              <div className="feat-author-sub">{post.date} · {post.read}</div>
            </div>
          </div>
          <span className="read-more-link">
            Read More <span>→</span>
          </span>
        </div>
      </div>
    </a>
  </Fade>
);

/* ══════════════════════════════════════════════════════════════
   REGULAR POST CARD
══════════════════════════════════════════════════════════════ */
const PostCard = ({ post, delay = 0 }) => {
  const ref = useRef(null);
  const io  = useInView(ref, { once: true, margin: "-24px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={io ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}>
      <a href={`/blog/${post.id}`} className="post-card d-block" style={{ textDecoration: "none" }}>
        {/* Image */}
        <div className="card-img-wrap">
          <img src={post.img} alt={post.title} />
        </div>

        {/* Body */}
        <div className="card-body-inner">
          <div className="card-tag-row">
            <span className="card-tag">{post.tag}</span>
            <span className="card-date">{post.date}</span>
          </div>
          <div className="card-title">{post.title}</div>
          <div className="card-excerpt">{post.excerpt}</div>
          <div className="card-footer-row">
            <div className="read-time">
              <span>⏱</span> {post.read}
            </div>
            <span className="read-more-link">
              Read More <span>→</span>
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN ARTICLES SECTION
══════════════════════════════════════════════════════════════ */
const ArticlesSection = ({ posts }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  if (posts.length === 0) {
    return (
      <div className="container-xl">
        <div className="no-results">
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🔍</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "var(--ink)", marginBottom: 8 }}>No articles found</div>
          <div>Try a different search term or filter.</div>
        </div>
      </div>
    );
  }

  const featured  = posts[0];
  const rest      = posts.slice(1);
  const visible   = rest.slice(0, visibleCount);
  const hasMore   = visibleCount < rest.length;

  return (
    <div style={{ padding: "56px 0 72px", background: "#fff" }}>
      <div className="container-xl">

        {/* Featured post */}
        {featured && (
          <>
            <Fade>
              <div className="sec-label-row">
                <span className="sec-label">Featured Article</span>
                <div className="sec-label-rule" />
              </div>
            </Fade>
            <div className="mb-5">
              <FeaturedCard post={featured} />
            </div>
          </>
        )}

        {/* All articles grid */}
        {visible.length > 0 && (
          <>
            <Fade>
              <div className="sec-label-row mt-2">
                <span className="sec-label">All Articles</span>
                <div className="sec-label-rule" />
                <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {posts.length} posts
                </span>
              </div>
            </Fade>

            <div className="row g-4">
              {visible.map((post, i) => (
                <div key={post.id} className="col-12 col-md-6 col-lg-4">
                  <PostCard post={post} delay={(i % 3) * 0.08} />
                </div>
              ))}
            </div>

            {/* View More button */}
            {hasMore && (
              <Fade style={{ marginTop: 52, textAlign: "center" }}>
                <button
                  className="view-more-btn mt-3"
                  onClick={() => setVisibleCount(c => c + 6)}>
                  View More Articles
                  <span style={{ fontSize: 16 }}>↓</span>
                </button>
              </Fade>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   NEWSLETTER STRIP
══════════════════════════════════════════════════════════════ */
const NewsletterStrip = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) { setSent(true); }
  };

  return (
    <div className="nl-strip">
      <div className="container-xl">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6">
            <Fade>
              <h2 className="nl-strip-title">Technical writing, once a month.</h2>
              <p className="nl-strip-sub">
                Engineering insights from the AESPL team — no marketing, no spam. Just useful articles on embedded systems, compliance, and OEM product development.
              </p>
            </Fade>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-lg-end">
            <Fade delay={0.1}>
              {sent ? (
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
                  ✓ You're subscribed! We'll be in touch.
                </div>
              ) : (
                <div className="nl-form">
                  <input
                    className="nl-email"
                    type="email"
                    placeholder="your@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  />
                  <button className="nl-submit" onClick={handleSubmit}>Subscribe →</button>
                </div>
              )}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CTA SECTION
══════════════════════════════════════════════════════════════ */
const CTASection = () => (
  <section className="cta-sec">
    <div className="container-xl">
      <Fade>
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-7">
            <h2 className="cta-title">
              Have an embedded problem<br />worth solving?
            </h2>
            <p className="cta-desc">
              We've spent 29 years building embedded systems expertise OEMs can rely on — not just for delivery, but for the long term. If your product needs the right embedded foundation, let's talk.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button className="cta-btn-p">Start a Conversation</button>
              <button className="cta-btn-s">About AESPL</button>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { n: "29+", label: "Years Experience" },
                { n: "100+", label: "Products Delivered" },
                { n: "<0.10%", label: "Complaint Rate" },
                { n: "2", label: "Patents Granted" },
              ].map((s, i) => (
                <Fade key={i} delay={i * 0.08}>
                  <div style={{
                    padding: "20px 18px",
                    border: "1px solid var(--rule)",
                    borderRadius: 10,
                    background: "#fff",
                    boxShadow: "0 2px 12px rgba(68,87,147,0.05)",
                  }}>
                    <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--blue)", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, fontWeight: 600 }}>{s.label}</div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  </section>
);

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="blog-footer">
    <div className="container-xl">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div style={{ width: 30, height: 30, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 11 }}>AE</span>
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
            © 2024 Akshay Embedded Systems Pvt. Ltd. · Pune, India
          </span>
        </div>
        <div className="d-flex gap-3 flex-wrap">
          {["ISO 9001:2015", "ISO 13485:2016", "DPIIT Recognised"].map(b => (
            <span key={b} style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(168,183,230,0.8)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 100 }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All Articles");
  const [search,    setSearch]    = useState("");

  const filtered = POSTS.filter(post => {
    const matchTag    = activeTag === "All Articles" || post.tag === activeTag;
    const matchSearch = search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tag.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <>
      <BSLoader />
      <Styles />
      {/* <Nav /> */}
      <PageHero />
      <FilterBar
        search={search} setSearch={setSearch}
        activeTag={activeTag} setActiveTag={setActiveTag}
      />
      <ArticlesSection posts={filtered} />
      {/* <NewsletterStrip /> */}
      {/* <CTASection /> */}
      {/* <Footer /> */}
    </>
  );
}