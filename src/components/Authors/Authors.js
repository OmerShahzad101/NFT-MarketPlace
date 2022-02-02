import React, { Component } from "react";

import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import authors from "../../services/authors.service";
import $ from "jquery";
let limit = 4;

const Authors = () => {
  const [data, setData] = useState({});
  const [authorData, setAuthorData] = useState([]);
  const [page, setPage] = useState(1);
  // useEffect(async () => {
  //   const result = await authors.authorsList(
  //     `${ENV.API_URL}api/user_list-profile/?page=${page}&limit=${limit}`
  //   );

  //   setAuthorData(result.data.data.user_profile);
  //   console.log(result.data.data.user_profile);
  //   console.log(authorData)


  //   loadMore();
    
  // }, []);
  useEffect( () => {
    pagination();
  }, []);

  const pagination = async () => {
    const result = await authors.authorsList(
      `${ENV.API_URL}api/user_list-profile/?page=${page}&limit=${limit}`
    );
    let newArr = [...authorData, ...result.data.data.user_profile];
    setAuthorData(newArr);
    console.log(result.data.data.user_profile)
    if (result.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }

    setPage(page + 1);
  };
  // const loadMore = () => {
  //   $(".load-more .item").slice(0, 4).show();

  //   $("#load-btn").on("click", function (e) {
  //     e.preventDefault();
  //     $(".load-more .item:hidden").slice(0, 4).slideDown();
  //     if ($(".load-more .item:hidden").length == 0) {
  //       $("#load-btn").fadeOut("slow");
  //     }
  //   });
  // };
  return (
    <section className="popular-collections-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="intro text-center">
              <span>Authors</span>
              <h3 className="mt-3 mb-0">Our Creators</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                deleniti asperiores sit.
              </p>
            </div>
          </div>
        </div>
        <div className="row items">
         {authorData ? authorData.map((item, idx) => {   
          {console.log(item.banner_image)}
          return (
              <div key={`ad_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card no-hover text-center">
                  {item.banner_image ? (
                    <div className="image-over ">
                      <a href={`/author?${item.user_id}`}>
                        <img
                          className="card-img-top image-container-nft"
                          src={`${ENV.API_URL_image_media}${item.banner_image}`}
                          alt="cover image"
                        />
                      </a>

                      <a className="seller" href={`/author?${item.user_id}`}>
                        <div className="seller-thumb avatar-lg">
                          <img
                            className="rounded-circle"
                            src={`${ENV.API_URL_image_media}${item.profile_image}`}
                            alt="profile image"
                          />
                        </div>
                      </a>
                    </div>
                  ) : (
                    <div className="image-over">
                      <a href={`/author?${item.user_id}`}>
                        <img
                          className="card-img-top"
                          src="img/auction_2.jpg"
                          alt="cover image"
                        />
                      </a>

                      <a className="seller" href={`/author?${item.user_id}`}>
                        <div className="seller-thumb avatar-lg">
                          <img
                            className="rounded-circle"
                            src="img/auction_2.jpg"
                            alt=""
                          />
                        </div>
                      </a>
                    </div>
                  )}
  
                  <div className="card-caption col-12 p-0">
                    <div className="card-body mt-4">
                      <a href={`/author?${item.user_id}`}>
                        <h5 className="name_trim">
                          {item.first_name} {item.last_name}
                        </h5>
                      </a>
                      <p className="description_trim">
                        {item.about}
                      </p>
                      <div className="social-icons d-flex justify-content-center my-3">
                        {item.facebook_link ? (
                          <a
                            className="facebook"
                            href={item.facebook_link}
                          >
                            <i className="fab fa-facebook-f" />
                            <i className="fab fa-facebook-f" />
                          </a>
                        ) : (
                          ""
                        )}
                        {item.twitter_link ? (
                          <a
                            className="twitter"
                            href={item.twitter_link}
                          >
                            <i className="fab fa-twitter" />
                            <i className="fab fa-twitter" />
                          </a>
                        ) : (
                          ""
                        )}
                        {item.google_plus_link ? (
                          <a
                            className="google-plus"
                            href={item.google_plus_link}
                          >
                            <i className="fab fa-google-plus-g" />
                            <i className="fab fa-google-plus-g" />
                          </a>
                        ) : (
                          ""
                        )}
                        {item.vine_link ? (
                          <a
                            className="vine"
                            href={item.vine_link}
                          >
                            <i className="fab fa-vine" />
                            <i className="fab fa-vine" />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }):"asgi"} 
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
  );
};

export default Authors;
