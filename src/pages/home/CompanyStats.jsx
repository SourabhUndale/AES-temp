import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    number: "29+",
    text: "Years Engineering Custom Embedded Solutions"
  },
  {
    number: "100+",
    text: "Embedded Products Successfully Delivered"
  },
  {
    number: "20+",
    text: "OEM Partners Across India"
  },
  {
    number: "2",
    text: "Patents in Medical Electronics"
  }
];

const CompanyStats = () => {
  return (
    <section className="py-5 bg-white">

      <div className="container">

        <div className="row text-center">

          {stats.map((item, index) => (

            <motion.div
              className="col-6 col-lg-3 mb-4"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 style={{fontWeight:"700"}}>
                {item.number}
              </h2>

              <p className="text-muted">
                {item.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default CompanyStats;