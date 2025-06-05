// // import React from "react";
// // // import "./HomePage.css"; // Optional for custom styles
// // import bgImage from "./assets/background.jpg"; // Adjust path

// // import Navbar from "./components/Navbar";
// // import Hero from "./components/Hero";
// // import Product from "./components/Product";
// // function App() {
// //   return (
// //     <div
// //       className="text-white"
// //       style={{
// //         backgroundImage: `url(${bgImage})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundAttachment: "fixed",
// //       }}
// //     >
// //       {/* Fixed Navbar */}
// //       <div className="position-fixed top-0 w-100 z-3">
// //         <Navbar />
// //       </div>

// //       {/* Hero Section */}
// //       <section
// //         className="d-flex justify-content-center align-items-center vh-100"
// //         style={{ paddingTop: "80px" }} // adjust if Navbar height is different
// //       >
// //         <Hero />
// //       </section>

// //       {/* Products Section */}
// //       <section className="py-5 bg-transparent">
// //         <Product />
// //       </section>
// //     </div>
// //   );
// // }



// // // Add hover effect using CSS in the component
// // const styles = `
// //   .nav-link:hover .dropdown-menu {
// //     display: block !important;
// //   }
// //   .dropdown-column {
// //     display: flex;
// //     flex-direction: column;
// //     width: 25%;
// //   }
// //   .dropdown-column p {
// //     font-size: 0.9rem;
// //     color: #333;
// //   }
// //   .dropdown-menu a {
// //     font-size: 0.9rem;
// //     text-decoration: none;
// //   }
// //   .dropdown-menu a:hover {
// //     text-decoration: underline;
// //   }
// //   .form-control:focus {
// //     border-color: #333;
// //     box-shadow: none;
// //   }
// //   .btn-outline-dark {
// //     border-color: #333;
// //     color: #333;
// //   }
// //   .btn-outline-dark:hover {
// //     background-color: #333;
// //     color: #fff;
// //   }
// // `;

// // // Inject styles into the document
// // const styleSheet = document.createElement("style");
// // styleSheet.type = "text/css";
// // styleSheet.innerText = styles;
// // document.head.appendChild(styleSheet);

// // export default App;


// import React,{useState,useEffect} from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import bgImage from "./assets/background.jpg";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Product from "./components/Product";
// import ExploreMore from "./components/ExploreMore";
// import Footer from "./components/Footer";
// import Aboutus from "./components/Aboutus";

// function App() {
//   const [searchProduct,setSearchProduct]=useState("All");
//   return (
//     <Router>
//       <div
//         className="text-white"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         {/* Fixed Navbar */}
//         <div className="position-fixed top-0 w-100 z-3">
//           <Navbar setSearchProduct={setSearchProduct}/>
//         </div>

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <section
//                   className="d-flex justify-content-center align-items-center vh-100"
//                   style={{ paddingTop: "80px" }}
//                 >
//                   <Hero />
//                 </section>
//                 <section className="py-5 bg-transparent">
//                   <Product />
//                 </section>
//                 <section>
//                   <Footer />
//                 </section>
//                 <section>
//                   <Aboutus />
//                 </section>
//               </>
//             }
//           />
//           <Route path="/explore/:defaultCategory" element={<ExploreMore searchProduct={searchProduct}/>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // Add hover effect using CSS in the component
// const styles = `
//   .nav-link:hover .dropdown-menu {
//     display: block !important;
//   }
//   .dropdown-column {
//     display: flex;
//     flex-direction: column;
//     width: 25%;
//   }
//   .dropdown-column p {
//     font-size: 0.9rem;
//     color: #333;
//   }
//   .dropdown-menu a {
//     font-size: 0.9rem;
//     text-decoration: none;
//   }
//   .dropdown-menu a:hover {
//     text-decoration: underline;
//   }
//   .form-control:focus {
//     border-color: #333;
//     box-shadow: none;
//   }
//   .btn-outline-dark {
//     border-color: #333;
//     color: #333;
//   }
//   .btn-outline-dark:hover {
//     background-color: #333;
//     color: #fff;
//   }
// `;

// // Inject styles into the document
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);

// export default App;


import React, { useState, useEffect,useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bgImage from "./assets/background.jpg";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import ExploreMore from "./components/ExploreMore";
import Footer from "./components/Footer";
import Aboutus from "./components/Aboutus";

function App() {
  const [searchProduct, setSearchProduct] = useState("All");
  const [displaySearch,setDisplay]=useState(false);
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Router>
      <div
        className="text-white"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Fixed Navbar */}
        <div className="position-fixed top-0 w-100 z-3">
          <Navbar setSearchProduct={setSearchProduct} displaySearch={displaySearch} scrollToFooter={scrollToFooter}/>
        </div>

        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <section
                  className="d-flex justify-content-center align-items-center vh-100"
                  style={{ paddingTop: "120px" }}
                >
                  <Hero setDisplay={setDisplay}/>
                </section>
                <section className="bg-transparent">
                  <Product/>
                </section>
                <section>
                  <Footer footerRef={footerRef}/>
                </section>
              </>
            }
          />

          {/* About Us Page Route */}
          <Route
            path="/about"
            element={
              <div style={{ paddingTop: "100px" }} className="container py-5" >
                <Aboutus />
                <section>
                  <Footer footerRef={footerRef}/>
                </section>
              </div>
              
            }
          />

          {/* Product Explore Route */}
          <Route
            path="/explore/:defaultCategory"
            element={<ExploreMore searchProduct={searchProduct} setDisplay={setDisplay} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

// Add hover effect using CSS in the component
const styles = `
  .nav-link:hover .dropdown-menu {
    display: block !important;
  }
  .dropdown-column {
    display: flex;
    flex-direction: column;
    width: 25%;
  }
  .dropdown-column p {
    font-size: 0.9rem;
    color: #333;
  }
  .dropdown-menu a {
    font-size: 0.9rem;
    text-decoration: none;
  }
  .dropdown-menu a:hover {
    text-decoration: underline;
  }
  .form-control:focus {
    border-color: #333;
    box-shadow: none;
  }
  .btn-outline-dark {
    border-color: #333;
    color: #333;
  }
  .btn-outline-dark:hover {
    background-color: #333;
    color: #fff;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;
