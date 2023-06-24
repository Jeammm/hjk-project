import { NavLink } from "react-router-dom"

export default function Product({ products }) {
  if (products.length === 0) {
    return (
      <div className="nothing-here">
        <p>ไม่มีสินค้านี้</p>
      </div>
    );
  }

  return (
    <ul className="product-item-list">
      {products.map((sub) => {
        return (
          <li key={sub.ProductID} className="product-item selectable">
            <NavLink to={`/product/${sub.ProductID}`}>
              <div className="product-list-img-container">
                <img src={sub.Thumbnail} alt={sub.NameTH} />
              </div>
              <div className="product-list-detail">
                <p className="link-text">{sub.NameTH}</p>
                <div className="prod-detail-bottom">
                  <p className="prod-brand">
                    {sub.Brand ? `${sub.BrandEN}` : "No Brand"}
                  </p>
                  {/* <p className="right-end">{sub.MinPrice}</p> */}
                  <p className="right-end prod-price">
                    {sub.MinPrice &&
                      sub.MinPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </p>
                  <p className="prod-id">{sub.ProductID}</p>
                  <p className="right-end avilability">มีสินค้า</p>
                </div>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};