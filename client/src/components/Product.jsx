import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Ensure installed
import {Link} from "react-router-dom";
import axios from 'axios'
import pipe1 from "../assets/pipe1.jpg";
import cover1 from "../assets/cover1.jpg";
import pipe2 from "../assets/pipe2.jpg";
import tank1 from "../assets/tank1.jpg";
import pipe3 from "../assets/pipe3.jpg";
import cover2 from "../assets/cover2.jpg";
import pipe4 from "../assets/pipe4.jpg";
import tank2 from "../assets/tank2.jpg";




function Product() {


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [mail,setMail]=useState("");
  const [id,setId]=useState("");
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [reviews,setReviews]= useState([]);
  const [number,setNumber]=useState("");
  const [products, setProducts] = useState([]);

  const handleReviewToggle = () => {
    setShowReview(!showReview);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/8/All/All");
        const data = response.data; // ✅ axios returns parsed JSON
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  const handleShow = async (product) => {
    setId(product._id)
    const response= await axios.get(`/reviews/${product._id}`);
    console.log(response.data.message);
    setReviews(response.data || []);
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
  };

  const sendMail= async()=>{
    if(username && mail && number && id){
      const mailOptions = {
        name:username,
        email: mail,
        mobile: number,
        id:id
      }
      console.log(mailOptions)
      const response= await axios.post("/send-email",mailOptions);
      console.log(response.data);
      alert("Mail Sent Sucessfully")
    }
    else{
      alert("Please fill all the fields")
    }
    
  }


  const handleReviewSubmit= async (product)=>{
    if(id && rating && feedback && name){
      console.log(name);
      const review={
      id:id,
      rating:rating,
      feedback:feedback,
      name:name
    }

    const response= await axios.post("/review/",review);
    alert(response.data.message);
    setShowReview(false);
    handleShow(product)
    }
    else{
      alert("Fill The necessary Details")
    }

  }

  return (
    <div className="container py-5 bg-transparent">
      <h2 className="text-center fw-bold mb-5">Our Products</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.length>0 ? products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card shadow-sm p-2 bg-dark bg-opacity-50 text-white h-100">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top rounded"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                {/* <p className="card-text">{product.description}</p> */}
                <p className="card-text">{`Category: ${product.category}`}</p>
                <button
                  className="btn btn-outline-warning mt-auto"
                  onClick={() => handleShow(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )) : "Loading"}
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="xl">
      {selectedProduct && (
        <Modal.Body className="d-flex flex-wrap p-4">
          <div className="col-md-5 text-center">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="img-fluid rounded mb-3"
              style={{ height: "180px", objectFit: "cover" }}
            />
            <h5 className="fw-bold">{selectedProduct.title}</h5>
            <p className="mb-1"><strong>{selectedProduct.price}</strong></p>
            <p className="mb-1">
              Sold By – <span className="text-primary">{selectedProduct.soldBy}</span>
            </p>
            <p className="mb-1">Size: {selectedProduct.size}</p>
            <p className="mb-1">Shape: {selectedProduct.shape}</p>
            <p className="mb-1">Pipe Type: {selectedProduct.type}</p>
          </div>

          <div className="col-md-7 px-4">
            <h5 className="mb-3">
              <strong>Get Best Quote</strong> and details from{" "}
              <span className="text-primary">"{selectedProduct.soldBy}"</span>
            </h5>

            <div className="row">
              {/* Mobile Number */}
              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label fw-bold">
                  Name
                </label>
                <div className="input-group mb-3">
                  
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your Name"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label fw-bold">
                  Mobile Number
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text">+91</span>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter your mobile"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-bold">
                  Email Address
                </label>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <p className="text-muted">We will contact you on the provided details</p>
            
            <div className="d-flex gap-2">
              <button onClick={sendMail} className="btn btn-success mt-2">
                Submit Now
              </button>
              <div onClick={handleReviewToggle} className="btn btn-outline-primary mt-2">
                {showReview ? "Cancel Review" : "Review Product"}
              </div>
            </div>

            {showReview ? (
              <div className="mt-4">
                <label className="form-label fw-bold">Rate this Product</label>
                <div className="mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        fontSize: "1.5rem",
                        cursor: "pointer",
                        color: star <= rating ? "#ffc107" : "#e4e5e9",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="nameInput">Enter Your Name</label>
                <input type="text" className="form-control" id="nameInput" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}/>

                </div>

                <label className="form-label fw-bold">Your Feedback</label>

                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Write your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>

                <button onClick={()=>{handleReviewSubmit(selectedProduct)}} className="btn btn-outline-primary mt-2">
                  Submit
                </button>
              </div>
            ) :   
            <div
              className="mt-3"
              style={{
                maxHeight: '200px', // Adjust height for 3 items approx
                overflowY: reviews.length > 3 ? 'auto' : 'visible',
              }}
            >
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div className="mb-3" key={index}>
                    <p className="mb-0">{review.name}</p>
                    <p className="fw-bold mb-1">{review.rating}/5</p>
                    <p className="mb-0">{review.feedback}</p>
                    <hr className="my-2 border-secondary opacity-50" />

                  </div>
                  
                ))
              ) : (
                <p className="text-muted">No Reviews</p>
              )}
            </div>

            // ""
          
            }

          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>


      {/* Explore More Button */}
      {/* <div className="text-center mt-5">
        <Link to="/explore/All" className="btn btn-warning text-white fw-bold">EXPLORE MORE</Link>
      </div> */}
      <div className="text-center mt-5">
  <Link
    to="/explore/All"
    className="btn btn-warning text-white fw-bold"
    style={{
      animation: "pulse 1.5s infinite",
      display: "inline-block",
    }}
  >
    EXPLORE MORE
  </Link>

  {/* Animation keyframes */}
  <style>
    {`
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `}
  </style>
</div>

    </div>
  );
}

export default Product;




