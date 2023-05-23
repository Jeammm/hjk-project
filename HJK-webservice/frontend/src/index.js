import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { loader as rootLoader } from "./pages/App";
import Admin from "./pages/Admin";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";

import Index from "./routes/Index";
import Category, { loader as categoryLoader } from "./routes/Category";
import SubCategory, { loader as subCategoryLoader } from "./routes/SubCategory";
import Product, { loader as productLoader } from "./routes/Product";
import Brand, { loader as brandLoader } from "./routes/Brand";
import BrandItem, { loader as brandItemLoader } from "./routes/BrandItem";

import Dashboard from "./routes/Dashboard"

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
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "test",
        element: <div>test here</div>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
