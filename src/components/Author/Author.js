import { ENV } from "../../env";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import authors from "../../services/authors.service";

const Author = () => {
  const [authorNft, setAuthorNft] = useState([]);
  const arr = window.location.href.split("?");
  const id = arr[1];

  useEffect(() => {
    const fetchData = async () => {
      const res = await authors.authorsList(
        `${ENV.API_URL}api/specific_user_nft_data/${id}`
      );
      setAuthorNft(res.data.data.user_data);
    };
    fetchData();
  }, []);
  return (
    <section className="author-area explore-area popular-collections-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-3">
            <div>Author</div>
            {authorNft[0] ? (
              <div className="card no-hover text-center">
                <div className="image-over">
                  {authorNft[0].banner_image ? (
                    <img
                      className="card-img-top"
                      src={`${ENV.API_URL_image_media}${authorNft[0].banner_image}`}
                      alt=""
                    />
                  ) : (
                    <img
                      className="card-img-top"
                      src="/img/auction_2.jpg"
                      alt=""
                    />
                  )}
                  <div className="author">
                    <div className="author-thumb avatar-lg">
                      {authorNft[0].profile_image ? (
                        <img
                          className="rounded-circle"
                          src={`${ENV.API_URL_image_media}${authorNft[0].profile_image}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="rounded-circle"
                          src="/img/auction_2.jpg"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-caption col-12 p-0">
                  <div className="card-body mt-4">
                    <h5 className="mb-3">{authorNft[0].user_name}</h5>
                    <p className="my-3">
                      {authorNft[0].about !== null ? authorNft[0].about : ""}
                    </p>
                    <p className="my-3">{authorNft[0].user_email}</p>

                    <div className="social-icons d-flex justify-content-center my-3">
                      {authorNft[0].facebook_link ? (
                        <a
                          className="facebook"
                          href={authorNft[0].facebook_link}
                        >
                          <i className="fab fa-facebook-f" />
                          <i className="fab fa-facebook-f" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorNft[0].twitter_link ? (
                        <a className="twitter" href={authorNft[0].twitter_link}>
                          <i className="fab fa-twitter" />
                          <i className="fab fa-twitter" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorNft[0].google_plus_link ? (
                        <a
                          className="google-plus"
                          href={authorNft[0].google_plus_link}
                        >
                          <i className="fab fa-google-plus-g" />
                          <i className="fab fa-google-plus-g" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorNft[0].vine_link ? (
                        <a className="vine" href={authorNft[0].vine_link}>
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
            ) : (
              "Loading..."
            )}
          </div>
          <div className="col-12 col-md-8 py-4">
            {authorNft ? (
              <div className="row items auhtor-nfts">
                {authorNft.map((item, idx) => {
                  return item.nft_name !== null ? (
                    <div
                      key={`eds_${idx}`}
                      className="col-12 col-md-6 item explore-item"
                    >
                      <div className="card no-hover text-center">
                        <div className="image-over">
                          <Link to={`/nft-details?${item.nft_id}`}>
                            <img
                              className="card-img-top"
                              src={`${ENV.API_URL_image_media}${item.nft_image}`}
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="card-caption col-12 p-0">
                          <div className="card-body mt-4">
                            <Link to={`/nft-details?${item.nft_id}`}>
                              <h5 className="mb-2">{item.nft_name}</h5>
                            </Link>
                            <span>{item.nft_description}</span>
                            <hr />
                          </div>
                          <div className="card-bottom d-flex justify-content-between">
                            <span>{"$" + item.nft_price}</span>
                            <span>{item.nft_size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no_data">
                      <span>No item to explore</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no_data">
                <span>No item to explore</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
