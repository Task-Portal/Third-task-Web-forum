import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import "./LeftMenu.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../store/AppState";

const LeftMenu = () => {
  // const categoriesState = useSelector((state: AppState) => state.categories);
  const { width } = useWindowDimensions();


  // useEffect(() => {
  //   if (categoriesState) {
  //     console.log(categoriesState);
  //     const cats = categoriesState.map((cat: Category) => {
  //       return (
  //         <li key={cat.id}>
  //           <Link to={`/categorythreads/${cat.id}`}>{cat.name}</Link>
  //         </li>
  //       );
  //     });
  //     setCategories(<ul className="category">{cats}</ul>);
  //   }
  // }, [categoriesState]);

  if (width <= 768) {
    return null;
  }
  // return <div className="leftmenu">{categories}</div>;
  // @ts-ignore
  return <div className="leftmenu">Left menu</div>;
};

export default LeftMenu;
