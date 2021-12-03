import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Kristo Meals</h1>
        <HeaderCartButton onClick={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Refreshing delicious food and drink!" />
      </div>
    </Fragment>
  );
};

export default Header;
