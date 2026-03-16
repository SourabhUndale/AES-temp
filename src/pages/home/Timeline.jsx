// import React from "react";
// import { motion } from "framer-motion";
// import "./Timeline.css";

// const containerVariant = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.3,
//     },
//   },
// };

// const itemVariant = {
//   hidden: { opacity: 0, y: 80 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const Timeline = () => {
//   return (
//     <section className="timeline-section">
//       <div className="timeline-container">
//         <div className="timeline-header">
//           <h1>Launch Your Dream Website in Three Steps</h1>
//           <p>
//             Embark on a streamlined journey to bring your online presence to
//             life with our simple, three-stage process.
//           </p>
//         </div>

//         <motion.div
//           className="timeline"
//           variants={containerVariant}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.2 }}
//         >
//           <div className="timeline-line"></div>

//           {[2011, 2, 3].map((step) => (
//             <motion.div
//               className="timeline-item"
//               key={step}
//               variants={itemVariant}
//             >
//               <div className="timeline-number">{step}</div>

//               <div className="timeline-content">
//                 <h2>
//                   {step === 2011 && "Plan & Design Your Vision"}
//                   {step === 2 && "Develop & Build Your Site"}
//                   {step === 3 && "Launch & Grow Your Presence"}
//                 </h2>
//                 <p>
//                   Define your strategy, build your solution, and scale your
//                   digital success with a structured modern workflow.
//                 </p>
//               </div>

//               <div className="timeline-image">
//                 <div className="modern-card">Step {step}</div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Timeline;





import React from "react";
import { motion } from "framer-motion";
import "./Timeline.css";

const steps = [
  {
    id: "2022",
    title: "Custom Embedded Hardware Design",
    desc: "Precision circuit design, signal conditioning, sensor interfacing, power electronics, and microcontroller architecture - tailored to your exact application.",
    img: "https://images.unsplash.com/photo-1555589228-135c25ae8cf5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2023",
    title: "Planning & Strategy",
    desc: "A structured roadmap is created to ensure smooth execution and successful delivery.",
    img: "https://images.unsplash.com/photo-1724058990418-2094bfce85bb?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2024",
    title: "Design & Development",
    desc: "Our team builds scalable, modern, and high-performance solutions tailored to your needs.",
    img: "https://images.unsplash.com/photo-1661112586578-e3e33763c6b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2025",
    title: "Testing & Launch",
    desc: "We ensure quality assurance and launch your product with complete confidence.",
    img: "https://images.unsplash.com/photo-1724770388447-30b015a5cbb6?q=80&w=739&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Timeline = () => {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-header">
        <h2>Our Process</h2>
        <p>
          A structured and strategic approach to deliver exceptional digital
          solutions.
        </p>
      </div>

      <div className="timeline">
        {steps.map((step, index) => (
          <motion.div
            className={`timeline-item ${index % 2 !== 0 ? "reverse" : ""}`}
            key={step.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Image Section */}
            <div className="timeline-image">
              <img src={`${step.img}?auto=format&fit=crop&w=600&q=60`} alt="" />
              <div className="step-badge">{step.id}</div>
            </div>

            {/* Content */}
            <div className="timeline-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}

        <div className="center-line"></div>
      </div>
    </div>
  );
};

export default Timeline;