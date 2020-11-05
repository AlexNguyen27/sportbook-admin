import React from "react";
import CatergoryCard from "./CategoryCard";
import PopularArticles from "./PopularArticles";
import Archives from "./Archives";

const SubNewsFeed = ({ onClickCategory, selectedCategoryId }) => {
  return (
    <>
      <CatergoryCard onClickCategory={onClickCategory} selectedCategoryId={selectedCategoryId} />
      <PopularArticles />
      {/* <Archives /> */}
    </>
  );
};

export default SubNewsFeed;
