import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ─── FONTS ─────────────────────────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
  `}</style>
);

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    :root {
      --brand:       rgb(68,87,147);
      --brand-dark:  rgb(45,60,110);
      --brand-light: rgba(68,87,147,0.07);
      --brand-mid:   rgba(68,87,147,0.14);
      --bg:          #ffffff;
      --surface:     #f6f8fd;
      --surface2:    #edf0f9;
      --border:      rgba(68,87,147,0.13);
      --text:        #18213a;
      --muted:       #64748b;
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:var(--bg);color:var(--text);font-family:'Satoshi',sans-serif;overflow-x:hidden;}
    ::selection{background:var(--brand);color:#fff;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:#f0f2f8;}
    ::-webkit-scrollbar-thumb{background:var(--brand);border-radius:2px;}
    .cg{font-family:'Satoshi'}
    .mono{font-family:'Satoshi'}
    .section{padding:5rem 0;}
    .container{max-width:1200px;margin:0 auto;padding:0 2.5rem;}
    .pill{
      display:inline-flex;align-items:center;gap:0.5rem;
      background:var(--brand-light);border:1px solid var(--border);
      color:var(--brand);border-radius:100px;
      padding:0.35rem 1rem;font-size:0.68rem;letter-spacing:0.12em;
      text-transform:uppercase;font-family:'JetBrains Mono',monospace;font-weight:700;
    }
    .dot{width:6px;height:6px;background:var(--brand);border-radius:50%;flex-shrink:0;}
    img{display:block;}
  `}</style>
);

/* ─── SHARED COMPONENTS ─────────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

const Counter = ({ end, suffix = "", prefix = "", label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0; const d = 1500;
    const step = ts => { if (!s) s = ts; const p = Math.min((ts-s)/d,1); setCount(Math.floor(p*end)); if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [inView, end]);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div className="cg" style={{ fontSize:"clamp(2.6rem,4vw,3.6rem)", fontWeight:700, color:"var(--brand)", lineHeight:1 }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text)", marginTop:"0.5rem" }}>{label}</div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════════════ */
// const Navbar = () => {
//   const [sc, setSc] = useState(false);
//   useEffect(() => { const fn=()=>setSc(window.scrollY>40); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); },[]);
//   return (
//     <motion.nav initial={{y:-70,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}
//       style={{
//         position:"fixed",top:0,left:0,right:0,zIndex:1000,
//         padding:"0.9rem 2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",
//         background: sc?"rgba(255,255,255,0.95)":"transparent",
//         backdropFilter: sc?"blur(16px)":"none",
//         borderBottom: sc?"1px solid var(--border)":"none",
//         boxShadow: sc?"0 2px 24px rgba(68,87,147,0.08)":"none",
//         transition:"all 0.4s",
//       }}>
//       <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
//         <div style={{width:40,height:40,borderRadius:"10px",background:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <span className="mono" style={{fontSize:"0.75rem",fontWeight:700,color:"#fff"}}>AE</span>
//         </div>
//         <div>
//           <div style={{fontWeight:700,fontSize:"0.95rem",color:"var(--text)"}}>AESPL</div>
//           <div className="mono" style={{fontSize:"0.58rem",color:"var(--muted)",letterSpacing:"0.08em"}}>PUNE · EST. 1995</div>
//         </div>
//       </div>
//       <div style={{display:"flex",gap:"2.5rem"}}>
//         {[["Story","#story"],["Innovation","#patents"],["Track Record","#glance"],["Team","#team"]].map(([l,h])=>(
//           <a key={l} href={h} style={{color:"var(--muted)",textDecoration:"none",fontSize:"0.82rem",fontWeight:500,transition:"color 0.2s"}}
//             onMouseEnter={e=>e.target.style.color="var(--brand)"} onMouseLeave={e=>e.target.style.color="var(--muted)"}>{l}</a>
//         ))}
//       </div>
//       <a href="#cta" style={{padding:"0.6rem 1.5rem",background:"var(--brand)",color:"#fff",borderRadius:"8px",textDecoration:"none",fontSize:"0.82rem",fontWeight:600,boxShadow:"0 4px 18px rgba(68,87,147,0.3)",transition:"all 0.2s",display:"inline-block"}}
//         onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 8px 28px rgba(68,87,147,0.4)";}}
//         onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 4px 18px rgba(68,87,147,0.3)";}}>
//         Let's Talk
//       </a>
//     </motion.nav>
//   );
// };

/* ═══════════════════════════════════════════════════════════════════════════
   HERO  — mosaic bento grid matching reference image style
═══════════════════════════════════════════════════════════════════════════ */
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY,[0,500],[0,70]);
  const op = useTransform(scrollY,[0,650],[7,0]);

  return (
    <section style={{background:"var(--bg)",paddingTop:"5.5rem",overflow:"hidden", height:"66rem"}}>
      <motion.div>
        {/* Headline */}
        <div className="container" style={{textAlign:"center",paddingTop:"4rem",paddingBottom:"3.5rem"}}>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6}} style={{marginBottom:"1.25rem"}}>
            <span className="pill"><span className="dot"/>About Akshay Embedded Systems</span>
          </motion.div>
          <motion.h3 className="cg" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.85,delay:0.1,ease:[0.22,1,0.36,1]}}
            style={{fontSize:"clamp(2.8rem,2vw,5.2rem)",fontWeight:500,lineHeight:1.1,color:"var(--text)",marginBottom:"1.5rem"}}>
            Where Technology Meets<br/>
            <em style={{color:"var(--brand)",fontStyle:"normal"}}>Three Decades of Promise</em>
          </motion.h3>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.25}}
            style={{color:"var(--muted)",fontSize:"1.05rem",maxWidth:560,margin:"0 auto 2.5rem",lineHeight:1.8}}>
            Founded in Pune in 1995, AESPL was built for one purpose: to bridge the real gap between standard embedded solutions and what OEM applications actually demand.
          </motion.p>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
            style={{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"}}>
            <a href="#story" style={{padding:"0.85rem 2.2rem",background:"var(--brand)",color:"#fff",borderRadius:"10px",textDecoration:"none",fontWeight:600,fontSize:"0.9rem",boxShadow:"0 6px 24px rgba(68,87,147,0.3)",transition:"all 0.2s",display:"inline-block"}}
              onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 10px 32px rgba(68,87,147,0.4)";}}
              onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 6px 24px rgba(68,87,147,0.3)";}}>Our Story</a>
            <a href="#patents" style={{padding:"0.85rem 2.2rem",border:"1.5px solid var(--border)",color:"var(--brand)",borderRadius:"10px",textDecoration:"none",fontWeight:600,fontSize:"0.9rem",background:"var(--brand-light)",transition:"all 0.2s",display:"inline-block"}}
              onMouseEnter={e=>{e.target.style.background="var(--brand-mid)";e.target.style.borderColor="var(--brand)";}}
              onMouseLeave={e=>{e.target.style.background="var(--brand-light)";e.target.style.borderColor="var(--border)";}}>Innovation & Patents</a>
          </motion.div>
        </div>

        {/* MOSAIC GRID */}
        <motion.div style={{y}} className="container"
          initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.35,ease:[0.22,1,0.36,1]}}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1.5fr 1fr",
            gridTemplateRows:"220px 220px",
            gap:12,borderRadius:20,overflow:"hidden",
            boxShadow:"0 20px 80px rgba(68,87,147,0.1)",
          }}>
            {/* Stat tile 1 */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.45}}
              style={{gridColumn:"1/2",gridRow:"1/2",background:"var(--brand)",borderRadius:12,padding:"2rem",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              <div className="cg" style={{fontSize:"3.8rem",fontWeight:700,color:"#fff",lineHeight:1}}>29+</div>
              <div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.8)",marginTop:"0.4rem",fontWeight:500}}>Years of OEM Engineering</div>
            </motion.div>
            {/* Big image */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.5}}
              style={{gridColumn:"2/3",gridRow:"1/3",borderRadius:12,overflow:"hidden"}}>
              <img src="./assets/images/aboutPage/1.jpg" alt="Engineer"
                style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s"}}
                onMouseEnter={e=>e.target.style.transform="scale(1.04)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
            </motion.div>
            {/* Top right image */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.55}}
              style={{gridColumn:"3/4",gridRow:"1/2",borderRadius:12,overflow:"hidden"}}>
              <img src="./assets/images/aboutPage/2.jpg" alt="PCB"
                style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s"}}
                onMouseEnter={e=>e.target.style.transform="scale(1.04)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
            </motion.div>
            {/* Bottom left image */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.6}}
              style={{gridColumn:"1/2",gridRow:"2/3",borderRadius:12,overflow:"hidden"}}>
              <img src="./assets/images/aboutPage/3.jpg" alt="Team"
                style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s"}}
                onMouseEnter={e=>e.target.style.transform="scale(1.04)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
            </motion.div>
            {/* Stat tile 2 */}
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.65}}
              style={{gridColumn:"3/4",gridRow:"2/3",background:"#18213a",borderRadius:12,padding:"2rem",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              <div className="cg" style={{fontSize:"3.8rem",fontWeight:700,color:"#fff",lineHeight:1}}>100+</div>
              <div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.75)",marginTop:"0.4rem",fontWeight:500}}>Embedded Product Designs</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   STORY
═══════════════════════════════════════════════════════════════════════════ */
const StorySection = () => (
  <section id="story" className="section" style={{background:"var(--surface)"}}>
    <div className="container">
      <div style={{display:"flex",gap:"5rem",flexWrap:"wrap",alignItems:"center"}}>
        <FadeUp style={{flex:"1 1 360px"}}>
          <div style={{position:"relative",paddingBottom:"2.5rem",paddingRight:"2.5rem"}}>
            <div style={{borderRadius:16,overflow:"hidden",aspectRatio:"4/5",border:"1px solid var(--border)"}}>
              <img src="https://plus.unsplash.com/premium_photo-1766436243480-f548bc9383a5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Engineer" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <motion.div animate={{y:[0,-6,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
              style={{position:"absolute",bottom:0,right:0,background:"var(--brand)",color:"#fff",padding:"1.2rem 1.6rem",borderRadius:12,boxShadow:"0 8px 32px rgba(68,87,147,0.3)"}}>
              <div className="cg" style={{fontSize:"2.4rem",fontWeight:700,lineHeight:1}}>0.20%</div>
              <div style={{fontSize:"0.7rem",fontWeight:600,marginTop:"0.2rem",opacity:0.85}}>In-house rework rate</div>
            </motion.div>
            <div style={{position:"absolute",top:"-1.2rem",left:"-1.2rem",width:72,height:72,borderRadius:12,background:"var(--brand-light)",border:"1.5px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem"}}>⚙️</div>
          </div>
        </FadeUp>

        <div style={{flex:"1 1 420px"}}>
          <FadeUp delay={0.1}>
            <span className="" style={{marginBottom:"1.2rem",display:"inline-flex",color:"#445793", fontWeight:700}}>Our Story</span>
            <h2 className="cg" style={{fontSize:"1.8rem",fontWeight:700,lineHeight:1.15,marginBottom:"1.75rem",color:"var(--text)"}}>
              Built for OEMs.<em style={{color:"var(--brand)",fontStyle:"normal"}}>Shaped by 29 Years</em> of Real Problems.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:"1.1rem"}}>We didn't start with a product catalogue. We started with a question: what would it look like if an embedded systems company was designed entirely around the needs of the OEM?</p>
            <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:"1.1rem"}}>Over 29 years, we have applied this thinking to more than 100 embedded product designs across medical devices, industrial automation, compressor controllers, packaging machines, and commercial electronics.</p>
            <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:"2rem"}}>What has never changed: understand the application completely, engineer a solution that fits it precisely, and stand behind it through its entire lifecycle.</p>
            <blockquote style={{borderLeft:"3px solid var(--brand)",background:"var(--brand-light)",borderRadius:"0 10px 10px 0",padding:"1.25rem 1.5rem",marginBottom:"2rem"}}>
              <p className="cg" style={{fontSize:"1.1rem",fontStyle:"italic",color:"var(--brand-dark)",lineHeight:1.7}}>"An embedded system built for a specific application will always outperform one that was adapted to it."</p>
              <footer className="mono" style={{fontSize:"0.62rem",color:"var(--brand)",marginTop:"0.6rem",letterSpacing:"0.1em"}}>— AESPL FOUNDING PRINCIPLE</footer>
            </blockquote>
          </FadeUp>
        </div>
      </div>

      {/* Stats strip */}
      <FadeUp delay={0.15} style={{marginTop:"5rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",background:"var(--bg)",boxShadow:"0 4px 40px rgba(68,87,147,0.06)"}}>
          {[{end:29,suffix:"+",label:"Years Founded"},{end:100,suffix:"+",label:"Product Designs"},{end:20,suffix:"+",label:"Active OEM Partners"},{end:2,suffix:"",label:"Patents Granted"}].map((s,i)=>(
            <div key={i} style={{padding:"2.5rem 1rem",borderRight:i<3?"1px solid var(--border)":"none"}}><Counter {...s}/></div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   WHAT MAKES US DIFFERENT
═══════════════════════════════════════════════════════════════════════════ */
const DifferenceSection = () => {
  const cards = [
    {icon:"🎯",title:"We Start From Your Application",body:"Before writing a line of code, we study your application's environment, sensors, real-time demands, and regulatory requirements. The solution fits your specifics, never a template."},
    {icon:"🏭",title:"Entire Development In-House",body:"Hardware design, firmware, PCB design and assembly, product testing, and manufacturing all under one roof. The engineer who designed your hardware reviews your firmware."},
    {icon:"🏆",title:"Quality That Clients Demand",body:"ISO 9001:2015 & ISO 13485:2016 certified. IEC tested. Rework rate below 0.20%. Customer complaint rate below 0.10%. These are results, not targets."},
    {icon:"⚡",title:"Projects That Cannot Fail",body:"Ventilators for critical care. Systems for BARC. Pasteurization machines on two continents. Engineering discipline isn't optional, it's the standard we apply to every project."},
    {icon:"🔁",title:"Long-Term Partnership",body:"Firmware updates, design revisions, post-deployment field support, and production scaling. Several clients have worked with us continuously for over a decade."},
    {icon:"📐",title:"Not a Component Supplier",body:"There's a fundamental difference between a company that sells embedded modules and one that builds embedded solutions. AESPL has always been the latter."},
  ];
  return (
    <section className="section" style={{background:"var(--bg)"}}>
      <div className="container">
        <FadeUp style={{textAlign:"center",marginBottom:"4rem"}}>
          {/* <span className="pill" style={{marginBottom:"1.25rem",display:"inline-flex"}}><span className="dot"/>What Makes Us Different</span> */}
          <span className="" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>What Makes Us Different</span>
          <h2 className="cg" style={{fontSize:"1.8rem",fontWeight:700,color:"var(--text)",lineHeight:1.15,maxWidth:660,margin:"0 auto"}}>
            We Are Not a Component Supplier.<br/><em style={{color:"var(--brand)", fontStyle:"normal"}}>We Are Your Embedded Engineering Team.</em>
          </h2>
        </FadeUp>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.25rem"}}>
          {cards.map((c,i)=>{
            const ref=useRef(null); const inView=useInView(ref,{once:true});
            return (
              <motion.div key={i} ref={ref}
                initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
                transition={{duration:0.6,delay:i*0.08}}
                whileHover={{y:-5,boxShadow:"0 12px 48px rgba(68,87,147,0.12)",borderColor:"var(--brand)"}}
                style={{padding:"2rem",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:14,cursor:"default",transition:"border-color 0.2s"}}>
                <div style={{width:48,height:48,borderRadius:12,background:"var(--brand-light)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",marginBottom:"1.25rem"}}>{c.icon}</div>
                <div style={{fontWeight:700,fontSize:"1rem",marginBottom:"0.65rem",color:"var(--text)"}}>{c.title}</div>
                <div style={{fontSize:"0.875rem",color:"var(--muted)",lineHeight:1.78}}>{c.body}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — PATENTS & INNOVATION
═══════════════════════════════════════════════════════════════════════════ */
const PatentsSection = () => {
  const patents = [
    {badge:"GRANTED PATENT",bc:"rgb(68,87,147)",no:"Patent No. 542763",date:"Granted 24 June 2024",title:"HFOV Ventilator",full:"Apparatus for High Frequency Oscillatory Ventilation",body:"A specialized respiratory device for neonatal and critical care patients. Not a modified off-the-shelf design, a ground-up innovation developed entirely by AESPL's engineering team.",icon:"🫁"},
    {badge:"GRANTED PATENT",bc:"rgb(68,87,147)",no:"Patent No. 573255",date:"Granted Patent",title:"Bubble CPAP Machine",full:"Bubble CPAP Machine with Adjustable Amplitude",body:"A patient-critical neonatal breathing support system with novel amplitude-adjustment mechanism, engineered and patented entirely by AESPL.",icon:"🩺"},
    {badge:"TRADEMARK FILED",bc:"rgb(68,87,147)",no:"App. No. 5947801",date:"Filed 23 May 2023",title:"VEPS Ventilation Mode",full:"Proprietary Ventilator Control Logic",body:"A novel approach to ventilator control logic, developed and trademarked by AESPL. VEPS represents a proprietary advance in how ventilators respond to patient needs.",icon:"⚗️"},
    {badge:"PATENT PENDING",bc:"rgb(68,87,147)",no:"Application Under Examination",date:"Indian Patent Application",title:"Human Milk Pasteurization Machine",full:"India's First Embedded-Controlled HMP Machine",body:"First installed at the David Geffen School of Medicine at UCLA, then KEM Hospital Pune and other leading Indian healthcare institutions.",icon:"🍼"},
  ];

  return (
    <section id="patents" className="section" style={{background:"var(--surface)"}}>
      <div className="container">
        <FadeUp style={{marginBottom:"4.5rem"}}>
          <div style={{display:"flex",gap:"4rem",flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:"1 1 380px"}}>
              {/* <span className="pill" style={{marginBottom:"1.25rem",display:"inline-flex"}}><span className="dot"/>Patents & Innovation</span> */}
              <span className="" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>Patents & Innovation</span>
              <h2 className="cg" style={{fontSize:"1.8rem",fontWeight:700,lineHeight:1.15,color:"var(--text)"}}>
                Innovation Is Not a<br/>Side Project at AESPL.<br/><em style={{color:"var(--brand)", fontStyle:"normal"}}>It's What We Do.</em>
              </h2>
            </div>
            <div style={{flex:"1 1 320px"}}>
              <p style={{color:"var(--muted)",lineHeight:1.85}}>Our commitment to advancing embedded technology has led to patented inventions, proprietary processes, and products making a measurable difference in healthcare and industry.</p>
            </div>
          </div>
        </FadeUp>

        {/* Patent cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:"1.5rem"}}>
          {patents.map((p,i)=>{
            const ref=useRef(null); const inView=useInView(ref,{once:true});
            return (
              <motion.div key={i} ref={ref}
                initial={{opacity:0,y:50}} animate={inView?{opacity:1,y:0}:{}}
                transition={{duration:0.65,delay:i*0.1}}
                whileHover={{y:-6,boxShadow:"0 20px 60px rgba(68,87,147,0.12)"}}
                style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                <div style={{height:4,background:p.bc}}/>
                <div style={{padding:"1.75rem",flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.25rem"}}>
                    <div style={{width:52,height:52,borderRadius:14,background:"var(--brand-light)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem"}}>{p.icon}</div>
                    <span style={{fontSize:"0.62rem",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,letterSpacing:"0.09em",color:p.bc,background:`${p.bc}18`,border:`1px solid ${p.bc}40`,padding:"0.3rem 0.75rem",borderRadius:100}}>{p.badge}</span>
                  </div>
                  <div className="mono" style={{fontSize:"0.62rem",color:"var(--muted)",marginBottom:"0.4rem",letterSpacing:"0.04em"}}>{p.no} · {p.date}</div>
                  <h3 style={{fontSize:"1.1rem",fontWeight:700,color:"var(--text)",marginBottom:"0.3rem"}}>{p.title}</h3>
                  <div style={{fontSize:"0.78rem",color:"var(--brand)",fontWeight:600,marginBottom:"0.9rem"}}>{p.full}</div>
                  <p style={{fontSize:"0.875rem",color:"var(--muted)",lineHeight:1.75}}>{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* UCLA highlight bar */}
        <FadeUp delay={0.2} style={{marginTop:"3rem"}}>
          <div style={{background:"var(--brand)",borderRadius:16,padding:"2.5rem 3rem",display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"center",boxShadow:"0 10px 50px rgba(68,87,147,0.25)"}}>
            <div style={{flex:1}}>
              <div className="mono" style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.55)",letterSpacing:"0.12em",marginBottom:"0.75rem"}}>GLOBAL DEPLOYMENT</div>
              <h3 className="cg" style={{fontSize:"clamp(1.4rem,2.5vw,2.1rem)",fontWeight:700,color:"#fff",lineHeight:1.2}}>First installed at the David Geffen<br/>School of Medicine at UCLA, Los Angeles.</h3>
            </div>
            <div style={{display:"flex",gap:"2.5rem",flexWrap:"wrap"}}>
              {[["UCLA","Los Angeles"],["KEM Hospital","Pune, India"],["2 Continents","Deployed"]].map(([v,l])=>(
                <div key={v} style={{textAlign:"center"}}>
                  <div className="cg" style={{fontSize:"1.7rem",fontWeight:700,color:"#fff",lineHeight:1}}>{v}</div>
                  <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.6)",marginTop:"0.2rem"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — AT A GLANCE / TRACK RECORD
═══════════════════════════════════════════════════════════════════════════ */
const GlanceSection = () => {
  const timeline = [
    {year:"1995",label:"Founded in Pune",desc:"Akshay Embedded Systems Pvt. Ltd. begins its mission to serve India's OEM sector with custom embedded engineering."},
    {year:"29+",label:"Years of Experience",desc:"Nearly three decades of embedded systems engineering across medical, industrial, and commercial domains."},
    {year:"100+",label:"Product Designs Delivered",desc:"Embedded product designs delivered to OEM clients - from first-time startups to established manufacturers scaling into new markets."},
    {year:"20+",label:"Active OEM Partnerships",desc:"Long-term partnerships across India. Several maintained continuously for over a decade — because shared expertise is a competitive advantage."},
    {year:"2",label:"Patents Granted",desc:"Granted patents in advanced medical device technology, with additional applications under examination by Indian Patent Office."},
    {year:"ISO",label:"Dual Certified",desc:"ISO 9001:2015 quality management and ISO 13485:2016 medical device quality management — both maintained under a unified system."},
    {year:"<0.10%",label:"Customer Complaint Rate",desc:"A reflection of our quality discipline built over 29 years and a number our team takes personal pride in maintaining."},
  ];

  return (
    <section id="glance" className="section" style={{background:"var(--bg)"}}>
      <div className="container">
        <FadeUp style={{textAlign:"center",marginBottom:"4.5rem"}}>
          {/* <span className="pill" style={{marginBottom:"1.25rem",display:"inline-flex"}}><span className="dot"/>At A Glance</span> */}
          <span className="" style={{marginBottom:"1rem",display:"inline-flex",color:"#445793", fontWeight:700}}>At A Glance</span>
          <h2 className="cg" style={{fontSize:"1.8rem",fontWeight:700,color:"var(--text)",lineHeight:1.15}}>
            The AESPL<br/><em style={{color:"var(--brand)", fontStyle:"normal"}}>Track Record</em>
          </h2>
        </FadeUp>

        {/* Timeline */}
        <div style={{position:"relative",maxWidth:860,margin:"0 auto"}}>
          <div style={{position:"absolute",left:120,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,var(--brand),var(--brand-light))",borderRadius:2}}/>
          <div style={{display:"flex",flexDirection:"column",gap:"0.25rem"}}>
            {timeline.map((t,i)=>{
              const ref=useRef(null); const inView=useInView(ref,{once:true});
              return (
                <motion.div key={i} ref={ref}
                  initial={{opacity:0,x:-24}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{duration:0.55,delay:i*0.07}}
                  style={{display:"flex",gap:"2.5rem",alignItems:"flex-start",padding:"1.1rem 0"}}>
                  <div style={{width:108,textAlign:"right",flexShrink:0}}>
                    <span className="cg" style={{fontSize:"1.5rem",fontWeight:700,color:"var(--brand)"}}>{t.year}</span>
                  </div>
                  <div style={{width:14,height:14,borderRadius:"50%",background:"var(--brand)",border:"3px solid var(--bg)",boxShadow:"0 0 0 2px var(--brand)",flexShrink:0,marginTop:"0.45rem"}}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:"1rem",color:"var(--text)",marginBottom:"0.3rem"}}>{t.label}</div>
                    <div style={{fontSize:"0.875rem",color:"var(--muted)",lineHeight:1.7}}>{t.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <FadeUp delay={0.2} style={{marginTop:"5rem"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.1rem"}}>
            {[
              {title:"ISO 9001:2015",desc:"Quality Management System"},
              {title:"ISO 13485:2016",desc:"Medical Device Quality Management System"},
              {title:"IEC 60601-1-2",desc:"Electromagnetic Compatibility for Medical Electrical Equipment"},
              {title:"IEC 61000-4-2",desc:"Electrostatic Discharge Immunity — Scanner Card"},
              {title:"ESD, EFT & Surge Testing",desc:"Safety-critical medical and industrial applications"},
              {title:"DPIIT Recognized",desc:"Startup India (2022) — Innovation in ventilator technology"},
            ].map((c,i)=>{
              const ref=useRef(null); const inView=useInView(ref,{once:true});
              return (
                <motion.div key={i} ref={ref}
                  initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
                  transition={{delay:i*0.06}}
                  whileHover={{borderColor:"var(--brand)",background:"var(--brand-light)"}}
                  style={{display:"flex",gap:"1rem",alignItems:"flex-start",padding:"1.2rem 1.4rem",border:"1px solid var(--border)",borderRadius:12,background:"var(--surface)",cursor:"default",transition:"all 0.25s"}}>
                  <div style={{width:34,height:34,borderRadius:8,background:"var(--brand)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",flexShrink:0,fontWeight:700}}>✓</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.88rem",color:"var(--text)"}}>{c.title}</div>
                    <div style={{fontSize:"0.77rem",color:"var(--muted)",marginTop:"0.2rem"}}>{c.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — TEAM
═══════════════════════════════════════════════════════════════════════════ */
const TeamSection = () => {
  const team = [
    {name:"Akshay Kharche",role:"Managing Director",note:"Engineer by background, operator by experience",img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"},
    {name:"Aparna Kharche",role:"Managing Director",note:"Co-founder, operations & quality leadership",img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"},
    {name:"Design Team",role:"Hardware & PCB Design",note:"Schematic to layout, fully in-house",img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"},
    {name:"Firmware Team",role:"Embedded Software",note:"Real-time, safety-critical firmware",img:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"},
  ];
  return (
    <section id="team" className="section" style={{background:"var(--surface)"}}>
      <div className="container">
        <FadeUp style={{marginBottom:"4rem"}}>
          <div style={{display:"flex",gap:"4rem",flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:"1 1 360px"}}>
              <span className="pill" style={{marginBottom:"1.25rem",display:"inline-flex"}}><span className="dot"/>Our Team</span>
              <h2 className="cg" style={{fontSize:"clamp(2rem,2vw,3rem)",fontWeight:700,color:"var(--text)",lineHeight:1.15}}>
                The People Who<br/><em style={{color:"var(--brand)", fontStyle:"normal"}}>Make Your Product.</em>
              </h2>
            </div>
            <div style={{flex:"1 1 340px"}}>
              <p style={{color:"var(--muted)",lineHeight:1.85}}>AESPL is led by Managing Directors Akshay Kharche and Aparna Kharche — engineers by background, operators by experience — supported by a multidisciplinary team spanning design, firmware, production, quality assurance, testing, and operations.</p>
            </div>
          </div>
        </FadeUp>

        {/* Team grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem",marginBottom:"3.5rem"}}>
          {team.map((m,i)=>{
            const ref=useRef(null); const inView=useInView(ref,{once:true});
            return (
              <motion.div key={i} ref={ref}
                initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
                transition={{duration:0.6,delay:i*0.1}}
                whileHover={{y:-6,boxShadow:"0 16px 48px rgba(68,87,147,0.12)"}}
                style={{borderRadius:16,overflow:"hidden",border:"1px solid var(--border)",background:"var(--bg)",cursor:"default"}}>
                <div style={{aspectRatio:"1",overflow:"hidden"}}>
                  <img src={m.img} alt={m.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s"}}
                    onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                </div>
                <div style={{padding:"1.25rem"}}>
                  <div style={{fontWeight:700,fontSize:"1rem",color:"var(--text)"}}>{m.name}</div>
                  <div style={{fontSize:"0.8rem",color:"var(--brand)",fontWeight:600,marginTop:"0.2rem"}}>{m.role}</div>
                  <div style={{fontSize:"0.77rem",color:"var(--muted)",marginTop:"0.35rem"}}>{m.note}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Integration callout */}
        <FadeUp delay={0.2}>
          <div style={{background:"var(--brand-light)",border:"1px solid var(--border)",borderRadius:16,padding:"2.5rem",display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"center"}}>
            <div style={{fontSize:"3rem",flexShrink:0}}>🤝</div>
            <div style={{flex:1}}>
              <h3 style={{fontSize:"1.2rem",fontWeight:700,color:"var(--text)",marginBottom:"0.75rem"}}>Our Team's Greatest Strength Is Integration.</h3>
              <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:"0.9rem"}}>The hardware engineer and the firmware developer work side by side. The production team and the quality team are in constant communication. When your project comes to AESPL, it isn't handed off between departments — it's owned collectively, from first meeting to final delivery. That culture of shared ownership is what keeps our quality numbers where they are.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — CTA
═══════════════════════════════════════════════════════════════════════════ */
const CTASection = () => (
  <section id="cta" className="section" style={{background:"var(--brand)",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"-40%",right:"-10%",width:"50vw",height:"50vw",background:"rgba(255,255,255,0.04)",borderRadius:"50%"}}/>
    <div style={{position:"absolute",bottom:"-30%",left:"-5%",width:"30vw",height:"30vw",background:"rgba(255,255,255,0.04)",borderRadius:"50%"}}/>
    <div className="container" style={{textAlign:"center",position:"relative",zIndex:2}}>
      <FadeUp>
        <div className="mono" style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.55)",letterSpacing:"0.2em",marginBottom:"1.5rem"}}>READY TO WORK WITH US?</div>
        <h2 className="cg" style={{fontSize:"1.8rem",fontWeight:700,color:"#fff",lineHeight:1.1,marginBottom:"1.5rem",maxWidth:700,margin:"0 auto 1.5rem"}}>
          Ready to Work With an Embedded Partner<br/><em style={{fontStyle:"normal",opacity:0.85}}>Who Gets It?</em>
        </h2>
        <p style={{color:"rgba(255,255,255,0.72)",lineHeight:1.85,fontSize:"1rem",maxWidth:560,margin:"0 auto 3rem"}}>
          We have spent 29 years building the kind of embedded systems expertise that OEMs can rely on not just for delivery, but for the long term. If you have a product that needs the right embedded foundation, let's talk.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:"1rem",flexWrap:"wrap"}}>
          <button style={{padding:"1rem 2.5rem",background:"#fff",color:"var(--brand)",border:"none",borderRadius:10,fontWeight:700,fontSize:"0.9rem",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:"0 6px 28px rgba(0,0,0,0.18)",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.target.style.transform="translateY(-3px)";e.target.style.boxShadow="0 10px 40px rgba(0,0,0,0.25)";}}
            onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 6px 28px rgba(0,0,0,0.18)";}}>Contact Our Engineers</button>
          <button style={{padding:"1rem 2.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:10,fontWeight:600,fontSize:"0.9rem",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.target.style.background="rgba(255,255,255,0.1)";e.target.style.borderColor="rgba(255,255,255,0.7)";}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.borderColor="rgba(255,255,255,0.4)";}}>Download Company Profile</button>
        </div>
      </FadeUp>
    </div>
  </section>
);

/* ─── FOOTER ───────────────────────────────────────────────────────────── */
// const Footer = () => (
//   <footer style={{background:"#0f1220",padding:"2.5rem 2.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem"}}>
//     <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
//       <div style={{width:36,height:36,borderRadius:8,background:"var(--brand)",display:"flex",alignItems:"center",justifyContent:"center"}}>
//         <span className="mono" style={{fontSize:"0.7rem",fontWeight:700,color:"#fff"}}>AE</span>
//       </div>
//       <div>
//         <div style={{fontWeight:700,fontSize:"0.9rem",color:"#fff"}}>Akshay Embedded Systems Pvt. Ltd.</div>
//         <div style={{fontSize:"0.68rem",color:"#6b7280",marginTop:"0.1rem"}}>Pune, India · Since 1995</div>
//       </div>
//     </div>
//     <div style={{display:"flex",gap:"0.6rem",flexWrap:"wrap"}}>
//       {["ISO 9001:2015","ISO 13485:2016","DPIIT Recognized","2 Patents"].map(b=>(
//         <span key={b} className="mono" style={{fontSize:"0.58rem",color:"rgb(68,87,147)",letterSpacing:"0.05em",border:"1px solid rgba(68,87,147,0.35)",padding:"0.28rem 0.65rem",borderRadius:4}}>{b}</span>
//       ))}
//     </div>
//     <div style={{fontSize:"0.72rem",color:"#4b5563"}}>© 2024 AESPL. All rights reserved.</div>
//   </footer>
// );

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function AboutUs() {
  return (
    <>
      <FontLoader />
      <GlobalStyles />
      {/* <Navbar /> */}
      <main>
        <Hero />
        <StorySection />
        <DifferenceSection />
        <PatentsSection />
        <GlanceSection />
        {/* <TeamSection /> */}
        <CTASection />
      </main>
      {/* <Footer /> */}
    </>
  );
}