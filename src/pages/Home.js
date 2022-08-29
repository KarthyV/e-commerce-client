import React from "react";
import "../styles/Home.css";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import { useEffect } from "react";
import { getAllProducts } from "../redux/actions/productAction";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { updateUser } from "../redux/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllProducts());
    if (user) dispatch(updateUser(user._id));
  }, [dispatch]);
  const { products, loading } = useSelector((state) => state.products);

  if (products.length < 1) return <Loading />;
  return (
    <div>
      <img
        src="https://img.freepik.com/free-vector/world-gadgets-set_1284-20049.jpg?w=996&t=st=1661693437~exp=1661694037~hmac=54726e26174e6d06f2a45cd26dac684c8ed16e3d9ba9110d1fa763a4edb99cef"
        className="home-banner"
        alt="home banner"
      />
      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {products.slice(0, 4).map((product) => (
            <ProductPreview key={product._id} product={product} />
          ))}
        </div>
        <div>
          <Link
            to="/products/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      <div className="sale__banner--container mt-4">
        <img
          alt="on sale"
          src="https://img.freepik.com/free-psd/colorful-discount-sale-podium_125755-675.jpg?w=1380&t=st=1661693694~exp=1661694294~hmac=1298744361751f98aeb37d4009fa316bb57a3ccbd8053dfd4cbdb2e2df21be0c"
        />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category, i) => (
            <LinkContainer
              to={`/products/${category.name.toLocaleLowerCase()}`}
              key={i}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
