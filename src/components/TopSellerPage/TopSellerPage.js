import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env";
import topSellers from "../../services/topSellers.service";
import $ from "jquery";
let limit = 6;

const TopSellerPage = () => {
  const [sellerData, setSellerData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  const initData = {
    preHeading: "Creative Artists",
    heading: "Top Sellers",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  };

  useEffect(() => {
    setLoader(true)
    $("html,body").animate({ scrollTop: 0 }, "slow");
    pagination();
  }, []);

  const pagination = async () => {
    const result = await topSellers.topSellersList(
      `${ENV.API_URL}api/top_sellers/?page=${page}&limit=${limit}`
    );
    let newArr = [...sellerData, ...result.data.data.top_seller];
    setSellerData(newArr);

    if (result.data.data.pagination.total == newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setLoader(false)

    setPage(page + 1);
  };

  return (
    <>
    {loader ? (
      <div className="fullpage-loader-holder height">
        <div className="fullpage-loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      </div>
    ) : (
    <section className="explore-area">
      <div className="container">
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
        </div>
        <div className="row items">
          {sellerData
            ? sellerData.map((item, idx) => {
                return (
                  <div
                    key={`ts_${idx}`}
                    className="col-12 col-sm-6 col-lg-4 item"
                  >
                    {/* Single Seller */}
                    <div className="card no-hover">
                      <div className="single-seller d-flex align-items-center">
                        <Link to={`/author?${item.id}`}>
                          <img
                            className="avatar-md rounded-circle"
                            src={`${ENV.API_URL_image}${item.profile_image}`}
                            alt=""
                          />
                        </Link>
                        {/* Seller Info */}
                        <div className="seller-info ml-3">
                          <Link
                            className="seller mb-2"
                            to={`/author?${item.user_id}`}
                          >
                            {item.first_name} {item.last_name}
                          </Link>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={() => pagination()}
              className="btn btn-bordered-white mt-5"
              id="loadmorebtn"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </section>
      )}
    </>
  );
};
export default TopSellerPage;
