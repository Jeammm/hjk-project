import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { loader as rootLoader, action as rootAction } from "./pages/App";
import Admin, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Admin";
import ControlPanel, { loader as adminLoader } from "./pages/ControlPanel";

import ErrorPage from "./routes/ErrorPage";
import CPIndex from "./routes/Admin/CPIndex";

import Home, { loader as homeLoader } from "./routes/User/Home";
import Search, { loader as searchLoader } from "./routes/User/Search";

import Category, { loader as categoryLoader } from "./routes/User/Category";
import SubCategory, {
  loader as subCategoryLoader,
} from "./routes/User/SubCategory";
import Product, { loader as productLoader } from "./routes/User/Product";
import Brand, { loader as brandLoader } from "./routes/User/Brand";
import BrandItem, { loader as brandItemLoader } from "./routes/User/BrandItem";
import Contact, { loader as contactLoader } from "./routes/User/Contact";
import Map, { loader as mapLoader } from "./routes/User/Map";

import CategoryConf, {
  loader as CategoryConfLoader,
} from "./routes/Admin/CategoryConf";
import SubCategoryConf, {
  loader as SubCategoryConfLoader,
} from "./routes/Admin/SubCategoryConf";
import ProductConf, {
  loader as ProductConfLoader,
} from "./routes/Admin/ProductConf";
import BrandConf, { loader as BrandConfLoader } from "./routes/Admin/BrandConf";
import BannerConf, {
  loader as bannerConfLoader,
  action as bannerConfAction,
} from "./routes/Admin/BannerConf";

import NewProduct, {
  loader as NewProductLoader,
  action as NewProductAction,
} from "./routes/Admin/NewProduct";
import NewCategory, {
  action as NewCategoryAction,
} from "./routes/Admin/NewCategory";
import NewSubCategory, {
  action as NewSubCategoryAction,
} from "./routes/Admin/NewSubCategory";
import NewBrand, { action as NewBrandAction } from "./routes/Admin/NewBrand";
import NewBanner, { action as NewBannerAction } from "./routes/Admin/NewBanner";

import EditProduct, {
  loader as EditProductLoader,
  action as EditProductAction,
} from "./routes/Admin/EditProduct";
import EditCategory, {
  loader as EditCategoryLoader,
  action as EditCategoryAction,
} from "./routes/Admin/EditCategory";
import EditSubCategory, {
  loader as EditSubCategoryLoader,
  action as EditSubCategoryAction,
} from "./routes/Admin/EditSubCategory";
import EditBrand, {
  loader as EditBrandLoader,
  action as EditBrandAction,
} from "./routes/Admin/EditBrand";
import SelectBanner, {
  loader as SelectBannerLoader,
  action as SelectBannerAction,
} from "./routes/Admin/SelectBanner";
import EditContact, {
  loader as EditContactLoader,
  action as EditContactAction,
} from "./routes/Admin/EditContact";
import EditMap, {
  loader as EditMapLoader,
  action as EditMapAction,
} from "./routes/Admin/EditMap";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home title="หจก.กิจเจริญรุ่งเรืองการค้า" />,
            loader: homeLoader,
          },
          {
            path: "search",
            element: <Search title="ค้นหาสินค้า" />,
            loader: searchLoader,
          },
          {
            path: "category/:categoryId",
            element: <Category />,
            loader: categoryLoader,
          },
          {
            path: "subcategory/:subCategoryId",
            element: <SubCategory />,
            loader: subCategoryLoader,
          },
          {
            path: "product/:productId",
            element: <Product />,
            loader: productLoader,
          },
          {
            path: "brands",
            element: <Brand />,
            loader: brandLoader,
          },
          {
            path: "brands/:brandId",
            element: <BrandItem />,
            loader: brandItemLoader,
          },
          {
            path: "contact",
            element: <Contact/>,
            loader: contactLoader,
          },
          {
            path: "map",
            element: <Map/>,
            loader: mapLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Admin />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/admin",
    element: <ControlPanel />,
    loader: adminLoader,
    children: [
      { index: true, element: <CPIndex /> },
      {
        path: "category",
        element: <CategoryConf />,
        loader: CategoryConfLoader,
        children: [
          {
            path: ":categoryId/edit",
            element: <EditCategory />,
            loader: EditCategoryLoader,
            action: EditCategoryAction,
          },
          {
            path: "new",
            element: <NewCategory />,
            action: NewCategoryAction,
          },
          {
            path: ":categoryId/subcategory",
            element: <SubCategoryConf />,
            loader: SubCategoryConfLoader,
            children: [
              {
                path: "new",
                element: <NewSubCategory />,
                action: NewSubCategoryAction,
              },
              {
                path: ":subcategoryId/edit",
                element: <EditSubCategory />,
                loader: EditSubCategoryLoader,
                action: EditSubCategoryAction,
              },
              {
                path: ":subcategoryId/product",
                element: <ProductConf />,
                loader: ProductConfLoader,
              },
              {
                path: ":subcategoryId/product/:productId/edit",
                element: <EditProduct />,
                loader: EditProductLoader,
                action: EditProductAction,
              },
              {
                path: ":subcategoryId/product/new",
                element: <NewProduct />,
                loader: NewProductLoader,
                action: NewProductAction,
              },
            ],
          },
        ],
      },
      {
        path: "brand",
        element: <BrandConf />,
        loader: BrandConfLoader,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                path: ":brandId/edit",
                element: <EditBrand />,
                loader: EditBrandLoader,
                action: EditBrandAction,
              },
              {
                path: "new",
                element: <NewBrand />,
                action: NewBrandAction,
              },
            ],
          },
        ],
      },
      {
        path: "banner",
        element: <BannerConf />,
        loader: bannerConfLoader,
        action: bannerConfAction,
        children: [
          {
            path: "new",
            element: <NewBanner />,
            action: NewBannerAction,
          },
          {
            path: "select",
            element: <SelectBanner />,
            loader: SelectBannerLoader,
            action: SelectBannerAction,
          },
        ],
      },
      {
        path: "contact",
        element: <EditContact />,
        loader: EditContactLoader,
        action: EditContactAction,
      },
      {
        path: "map",
        element: <EditMap />,
        loader: EditMapLoader,
        action: EditMapAction,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
