import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import authors from "../../services/authors.service";

const Author = () => {
  const arr = window.location.href.split("?");
  const id = arr[1];

  const [authorData, setAuthorData] = useState("");
  const [authorNft, setAuthorNft] = useState("");

  useEffect(async () => {
    const result = await authors.specificAuthor(
      `${ENV.API_URL}api/profile/crud/${id}`
    );
    setAuthorData(result);
    console.log(result);

    const res = await authors.specificAuthorNft(
      `${ENV.API_URL}api/specific_user_nft_data/${id}`
    );
    
    setAuthorNft(res.user_data);
    
    console.log( res.user_data);
    console.log(authorNft)
  }, []);

  return (
    <section className="author-area explore-area popular-collections-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            {authorData.user_profile ? (
              <div className="card no-hover text-center">
                <div className="image-over">
                  <img
                    className="card-img-top"
                    src={`${ENV.API_URL_image}${authorData.user_profile[0].banner_image}`}
                    alt=""
                  />
                  <div className="author">
                    <div className="author-thumb avatar-lg">
                      <img
                        className="rounded-circle"
                        src={`${ENV.API_URL_image}${authorData.user_profile[0].profile_image}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="card-caption col-12 p-0">
                  <div className="card-body mt-4">
                    <h5 className="mb-3">
                      {authorData.first_name}
                      {authorData.last_name}
                    </h5>
                    <p className="my-3">{authorData.user_profile[0].about}</p>

                    <div className="social-icons d-flex justify-content-center my-3">
                      {authorData.user_profile[0] ? (
                        <a
                          className="facebook"
                          href={authorData.user_profile[0].facebook_link}
                        >
                          <i className="fab fa-facebook-f" />
                          <i className="fab fa-facebook-f" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorData.user_profile[0] ? (
                        <a
                          className="twitter"
                          href={authorData.user_profile[0].twitter_link}
                        >
                          <i className="fab fa-twitter" />
                          <i className="fab fa-twitter" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorData.user_profile[0] ? (
                        <a
                          className="google-plus"
                          href={authorData.user_profile[0].google_plus_link}
                        >
                          <i className="fab fa-google-plus-g" />
                          <i className="fab fa-google-plus-g" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorData.user_profile[0] ? (
                        <a
                          className="vine"
                          href={authorData.user_profile[0].vine_link}
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
            ) : (
              "Loading..."
            )}
          </div>
          <div className="col-12 col-md-8">
            {authorNft ? (
              <div className="row items explore-items auhtor-nfts">
                {authorNft.map((item, idx) => {
                  return (
                    <div
                      key={`eds_${idx}`}
                      className="col-12 col-md-6 item explore-item"
                    >
                      <div className="card no-hover text-center">
                        <div className="image-over">
                          <Link to={`/collectionDetail?${item.id}`}>
                            <img
                              className="card-img-top"
                              src={`${ENV.API_URL_image}${item.collection_image}`}
                              alt=""
                            />
                          </Link>

                          <a className="author" href={`/collectionDetail?${item.id}`}>
                            <div className="author-thumb avatar-lg">
                              <img
                                className="rounded-circle"
                                src={`${ENV.API_URL_image}${item.collection_logo}`}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>

                        <div className="card-caption col-12 p-0">
                          <div className="card-body mt-4">
                            <Link to={`/collectionDetail?${item.id}`}>
                              <h5 className="mb-2">{item.collection_name}</h5>
                            </Link>
                            <span>{item.collection_description}</span>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
