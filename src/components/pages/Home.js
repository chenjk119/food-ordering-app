import React, { Fragment } from "react";

import MyTabBar from "../TabBar";
import ListInfluencers from "../ListInfluencers";

// Home page, displayes list of influencers and drop down menu
export default function Home() {
  return (
    <Fragment>
      <MyTabBar />
      <ListInfluencers />
    </Fragment>
  );
}