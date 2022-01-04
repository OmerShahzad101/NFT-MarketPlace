import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import Login from "../themes/login";
import Create from "../themes/create";
import Signup from "../themes/signup";
import Auctions from "../themes/auctions";
import Activity from "../themes/activity";
import ThemeOne from "../themes/theme-one";
import ExploreTwo from "../themes/explore-two";
import ExploreThree from "../themes/explore-three";
import Contact from "../themes/contact";
import ItemDetails from "../themes/item-details";
import HelpCenter from "../themes/help-center";
// import ExploreOne from "../themes/explore-one";
// import ExploreFour from "../themes/explore-four";
// import Blog from "../themes/blog";
// import BlogSingle from "../themes/blog-single";
// import Authors from "../themes/authors";
// import Author from "../themes/author";
// import WalletConnect from "../themes/wallet-connect";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
          <Route exact path="/" component={ThemeOne} />
          <Route exact path="/marketplace" component={ExploreThree} />
            <Route exact path="/collection" component={ExploreTwo} />
            <Route exact path="/liveAuction" component={Auctions} />
            <Route exact path="/ranking" component={ExploreThree} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/create" component={Create} /> 
            <Route exact path="/collection" component={ExploreTwo} />
            <Route exact path="/contact" component={Contact} /> 
            <Route exact path="/item-details" component={ItemDetails} />
            <Route exact path="/help-center" component={HelpCenter} />
             {/* <Route exact path="/" component={ThemeOne} />
            <Route exact path="/explore-1" component={ExploreOne} />
            <Route exact path="/explore-3" component={ExploreThree} />
            <Route exact path="/explore-4" component={ExploreFour} />
            <Route exact path="/auctions" component={Auctions} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog-single" component={BlogSingle} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/author" component={Author} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />   */} 
          </Switch> 
        </Router>
      </div>
    );
  }
}
export default MyRouts;