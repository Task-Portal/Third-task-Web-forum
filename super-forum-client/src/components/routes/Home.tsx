import React, { FC } from "react";
import Nav from "../areas/Nav";
import LeftMenu from "../areas/LeftMenu";
import Main from "../areas/main/Main";
import "./Home.css";

const Home: FC = () => {
  return (
    <div className="screen-root-container home-container">
      <div className="navigation">
        <Nav />
      </div>

      {/*<LeftMenu />*/}
      {/*<Main />*/}

    </div>
  );
};

export default Home;
