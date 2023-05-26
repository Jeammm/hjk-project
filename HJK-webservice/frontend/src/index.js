import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { loader as rootLoader } from "./pages/App";
import Admin, {action as loginAction} from "./pages/Admin";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";

import Index from "./routes/Index";
import Category, { loader as categoryLoader } from "./routes/User/Category";
import SubCategory, {
  loader as subCategoryLoader,
} from "./routes/User/SubCategory";
import Product, { loader as productLoader } from "./routes/User/Product";
import Brand, { loader as brandLoader } from "./routes/User/Brand";
import BrandItem, { loader as brandItemLoader } from "./routes/User/BrandItem";

import ControlPanel from "./routes/Admin/ControlPanel";
import CategoryConf, { loader as categoryConfLoader } from "./routes/Admin/CategoryConf";
import SubCategoryConf, { loader as subCategoryConfLoader } from "./routes/Admin/SubCategoryConf";
import ProductConf, { loader as ProductConfLoader } from "./routes/Admin/ProductConf";

import NewProduct, { loader as NewProductLoader } from "./routes/Admin/NewProduct";
import EditProduct, { loader as EditProductLoader } from "./routes/Admin/EditProduct";

import EditCategory, { loader as EditCategoryLoader } from "./routes/Admin/EditCategory";
import EditSubCategory, { loader as EditSubCategoryLoader } from "./routes/Admin/EditSubCategory";

import NewCategory from "./routes/Admin/NewCategory";
import NewSubCategory from "./routes/Admin/NewSubCategory";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    // action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
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
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Admin />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/admin",
    element: <ControlPanel />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "category",
        element: <CategoryConf />,
        loader: categoryConfLoader,
        children: [
          {
            path: ":categoryId/edit",
            element: <EditCategory />,
            loader: EditCategoryLoader,
          },
          {
            path: "new",
            element: <NewCategory />,
          },
          {
            path: ":categoryId/subcategory",
            element: <SubCategoryConf />,
            loader: subCategoryConfLoader,
            children: [
              {
                path: "new",
                element: <NewSubCategory />,
              },
              {
                path: ":subcategoryId/edit",
                element: <EditSubCategory />,
                loader: EditSubCategoryLoader,
              },
              {
                path: ":subcategoryId/product",
                element: <ProductConf />,
                loader: ProductConfLoader,
                children: [],
              },
              {
                path: ":subcategoryId/product/:productId/edit",
                element: <EditProduct />,
                loader: EditProductLoader,
              },
              {
                path: ":subcategoryId/product/new",
                element: <NewProduct />,
                loader: NewProductLoader,
              },
            ],
          },
        ],
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
