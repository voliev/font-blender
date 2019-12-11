import React from "react";
import TitleFilter from "./TitleFilter";
import SortingFilter from "./SortingFilter";
import CategoriesFilter from "./CategoriesFilter";
import FontsList from "./FontsList";
import SelectedFontsContainer from "./SelectedFontsContainer";
import "./styles/FontsPane.css";

const FontsPane = () => (
  <div className="FontsPane">
    <TitleFilter />
    <CategoriesFilter />
    <SortingFilter />
    <FontsList />
    <SelectedFontsContainer />
  </div>
);

export default FontsPane;
