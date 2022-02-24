import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import Login from "../themes/login";
import Signup from "../themes/signup";
import Create from "../themes/create";
import Author from "../themes/author";
import Authors from "../themes/authors";
import Contact from "../themes/contact";
import Auctions from "../themes/auctions";
import Activity from "../themes/activity";
import ThemeOne from "../themes/theme-one";
import Dashboard from "../themes/dashboard";
import ExploreTwo from "../themes/explore-two";
import HelpCenter from "../themes/help-center";
import ItemDetails from "../themes/item-details";
import ExploreThree from "../themes/explore-three";
import UpdateProfile from "../themes/updateProfile";
import myCollections from "../themes/myCollections";
import WalletConnect from "../themes/wallet-connect";
import TopSellerPage from "../themes/topSellerPage";
import FavouriteNft from "../themes/favouriteNft";
import CollectionDetail from "../themes/collectionDetail";
import CreateCollection from "../themes/createCollection";
class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router >
          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/author" component={Author} />
            <Route exact path="/create" component={Create} /> 
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/ranking" component={ExploreThree} />
            <Route exact path="/contact" component={Contact} /> 
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/top-seller" component={TopSellerPage} />    
            <Route exact path="/collection" component={ExploreTwo} />
            <Route exact path="/collection" component={ExploreTwo} />
            <Route exact path="/marketplace" component={ExploreThree} />
            <Route exact path="/liveAuction" component={Auctions} />
            <Route exact path="/nft-details" component={ItemDetails} />
            <Route exact path="/help-center" component={HelpCenter} />
            <Route exact path="/mycollections" component={myCollections} />
            <Route exact path="/favourite-nft" component={FavouriteNft} />
            <Route exact path="/updateprofile" component={UpdateProfile} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/collectionDetail" component={CollectionDetail} />
            <Route exact path="/create-collection" component={CreateCollection} />    
          </Switch> 
        </Router>
      </div>
    );
  }
}
export default MyRouts;