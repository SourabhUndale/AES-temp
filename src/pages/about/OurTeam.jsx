import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const OurTeam = () => {
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
     const team = [
    {name:"Akshay Kharche",role:"Technical Director",note:"Engineer by background, operator by experience",img:"./assets/images/aboutPage/t-1.jpg"},
    {name:"Aparna Kharche",role:"Managing Director",note:"Co-founder, operations & quality leadership",img:"./assets/images/aboutPage/t-2.jpg"},
    {name:"Abhay Nande",role:"General Manager",note:"Schematic to layout, fully in-house",img:"./assets/images/aboutPage/t-3.jpg"},
    {name:"Hanumant Tormal",role:"Production Head",note:"Real-time, safety-critical firmware",img:"./assets/images/aboutPage/t-4.jpg"},
    {name:"Rushabh Bawne",role:"Design and Development Engineer",note:"Real-time, safety-critical firmware",img:"./assets/images/aboutPage/t-5.jpg"},
    {name:"Akshay Irkar",role:"Design and Development Engineer",note:"In-house production for quality control",img:"./assets/images/aboutPage/t-6.jpg"},
  ];
  return (
    <section id="team" className="section" style={{background:"var(--surface)", marginTop:"6.5rem"}}>``
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
                  <p style={{color:"var(--muted)",lineHeight:1.85}}>AESPL is led by Managing Directors Akshay Kharche and Aparna Kharche engineers by background, operators by experience supported by a multidisciplinary team spanning design, firmware, production, quality assurance, testing, and operations.</p>
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
                      <img src={m.img} alt={m.name} style={{width:"100%",height:"100%",objectFit:"contain",transition:"transform 0.4s"}}
                        onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                    </div>
                    <div style={{padding:"1.25rem"}}>
                      <div style={{fontWeight:700,fontSize:"1rem",color:"var(--text)"}}>{m.name}</div>
                      <div style={{fontSize:"0.8rem",color:"var(--muted)",marginTop:"0.2rem"}}>{m.role}</div>
                      {/* <div style={{fontSize:"0.77rem",color:"var(--muted)",marginTop:"0.35rem"}}>{m.note}</div> */}
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
                  <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:"0.9rem"}}>The hardware engineer and the firmware developer work side by side. The production team and the quality team are in constant communication. When your project comes to AESPL, it isn't handed off between departments it's owned collectively, from first meeting to final delivery. That culture of shared ownership is what keeps our quality numbers where they are.</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
  )
}

export default OurTeam