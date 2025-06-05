import React from "react";
import { motion } from "framer-motion";
import pipeImage from "../assets/cover2.jpg";

function Aboutus() {
  return (
    <div
      className="text-white"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="w-100 h-100" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="container">
          {/* Text + Image Section */}
          <motion.div
            className="row rounded shadow p-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {/* Text */}
            <div className="col-md-7 mb-3">
              <motion.h2
                className="fw-bold mb-3"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                About Us
              </motion.h2>
              <motion.h4
                className="fw-bold text-warning"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Morya Spun Pipe Industries
              </motion.h4>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                Established in <strong>2012</strong> in <strong>Pune</strong>, we are a trusted
                manufacturer of premium RCC and cement-based infrastructure products. With over a
                decade of experience, our products are known for durability, precision, and
                reliability.
              </motion.p>
              <motion.h5
                className="fw-bold mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Our Products
              </motion.h5>
              <motion.ul
                className="list-unstyled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <li>🔸 RCC Cement Pipes (NP2 & NP3)</li>
                <li>🔸 Septic Tanks</li>
                <li>🔸 Chambers & Manhole Covers</li>
                <li>🔸 Custom Cement Solutions</li>
              </motion.ul>
            </div>

            {/* Image with subtle zoom animation */}
            <motion.div
              className="col-md-5 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <img
                src={pipeImage}
                alt="RCC Pipes"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </motion.div>
          </motion.div>

          {/* Feature Boxes with Continuous Animations */}
          <div className="row text-center mt-5">
            {/* Quality */}
            <motion.div
              className="col-md-4 mb-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="p-4 h-100 rounded"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <h5>🔧 Quality</h5>
                <p className="small">Built to meet and exceed standards</p>
              </div>
            </motion.div>

            {/* Reliability */}
            <motion.div
              className="col-md-4 mb-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="p-4 h-100 rounded"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <h5>🛡️ Reliability</h5>
                <p className="small">Trusted performance across projects</p>
              </div>
            </motion.div>

            {/* Trust */}
            <motion.div
              className="col-md-4 mb-3"
              animate={{ scale: [1, 1.07, 1], opacity: [1, 0.9, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="p-4 h-100 rounded"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.2)",
                }}
              >
                <h5>🤝 Trust</h5>
                <p className="small">Backed by a decade of client confidence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
