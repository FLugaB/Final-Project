import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actionCreator/products";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  //   console.log(products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      {/* <h1>product page</h1> */}
      <ul className="cards">
        {products.map((el, index) => {
          return (
            <li key={el.DetailProducts[0].id}>
              <a href="/" className="card">
                <img
                  src={el.DetailProducts[0].imageUrl}
                  className="card__image"
                  alt=""
                />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg
                      className="card__arc"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path />
                    </svg>
                    {/* <div className="card__thumb">
                        <img
                          src={el.Profile.photoProfile}
                          alt=""
                        />
                      </div> */}
                    <div className="card__header-text">
                      <h3 className="card__title">{el.title}</h3>
                      <span className="card__status"></span>
                    </div>
                  </div>
                  <p className="card__description">
                    {el.DetailProducts[0].description}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProductPage;
