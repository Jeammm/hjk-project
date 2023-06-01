import "../../styles/BrandConf.css";

import { getBrands } from "../../services/product";

import { useLoaderData, Outlet, NavLink, useParams, useLocation } from "react-router-dom";

import { useState } from "react";

export async function loader() {
  const brands = await getBrands();
  return { brands };
}
export default function BrandConf() {
  const { brands } = useLoaderData();

  const location = useLocation();
  const params = useParams();
  const brandIdSelecting = params.brandId;

  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="brands-conf-container">
      <div id="search-form" role="search">
        <input
          id="q"
          aria-label="ค้นหาแบรนด์"
          placeholder="ค้นหาแบรนด์"
          type="search"
          name="q"
          onChange={onChange}
        />
        {/* <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div> */}
      </div>
      <div className="brands-item-edit-container">
        <div className="brands-item-container">
          {brands
            .filter((b) =>
              `${b.NameTH}${b.NameEN}`.toLowerCase().includes(query)
            )
            .map((b) => {
              return (
                <NavLink
                  to={`${b.BrandID}/edit`}
                  className={`brand-item selectable ${b.BrandID == brandIdSelecting ? "brand-isSelected" : ""}`}

                  key={b.BrandID}
                >
                  <img src={b.Logo} alt={b.nameEN} className="brand-img" />
                  <div className="brand-text">
                    <h3>{b.NameTH}</h3>
                    <h4>{b.NameEN}</h4>
                  </div>
                </NavLink>
              );
            })}

          <NavLink to="new" className={`brand-item selectable ${location.pathname.endsWith("new") ? "brand-isSelected" : ""}`}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2661/2661440.png"
              alt="New Brand"
              className="new-brand-icon"
            />
            <div className="brand-text">
              <h3>เพิ่มแบรนด์ใหม่</h3>
              <h4>Add new brand</h4>
            </div>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}