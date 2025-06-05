import React, { useState,useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
// Sample product list
import Footer from "./Footer";
const ExploreMore = ({searchProduct,setDisplay}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mail,setMail]=useState("");
  const [id,setId]=useState("");
  const [name, setName] = useState("");
  const [number,setNumber]=useState("");
  const [show, setShow] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reviews,setReviews]= useState([]);
    const [username, setUserName] = useState("");

  const { defaultCategory } = useParams();
  const [category, setCategory] = useState(defaultCategory || "All");
  const [products, setProducts] = useState([]);

      useEffect(() => {
        setDisplay(true);
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/products/10/${category}/${searchProduct || "All"}`);
            const data = response.data; // ✅ axios returns parsed JSON
            console.log(data);
            setProducts(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        
        fetchData();
      }, [category,searchProduct]);

      useEffect(() => {
        setCategory(defaultCategory || "All");
      }, [defaultCategory]);

      const handleReviewToggle = () => {
        setShowReview(!showReview);
      };
      const handleShow = async (product) => {
        setId(product._id)
        const response= await axios.get(`http://localhost:5000/reviews/${product._id}`);
        console.log(response.data.message);
        setReviews(response.data || []);
        setSelectedProduct(product);
        setShow(true);
      };

      

      const handleReviewSubmit= async (product)=>{
        if(id && rating && feedback && name){
          console.log(name);
          const review={
          id:id,
          rating:rating,
          feedback:feedback,
          name:name
        }

    const response= await axios.post("http://localhost:5000/review/",review);
    alert(response.data.message);
    setShowReview(false);
    handleShow(product)
    }
    else{
      alert("Fill The necessary Details")
    }

  }
    
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
      const response= await axios.post("http://localhost:5000/send-email",mailOptions);
      console.log(response.data);
      alert("Mail Sent Sucessfully")
    }
    else{
      alert("Please fill all the fields")
    }
    
  }
  return (
    <div className="">

      <div className="container py-5 bg-transparent">
  <div className="my-5 d-flex justify-content-start">
    <select
      className="form-select w-100 w-md-25 bg-dark bg-opacity-50 text-white border-0"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All" style={{ backgroundColor: '#343a40', color: 'white' }}>All</option>
      <option style={{ backgroundColor: '#343a40', color: 'white' }} value="Septic Tank">Septic Tank</option>
      <option style={{ backgroundColor: '#343a40', color: 'white' }} value="Cement Pipe">Cement Pipe</option>
      <option style={{ backgroundColor: '#343a40', color: 'white' }} value="Manhole Cover">Manhole Cover</option>
    </select>
  </div>

  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
    {products.length > 0 ? products.map((product) => (
      <div className="col" key={product.id}>
        <div className="card h-100 text-white shadow-sm bg-dark bg-opacity-50 p-2">
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top rounded"
            style={{ height: "180px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.title}</h5>
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
        <div className="col-12 col-md-5 text-center">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="img-fluid rounded mb-3"
            style={{ height: "180px", objectFit: "cover", width: "100%" }}
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

        <div className="col-12 col-md-7 px-3 mt-4 mt-md-0">
          <h5 className="mb-3">
            <strong>Get Best Quote</strong> and details from{" "}
            <span className="text-primary">"{selectedProduct.soldBy}"</span>
          </h5>



          <div className="row">

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

          <div className="d-flex flex-wrap gap-2">
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
                <input type="text" className="form-control" id="nameInput" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <label className="form-label fw-bold">Your Feedback</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>

              <button onClick={() => { handleReviewSubmit(selectedProduct) }} className="btn btn-outline-primary mt-2">
                Submit
              </button>
            </div>
          ) : (
            <div
              className="mt-3"
              style={{
                maxHeight: '200px',
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
          )}
        </div>
      </Modal.Body>
    )}
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</div>

      <Footer />
    </div>
  );
};

export default ExploreMore;
