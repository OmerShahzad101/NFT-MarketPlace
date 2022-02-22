import $ from "jquery";
import { ENV } from "../../env";
import React, { useEffect, useState } from "react";
import authors from "../../services/authors.service";
import { Link } from "react-router-dom";
let limit = 8;

const Authors = () => {
  const [authorData, setAuthorData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    $('html,body').animate({scrollTop: 0}, 'slow');
    pagination();
  }, []);

  const pagination = async () => {
    const result = await authors.authorsList(
      `${ENV.API_URL}api/user_list-profile/?page=${page}&limit=${limit}`
    );
    let newArr = [...authorData, ...result.data.data.user_profile];
    setAuthorData(newArr);
    if (result.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }

    setPage(page + 1);
  };

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
          {authorData
            ? authorData.map((item, idx) => {
                return (
                  <div
                    key={`ad_${idx}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                  >
                    <div className="card no-hover text-center">
                      {item.banner_image ? (
                        <div className="image-over ">
                          <Link to={`/author?${item.user_id}`}>
                            <img
                              className="card-img-top image-container-nft"
                              src={`${ENV.API_URL_image_media}${item.banner_image}`}
                              alt="cover"
                            />
                          </Link>

                          <a
                            className="seller"
                            href={`/author?${item.user_id}`}
                          >
                            <div className="seller-thumb avatar-lg">
                              <img
                                className="rounded-circle"
                                src={`${ENV.API_URL_image_media}${item.profile_image}`}
                                alt="profile "
                              />
                            </div>
                          </a>
                        </div>
                      ) : (
                        <div className="image-over">
                          <Link to={`/author?${item.user_id}`}>
                            <img
                              className="card-img-top"
                              src="img/auction_2.jpg"
                              alt="cover "
                            />
                          </Link>

                          <a
                            className="seller"
                            href={`/author?${item.user_id}`}
                          >
                            <div className="seller-thumb avatar-lg">
                              <img
                                className="rounded-circle"
                                src="img/auction_2.jpg"
                                alt="avatar"
                              />
                            </div>
                          </a>
                        </div>
                      )}

                      <div className="card-caption col-12 p-0">
                        <div className="card-body mt-4">
                          <Link to={`/author?${item.user_id}`}>
                            <h5 className="name_trim m-0">
                              {item.first_name} {item.last_name}
                            </h5>
                          </Link>
                          <p className="description_trim mt-1 mb-0">{item.about}</p>
                          <div className="social-icons d-flex justify-content-center mt-1 mb-0">
                            {item.facebook_link ? (
                              <a className="facebook" href={item.facebook_link}>
                                <i className="fab fa-facebook-f" />
                                <i className="fab fa-facebook-f" />
                              </a>
                            ) : (
                              ""
                            )}
                            {item.twitter_link ? (
                              <a className="twitter" href={item.twitter_link}>
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
                              <a className="vine" href={item.vine_link}>
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
              })
            : "Loading"}
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
