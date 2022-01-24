import React, { useEffect, useState } from "react";
import { ENV } from "../../env";
import NFT from "../../services/nft.service";
import $ from "jquery";

const HomeNft = () => {
  const initialData = {
    pre_heading: "EXCLUSIVE ASSETS",
    heading: "Explore",
    btnText: "View All",
  };

  const [initData, setInitData] = useState(initialData);
  const [nftData, setNftData] = useState();

  useEffect(async () => {
    const res = await NFT.nftget(`${ENV.API_URL}api/nft_list/`);
    setNftData(res.data);
    loadMore();
  }, []);

  const loadMore = () => {
    $(".load-more .item").slice(0, 4).show();

    $("#load-btn").on("click", function (e) {
      e.preventDefault();
      $(".load-more .item:hidden").slice(0, 4).slideDown();
      if ($(".load-more .item:hidden").length == 0) {
        $("#load-btn").fadeOut("slow");
      }
    });
  };

  return (
    <section className="explore-area ">
{/* a;lsdk */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
              <div className="intro-btn">
                <a className="btn content-btn" href="/marketplace">
                  {initData.btnText}
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row items load-more">
          {nftData
            ? nftData.map((item, id) => {
                return (
                  <div
                    key={`exf_${id}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                  >
                    <div className="card">
                      <div className="image-over">
                        <a href={`/nft-details?${item.id}`}>
                          <img
                            className="card-img-top image-container-nft"
                            src={`${ENV.API_URL_image}${item.image}`}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <a href={`/nft-details?${item.id}`}>
                              <h5 className="mb-0">{item.name}</h5>
                            </a>
                            <i class="far fa-heart"></i>
                          </div>
                          <div className="seller d-flex align-items-center my-3">
                            <span>Owned By</span>
                            <a href="/author">
                              <h6 className="ml-2 mb-0">{"@" + item.owner}</h6>
                            </a>
                          </div>
                          <div className="card-bottom d-flex justify-content-between">
                            <span>{"$" + item.price}</span>
                            <span>{item.size}</span>
                          </div>
                          <a
                            className="btn btn-bordered-white btn-smaller mt-3"
                            href="/login"
                          >
                            <i className="icon-handbag mr-2" />
                            place a bid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : " "}
        </div> */}
        <div className="row">
          <div className="col-12 text-center">
            <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">
              Load More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNft;
