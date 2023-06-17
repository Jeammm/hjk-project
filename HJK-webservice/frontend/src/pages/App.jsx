import "../styles/App.css";

import {
  Form,
  Outlet,
  useLoaderData,
  NavLink,
  // useNavigation,
  // useSubmit,
  useLocation,
  redirect,
} from "react-router-dom";

import {
  useEffect,
  //  useCallback,
  useState,
} from "react";
import Hamburger from "hamburger-react";

import { getAllCategory } from "../services/product";

import SearchDropDown from "../components/SearchDropDown";

import searchIcon from "../assets/search.png";

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  const category = await getAllCategory();
  return { category };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const queryValue = encodeURIComponent(data.q);
  return redirect(`/search/?q=${queryValue}`);
}

function App() {
  const { category } = useLoaderData();
  const location = useLocation();
  // const navigation = useNavigation();
  // const submit = useSubmit();
  const [q, setQ] = useState("");

  const searchBox = (data) => {
    setQ(data);
  };

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q]);

  // const debounce = (fn, delay) => {
  //   let timerId;
  //   return (...args) => {
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => fn(...args), delay);
  //   };
  // };

  // const searchBox = useCallback(debounce(submit, 800), [submit]);

  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    setQ("");
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
          <Hamburger
            id="category-hamburger"
            toggled={isOpen}
            toggle={setOpen}
          />

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

          <NavLink id="logo-container" to="/">
            <h2 id="logo-text-th">
              ห้างหุ้นส่วนจำกัด กิจเจริญรุ่งเรือง การค้า
            </h2>
            <h3 id="logo-text-en">KITCHARERNRUNGROENG LIMITED</h3>
          </NavLink>

          <div id="contact-serach-container">
            <Form
              id="search-form"
              role="search"
              method="post"
              onSubmit={() => {
                setQ("");
              }}
            >
              <input
                id="q"
                aria-label="ค้นหาสินค้า"
                placeholder="ค้นหาสินค้า..."
                type="search"
                name="q"
                value={q}
                // onChange={(event) => {
                //   const isFirstSearch = q === null;
                //   searchBox(event.currentTarget.form, {
                //     replace: !isFirstSearch,
                //   });
                // }}
                onChange={(event) => {
                  searchBox(event.target.value);
                }}
                autoComplete="off"
              />
              <button id="search-button" type="submit">
                SEARCH
              </button>
            </Form>
            <SearchDropDown q={q} setQ={setQ} />
          </div>
        </div>
        <div className="header-container-m">
          <Hamburger
            id="category-hamburger"
            toggled={isOpen}
            toggle={setOpen}
          />

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

          <div id="contact-serach-container-small">
            <Form
              id="search-form"
              role="search"
              method="post"
              onSubmit={() => {
                setQ("");
              }}
            >
              <input
                id="q"
                aria-label="ค้นหาสินค้า"
                placeholder="ค้นหาสินค้า..."
                type="search"
                name="q"
                value={q}
                // onChange={(event) => {
                //   const isFirstSearch = q === null;
                //   searchBox(event.currentTarget.form, {
                //     replace: !isFirstSearch,
                //   });
                // }}
                onChange={(event) => {
                  searchBox(event.target.value);
                }}
                autoComplete="off"
              />
              <button id="search-button" type="submit">
                <img
                  src={searchIcon}
                  className="small-search-button"
                  alt="search"
                />
              </button>
            </Form>
            <SearchDropDown q={q} setQ={setQ} />
          </div>
          <NavLink id="small-logo" to="/">
            <h2 id="small-logo-text-th">KJR</h2>
          </NavLink>
        </div>
      </header>

      <div id="menu-tab">
        <div className="menu-tab-container">
          <NavLink to="" className="menu-item selectable">
            หน้าแรก
          </NavLink>
          <NavLink to="brands" className="menu-item selectable">
            แบรนด์
          </NavLink>
          <NavLink to="contact" className="menu-item left-line selectable">
            ติดต่อ
          </NavLink>
          <NavLink to="map" className="menu-item left-line selectable">
            แผนที่
          </NavLink>
        </div>
      </div>

      <div id="detail">
        <div className="detail-container">
          <div className="outlet-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
