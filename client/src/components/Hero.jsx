





import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const letter = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function Hero({ setDisplay }) {
  useEffect(() => {
    setDisplay(false);
  }, []);

  return (
    <div className="container-fluid py-5" style={{
      backgroundColor: "transparent",
      minHeight: "100vh",
      paddingTop: "80px",
      position: "relative",
      zIndex: "1"
    }}>
      <div className="container mt-2">
        <div className="row">
          <div className="col-12 col-md-10 col-lg-8">

            {/* Animated Heading */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="d-flex flex-wrap"
            >
              {"Strong Foundations,".split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  style={{
                    whiteSpace: 'pre',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    color: '#1f2937',
                    fontWeight: 700
                  }}>
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="d-flex flex-wrap"
            >
              {"Lasting Solutions".split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  style={{
                    whiteSpace: 'pre',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    color: '#1f2937',
                    fontWeight: 700
                  }}>
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subheading */}
            <motion.p
              className="fs-5 mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                color: "#ffffff",
                textShadow: "0px 1px 3px rgba(0, 0, 0, 0.5)"
              }}>
              RCC Cement Pipe and Cement Product Industry
            </motion.p>

            {/* CTA Button */}
            <Link to="/explore/All">
              <motion.div
                className="btn py-2 px-3 mb-5"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                  backgroundColor: "#f59e0b",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "4px",
                  border: "none"
                }}>
                VIEW OUR PRODUCTS
              </motion.div>
            </Link>

            {/* Divider */}
            <div className="border-top my-4 opacity-50" style={{ maxWidth: "100%", borderColor: "white" }}></div>

            {/* Why Choose Us Section */}
            <motion.div
              className="mt-4 mb-5 p-4 rounded"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}>
              <h5 className="fw-bold mb-4" style={{
                color: "white",
                textShadow: "0px 1px 3px rgba(0, 0, 0, 0.7)"
              }}>
                Why Choose Us?
              </h5>

              <div className="row">
                {[
                  "Premium quality materials for durability",
                  "Industry-leading standards",
                  "Expert engineering solutions",
                  "Timely delivery and installation"
                ].map((text, index) => (
                  <motion.div
                    className="col-12 col-md-6 mb-3"
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <span className="d-flex align-items-center justify-content-center rounded-circle" style={{
                          backgroundColor: "#f59e0b",
                          width: "24px",
                          height: "24px",
                          color: "white"
                        }}>
                          <i className="bi bi-check-lg"></i>
                        </span>
                      </div>
                      <p className="mb-0" style={{
                        color: "white",
                        textShadow: "0px 1px 3px rgba(0, 0, 0, 0.7)",
                        fontWeight: "500"
                      }}>
                        {text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}



