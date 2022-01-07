import React from "react";
import Header from "../components/Header/Header";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import Footer from "../components/Footer/Footer";
import CollectionDetail from "../components/Collections/CollectionDetail";

const collectionDetail = () => {
  return (
    <div>
      <Header />
      <CollectionDetail/>
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default collectionDetail;
