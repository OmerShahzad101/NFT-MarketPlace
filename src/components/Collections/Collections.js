import React, { useEffect, useState } from "react";
import { ENV } from "../../env";
import Category from "../../services/category.service";
import $ from "jquery";
import { Link } from "react-router-dom";

const initialData = {
  heading: "Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const Collections = () => {
  const [initData] = useState(initialData);
  const [collectionData, setCollectionData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  let [cid, setCid] = useState();

  const [page, setPage] = useState(1);

  const limit = 8;
  useEffect(async () => {
    setLoader(true);
    const result = await Category.category(`${ENV.API_URL}api/category_list/`);
    setCategories(result.data.data);
    $("html,body").animate({ scrollTop: 0 }, "slow");

    const res = await Category.category(
      `${ENV.API_URL}api/specific_catgory_collection-data/0?page=${page}&limit=${limit}`
    );
    let newArr = res.data.data.category_data;
    setCollectionData(newArr);
    
    setPage(page + 1);
    setCid(0);
    setLoader(false);
    if (res.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    $("#myElement label:first").addClass("active");
  }, []);

  const specificCategory = async (id, page) => {
  
    setCid(id);
    const res = await Category.category(
      `${ENV.API_URL}api/specific_catgory_collection-data/${id}?page=${page}&limit=${limit}`
    );
    let newArr = res.data.data.category_data;
    setCollectionData(newArr);

    if (res.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    } else {
      $("#loadmorebtn").fadeIn("slow");
    }
    setPage(page + 1);
  };

  const pagination = async (cid) => {
    let id = cid;
    const res = await Category.category(
      `${ENV.API_URL}api/specific_catgory_collection-data/${id}?page=${page}&limit=${limit}`
    );

    let newArr = [...collectionData, ...res.data.data.category_data];
    setCollectionData(newArr);

    if (res.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setPage(page + 1);
  };

  return (
    <>
      {loader ? (
        <div className="fullpage-loader-holder">
          <div className="fullpage-loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
          <body></body>
        </div>
      ) : (
        <section className="explore-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                <div className="intro text-center mb-4">
                  <h3 className="mt-3 mb-0">{initData.heading}</h3>
                  <p>{initData.content}</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-12">
                <div
                  id="myElement"
                  className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4"
                  data-toggle="buttons"
                >
                  <label
                    onClick={() => specificCategory(0, 1)}
                    className="btn d-table text-uppercase p-2"
                  >
                    <input
                      type="radio"
                      defaultValue="All"
                      className="explore-btn"
                      checked
                    />
                    <span>All</span>
                  </label>

                  {categories
                    ? categories.map(function (category, i) {
                        return (
                          <label
                            onClick={() => specificCategory(category.id, 1)}
                            className="btn d-table text-uppercase p-2"
                          >
                            <input
                              type="radio"
                              defaultValue={category.name}
                              className="explore-btn"
                            />
                            <span>{category.name}</span>
                          </label>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
            <div className="row items  popular-collections-area">
              {collectionData
                ? collectionData.map((item, idx) => {
                    return item.collection_name !== null ? (
                      <div
                        key={`cd_${idx}`}
                        className="col-12 col-sm-6 col-lg-3 item"
                      >
                        <div className="card no-hover text-center">
                          <div className="image-over">
                            <Link
                              to={
                                item.collection_id
                                  ? `/collectionDetail?${item.collection_id}`
                                  : `/collectionDetail?${item.id}`
                              }
                            >
                              <img
                                className="card-img-top image-container"
                                src={`${ENV.API_URL_image_media}${item.banner_image}`}
                                alt=""
                              />
                            </Link>

                            <Link
                              className="seller"
                              to={
                                item.collection_id
                                  ? `/collectionDetail?${item.collection_id}`
                                  : `/collectionDetail?${item.id}`
                              }
                            >
                              <div className="seller-thumb avatar-lg">
                                <img
                                  className="rounded-circle"
                                  src={`${ENV.API_URL_image_media}${item.logo_image}`}
                                  alt=""
                                />
                              </div>
                            </Link>
                          </div>
                          <div className="card-caption col-12 p-0">
                            <div className="card-body mt-4">
                              <Link
                                to={
                                  item.collection_id
                                    ? `/collectionDetail?${item.collection_id}`
                                    : `/collectionDetail?${item.id}`
                                }
                              >
                                <h5 className="mb-2">{item.collection_name}</h5>
                              </Link>
                              <span className="description_trim">
                                {item.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no_data">
                        <span>No Collection Found</span>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <button
                  onClick={() => pagination(cid)}
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
export default Collections;
