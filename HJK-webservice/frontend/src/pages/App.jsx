import "../styles/App.css";

import { Form, Outlet, useLoaderData, NavLink } from "react-router-dom";

import { getAllCategory } from "../services/product";

export async function loader() {
  const category = await getAllCategory();
  // if (!categories) {
  //   throw new Response("", {
  //     status: 404,
  //     statusText: "Not Found",
  //   });
  // }
  return { category };
}

function App() {
  const { category } = useLoaderData();

  return (
    <div className="App">
      <nav>
        <div className="container">
          <div id="basket-button" className="selectable">
            ตะกร้าสินค้า
          </div>
        </div>
      </nav>

      <header>
        <div className="header-container">
          <div id="logo-container">
            <h2 id="logo-text-th">
              ห้างหุ้นส่วนจำกัด กิจเจริญรุ่งเรือง การค้า
            </h2>
            <h3 id="logo-text-en">KITCHARERNRUNGROENG LIMITED</h3>
          </div>
          <div id="contact-serach-container">
            <div id="contact">
              <p>ติดต่อเรา</p>
              <p>088-888-8888</p>
            </div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="ค้นหาสินค้า"
                placeholder="ค้นหาสินค้า"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </Form>
          </div>
        </div>
      </header>

      <div id="menu-tab">
        <div className="menu-tab-container">
          <div id="space-350"></div>
          <NavLink to={`brands`}>
            <div className="menu-item selectable link-text">แบรนด์</div>
          </NavLink>
          <div className="menu-item left-line selectable">ติดต่อ</div>
          <div className="menu-item left-line selectable">แผนที่</div>
        </div>
      </div>

      <div id="detail">
        <div className="detail-container">
          <div className="category-container">
            <div id="by-category">หมวดหมู่สินค้า</div>

            <div className="category-list">
              {category.map((cat) => {
                return (
                  <NavLink
                    to={`category/${cat.CategoryID}`}
                    className="category-item selectable link-text"
                    key={cat.CategoryID}
                  >
                    <p>{cat.CategoryTH}</p>
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="outlet-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
