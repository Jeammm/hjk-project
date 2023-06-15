import "../styles/SearchDropDown.css";

import { useEffect, useState } from "react";
import { searchProduct } from "../services/product";

const SearchDropDown = ({q}) => {
  const [searchResult, setSearchResult] = useState({
    category: [],
    subCategory: [],
    product: [],
  });


  useEffect(() => {
    const fetchData = async () => {
      if (q.length >= 3) {
        try {
          const result = await searchProduct(q);
          setSearchResult(result);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [q]);

  const categoryDiv = (cs) => {
    return cs.length === 0
      ? "ไม่มีหมวดหมู่นี้"
      : cs.map((c) => (
          <div
            className="searchCat-item  search-item"
            key={`s-${c.CategoryID}`}
          >
            <p>{c.CategoryID}</p>
            <p>{c.CategoryTH}</p>
          </div>
        ));
  };

  const subCategoryDiv = (subs) => {
    return subs.length === 0
      ? "ไม่มีหมวดหมู่ย่อยนี้"
      : subs.map((sub) => (
          <div
            className="searchCat-item search-item"
            key={`s-${sub.SubCategoryID}`}
          >
            <p>{sub.SubCategoryID}</p>
            <p>{sub.SubNameTH}</p>
          </div>
        ));
  };

  const productDiv = (prods) => {
    return prods.length === 0
      ? "ไม่มีสินค้านี้"
      : prods.map((prod) => (
          <div
            className="searchProd-item  search-item"
            key={`s-${prod.ProductID}`}
          >
            <div className="prod-img-serch-container">
              <img src={prod.Thumbnail} alt={prod.NameTH} />
            </div>
            <p>{prod.ProductID}</p>
            <p>{prod.NameTH}</p>
          </div>
        ));
  };

  if (q.length < 3) {
    return null; // Return null if 'q' length is less than 3
  }

  return (
    <div id="search-result">
      <div className="cat-sub-search-container">
        <div className="search-item-container">
          <h4>หมวดหมู่</h4>
          {categoryDiv(searchResult.category)}
        </div>
        <div className="search-item-container row-2">
          <h4>หมวดหมู่ย่อย</h4>
          {subCategoryDiv(searchResult.subCategory)}
        </div>
      </div>
      <div className="search-item-container">
        <h4>สินค้า</h4>
        {productDiv(searchResult.product)}
      </div>
    </div>
  );
};

export default SearchDropDown;
