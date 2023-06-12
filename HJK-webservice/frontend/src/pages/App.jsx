import "../styles/App.css";

import {
  Form,
  Outlet,
  useLoaderData,
  NavLink,
  useNavigation,
  useSubmit,
  useLocation,
} from "react-router-dom";

import { useEffect, useCallback, useState } from "react";
import Hamburger from "hamburger-react";

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
  const location = useLocation();
  const submit = useSubmit();

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

  const searchBox = useCallback(debounce(submit, 800), [submit]);

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    // execute on location change
    setOpen(false);
  }, [location]);

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
          <NavLink id="logo-container" to="/">
            <h2 id="logo-text-th">
              ห้างหุ้นส่วนจำกัด กิจเจริญรุ่งเรือง การค้า
            </h2>
            <h3 id="logo-text-en">KITCHARERNRUNGROENG LIMITED</h3>
          </NavLink>
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
          <Hamburger
            id="category-hamburger"
            toggled={isOpen}
            toggle={setOpen}
          />
          <div id="space-350"></div>
          <NavLink to={`brands`} className="menu-item selectable">
            แบรนด์
          </NavLink>
          <NavLink to={`brands`} className="menu-item left-line selectable">
          ติดต่อ
          </NavLink>
          <NavLink to={`brands`} className="menu-item left-line selectable">
          แผนที่
          </NavLink>
        </div>
      </div>

      <div id="detail">
        <div className="detail-container">
          <div className="category-container">
            <div className="by-category">หมวดหมู่สินค้า</div>

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

          <div
            className={`category-container-m ${
              isOpen ? "cat-list-open" : "cat-list-close"
            }`}
          >
            <div className={`category-list `}>
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
