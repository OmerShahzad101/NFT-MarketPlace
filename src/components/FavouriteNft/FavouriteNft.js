import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env";
import favoriteNft from "../../services/favoriteNft.service";

const FavouriteNft = (parms) => {
  const initialData = {
    heading: "Favourite NFT",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    btnText: "Load More",
  };
  const [initData] = useState(initialData);
  const [nftData, setNftData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await favoriteNft.favoriteNftGet(
        `${ENV.API_URL}api/favourite-nft/`
      );
      setNftData(res.result);
    };
    fetchData();
  }, [parms]);
  return (
    <section className="explore-area load-more">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
          </div>
        </div>

        <div className="row items ">
          {nftData ? (
            nftData.map((item, id) => {
              return (
                <div
                  key={`exf_${id}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                >
                  <div className="card">
                    <div className="image-over">
                      <Link to={`/nft-details?${item.id}`}>
                        <img
                          className="card-img-top image-container-nft"
                          src={`${ENV.API_URL_image}${item.image}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="card-caption col-12 p-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <Link to={`/nft-details?${item.id}`}>
                            <h5 className="mb-0">{item.name}</h5>
                          </Link>
                          <i class="far fa-heart"></i>
                        </div>
                        <div className="seller d-flex align-items-center my-3">
                          <span>Owned By</span>
                          <Link to={`/author?${item.user_id}`}>
                            <h6 className="ml-2 mb-0">{"@" + item.owner}</h6>
                          </Link>
                        </div>
                        <div className="card-bottom d-flex justify-content-between">
                          <span>{"$" + item.price}</span>
                          <span>{item.size}</span>
                        </div>
                        <Link
                          className="btn btn-bordered-white btn-smaller mt-3"
                          to="/login"
                        >
                          <i className="icon-handbag mr-2" />
                          place a bid
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no_data">
              <span>No item to Explore</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FavouriteNft;
