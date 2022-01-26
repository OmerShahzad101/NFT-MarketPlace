import React, { useEffect, useState } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
import Category from "../../services/category.service";
import $ from "jquery";
import { Link } from "react-router-dom";

const initialData = {
  heading: "My Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const MyCollections = () => {
  const [initData, setInitData] = useState(initialData);
  const [collectionData, setCollectionData] = useState();
  //   const [categories, setCategories] = useState([]);

  useEffect(async () => {
    // const result = await Category.category(`${ENV.API_URL}api/category_list/`);
    // setCategories(result.data);
    const arr = window.location.href.split("?");
    const id = arr[1];

    const res = await Collection.collection(
      `${ENV.API_URL}api/specific-user-collection/${id}`
    );
    console.log(res.data.data.user_collection);
    setCollectionData(res.data.data.user_collection);
  }, []);

  return (
    <section className="explore-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="intro text-center mb-5">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
          </div>
        </div>
        <div className="intro-btn text-right mr-4">
          <Link className="btn content-btn"  to={"/create-collection"}>
            Add Collection
          </Link>
        </div>
        {/* <div className="row justify-content-center text-center">
          <div className="col-12">
            <div
              id="myElement"
              className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4"
              data-toggle="buttons"
            >
              {console.log(categories)}
              {categories
                ? categories.map(function (category, i) {
                    return (
                      <label className="btn d-table text-uppercase p-2">
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
        </div> */}
        <div className="row items explore-items popular-collections-area">
          {console.log(collectionData)}
          {collectionData
            ? collectionData.map((item, idx) => {
                return (
                  <div
                    key={`cd_${idx}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                  >
                    <div className="card no-hover text-center">
                      <div className="image-over">
                        <a href={`/collectionDetail?${item.id}`}>
                          <img
                            className="card-img-top image-container"
                            src={`${ENV.API_URL_image_media}${item.banner_image}`}
                            alt=""
                          />
                        </a>
                        {/* Seller */}
                        <a
                          className="seller"
                          href={`/collectionDetail?${item.id}`}
                        >
                          <div className="seller-thumb avatar-lg">
                            <img
                              className="rounded-circle"
                              src={`${ENV.API_URL_image_media}${item.logo_image}`}
                              alt=""
                            />
                          </div>
                        </a>
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body mt-4">
                          <a href={`/collectionDetail?${item.id}`}>
                            <h5 className="mb-2">{item.collection_name}</h5>
                          </a>
                          <span>{item.collection_description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : "Loading ..."}
        </div>
      </div>
    </section>
  );
};

export default MyCollections;
