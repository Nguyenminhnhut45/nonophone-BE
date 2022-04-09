import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { createProducts } from "../../Redux/actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../Redux/constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const toastObj = {
  pauseOnfocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Create Product success ", toastObj);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setname("");
      setdescription("");
      setimage("");
      setprice(0);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProducts(name, price, description, image));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Back to list
            </Link>
            <h2 className="content-title">Create Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Price"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Description"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Picture</label>
                    <input
                      className="form-control"
                      type="text"
                      value={image}
                      onChange={(e) => setimage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
