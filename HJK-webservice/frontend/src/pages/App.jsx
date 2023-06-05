import "../styles/App.css";

import {
  Form,
  Outlet,
  useLoaderData,
  NavLink,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { useEffect, useCallback } from "react";

import { getAllCategory } from "../services/product";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const category = await getAllCategory();
  return { category, q };
}

export async function action({ request, params }) {
  // const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  // return redirect(`/search`);
  return null;
}

function App() {
  const { category, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  console.log(process.env.BACKEND_URL)

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  const searchBox = useCallback(debounce(submit, 300), [submit]);

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
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q === null;
                  searchBox(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
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
