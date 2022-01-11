import React from "react";
import Header from "../components/Header/Header";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import Footer from "../components/Footer/Footer";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";

const updateProfile = () => {
  return (
    <div>
      <Header />
      <UpdateProfile />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default updateProfile;
