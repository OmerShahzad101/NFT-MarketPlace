import React, { Component } from "react";

class AuthorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      socialData: [],
    };
  }

  render() {
    return (
      <div className="card no-hover text-center">
        <div className="image-over">
          <img
            id="nft-image"
            className="card-img-top"
            src={
              typeof this.state.data.img === "undefined"
                ? "/img/auction_2.jpg"
                : this.state.data.img
            }
            alt=""
          />
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body">
            <h5 className="mb-3">
              {this.props.createNFT_data.name === ""
                ? "NFT name"
                : this.props.createNFT_data.name}
            </h5>
            <p className="my-3">
              {this.props.createNFT_data.description === ""
                ? "Description"
                : this.props.createNFT_data.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorProfile;
