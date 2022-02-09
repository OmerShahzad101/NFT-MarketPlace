import React, { useEffect, useState } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
import { Link } from "react-router-dom";
// import Category from "../../services/category.service";

const initialData = {
  preHeading: "Exclusive Collecton",
  heading: "Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const HomeCollection = () => {
  const [initData] = useState(initialData);
  const [collectionData, setCollectionData] = useState();
  // const [categories, setCategories] = useState([]);
  // const [data, setData] = useState({});
  let limit = 4;
  let page = 1;
  useEffect(async () => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/collection_list/?page=${page}&limit=${limit}`
    );
    // const result = await Category.category(`${ENV.API_URL}api/category_list/`);
    setCollectionData(res.data.data.results);
    // setCategories(result.data.data.results);
  }, []);

  return (
    <>
      <section className="explore-area">
        <div className="popular-collections-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="intro d-flex justify-content-between align-items-end m-0">
                  <div className="intro-content">
                    <span>{initData.preHeading}</span>
                    <h3 className="mt-3 mb-0">{initData.heading}</h3>
                  </div>
                  <div className="intro-btn">
                    <a className="btn content-btn text-left" href="collection">
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row items">
              {collectionData ? (
                collectionData.map((item, idx) => {
                  return (
                    <div
                      key={`cd_${idx}`}
                      className="col-12 col-sm-6 col-lg-3 item"
                    >
                      <div className="card no-hover text-center">
                        <div className="image-over">
                          <Link to={`/collectionDetail?${item.id}`}>
                            <img
                              className="card-img-top image-container"
                              src={`${ENV.API_URL_image}${item.banner_image}`}
                              alt=""
                            />
                          </Link>
                          {/* Seller */}
                          <a
                            className="seller"
                            href={`/collectionDetail?${item.id}`}
                          >
                            <div className="seller-thumb avatar-lg">
                              <img
                                className="rounded-circle"
                                src={`${ENV.API_URL_image}${item.logo_image}`}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                        <div className="card-caption col-12 p-0">
                          <div className="card-body mt-4">
                            <Link to={`/collectionDetail?${item.id}`}>
                              <h5 className="mb-2">{item.name}</h5>
                            </Link>
                            <span className="description_trim">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no_data">
                  <span>No Collection Found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCollection;
