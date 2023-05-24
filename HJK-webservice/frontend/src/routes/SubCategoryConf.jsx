import { useLoaderData, Outlet, NavLink, useParams } from "react-router-dom";

import { checkCategory, getSubCategory } from "../services/product";

export async function loader({ params }) {
  const category = await checkCategory(params.categoryId);

  if (category.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const subCategory = await getSubCategory(params.categoryId);
  return { subCategory };
}

export default function SubCategoryConf() {
  const { subCategory } = useLoaderData();

  const params = useParams();

  const catIdSelecting = params.subcategoryId

  return (
    <div className="category-conf-container">
      <div className="category-selection-area">
        {subCategory.map((cat) => {
          return (
            <NavLink to={`${cat.SubCategoryID}/product`} key={cat.SubCategoryID}>
              <div className={`category-conf-item selectable ${`${cat.SubCategoryID}` === catIdSelecting ? "isSelected" : ""}`}>
                <p>{cat.SubNameTH}</p>
              </div>
            </NavLink>
          );
        })}
        <div className="category-conf-item selectable">
          <p> + หมวดหมู่ย่อยใหม่</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
