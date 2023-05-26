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

import ControlPanel, {loader as adminLoader } from "./pages/ControlPanel";
import CategoryConf, { loader as categoryConfLoader } from "./routes/Admin/CategoryConf";
import SubCategoryConf, { loader as subCategoryConfLoader } from "./routes/Admin/SubCategoryConf";
import ProductConf, { loader as ProductConfLoader } from "./routes/Admin/ProductConf";

import NewProduct, { loader as NewProductLoader } from "./routes/Admin/NewProduct";
import NewCategory, {action as NewCategoryAction } from "./routes/Admin/NewCategory";
import NewSubCategory, {action as NewSubCategoryAction } from "./routes/Admin/NewSubCategory";

import EditProduct, { loader as EditProductLoader } from "./routes/Admin/EditProduct";
import EditCategory, { loader as EditCategoryLoader, action as EditCategoryAction } from "./routes/Admin/EditCategory";
import EditSubCategory, { loader as EditSubCategoryLoader, action as EditSubCategoryAction } from "./routes/Admin/EditSubCategory";


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
    loader: adminLoader,
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
            action: EditCategoryAction
          },
          {
            path: "new",
            element: <NewCategory />,
            action: NewCategoryAction,
          },
          {
            path: ":categoryId/subcategory",
            element: <SubCategoryConf />,
            loader: subCategoryConfLoader,
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
