import { ENV } from "../../env";
import React, { useState } from "react";
import favoriteNft from "../../services/favoriteNft.service";

const FavNFT = (props) => {
  
  return (
    <>
      <button
       // onClick={() => favnftSet(props._NFTID, props._USERID)}
        className="set"
      >
        <i class="fas fa-heart fa-3x"></i>
      </button>
    </>
  );
};

export default FavNFT;
