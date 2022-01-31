import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import authors from "../../services/authors.service";

const Author = () => {
  const arr = window.location.href.split("?");
  const id = arr[1];

  const [authorData, setAuthorData] = useState([]);
  const [authorNft, setAuthorNft] = useState([]);

  useEffect(async () => {
    const result = await authors.specificAuthor(
      `${ENV.API_URL}api/profile/crud/${id}`
    );
    console.log(result.data);
    setAuthorData(result.data);
    const res = await authors.specificAuthorNft(
      `${ENV.API_URL}api/specific_user_nft_data/${id}`
    );

    console.log(res.data.user_data);
    let nftdata = res.data.user_data;
    setAuthorNft(nftdata);
    console.log(nftdata);
  }, []);

  {
    console.log(authorNft);
  }
  return (
    <section className="author-area explore-area popular-collections-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            {authorData ? (
              <div className="card no-hover text-center">
                <div className="image-over">
                  {authorData.banner_image ? (
                    <img
                      className="card-img-top"
                      src={`${ENV.API_URL_image_media}${authorData.banner_image}`}
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
                      {authorData.profile_image ? (
                        <img
                          className="rounded-circle"
                          src={`${ENV.API_URL_image_media}${authorData.profile_image}`}
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
                    <h5 className="mb-3">
                      {authorData.first_name} {authorData.last_name}
                    </h5>
                    <p className="my-3">{authorData.about}</p>
                    <p className="my-3">{authorData.email}</p>

                    <div className="social-icons d-flex justify-content-center my-3">
                      {authorData ? (
                        <a className="facebook" href={authorData.facebook_link}>
                          <i className="fab fa-facebook-f" />
                          <i className="fab fa-facebook-f" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorData ? (
                        <a className="twitter" href={authorData.twitter_link}>
                          <i className="fab fa-twitter" />
                          <i className="fab fa-twitter" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorData ? (
                        <a
                          className="google-plus"
                          href={authorData.google_plus_link}
                        >
                          <i className="fab fa-google-plus-g" />
                          <i className="fab fa-google-plus-g" />
                        </a>
                      ) : (
                        ""
                      )}
                      {authorData ? (
                        <a className="vine" href={authorData.vine_link}>
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
          {console.log(";loikujyhtgf")}
          {console.log(authorNft)}
          {/* {console.log(authorNft.collection_name[0]    )} */}
          <div className="col-12 col-md-8 ">
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
                              src={`${ENV.API_URL_image_media}${item.collection_image}`}
                              alt=""
                            />
                          </Link>

                          <a
                            className="author"
                            href={`/collectionDetail?${item.id}`}
                          >
                            <div className="author-thumb avatar-lg">
                              <img
                                className="rounded-circle"
                                src={`${ENV.API_URL_image_media}${item.collection_logo}`}
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
              <div className="checking">"No collection to explore"</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
