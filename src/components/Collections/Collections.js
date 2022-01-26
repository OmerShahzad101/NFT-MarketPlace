import React, { useEffect, useState } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
import Category from "../../services/category.service";
import $ from "jquery";

let limit = 4;
const initialData = {
  heading: "Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const Collections = () => {
  const [initData, setInitData] = useState(initialData);
  const [collectionData, setCollectionData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    const result = await Category.category(`${ENV.API_URL}api/category_list/`);
    setCategories(result.data.data.results);
    console.log(result.data.data.results);
    // all();
    // $("#myElement label:first").addClass("active");
    // const res = await Collection.collection(
    //   `${ENV.API_URL}api/collection_list/`
    // );
    // setCollectionData(res.data.data.results);
    pagination();
  }, []);

  const specificCategory = async (id) => {
    const res = await Category.category(
      `${ENV.API_URL}api/specific_catgory_collection-data/${id}/`
    );
    setCollectionData(res.data.data.category_data);
  };

  const all =  async() => {

    setPage(page * 0 + 1);
    setCollectionData([]);
    // pagination();
    const resu = await Collection.collection(
      `${ENV.API_URL}api/collection_list/?page=${page}&limit=${limit}`
    );
    let newArr = [...collectionData, resu.data.data.results];
    setCollectionData(newArr);
    // console.log("hi");
    // console.log(resu);
    // console.log(newArr);

    if (resu.data.data.count === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
  };

  const pagination = async () => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/collection_list/?page=${page}&limit=${limit}`
    );
    let newArr = [...collectionData, ...res.data.data.results];
    setCollectionData(newArr);
    console.log("hi");
    console.log(res);
    console.log(newArr);

    if (res.data.data.count === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setPage(page + 1);
  };

  return (
    <>
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
                {console.log(categories)}
                <label
                  onClick={() => all()}
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
                          onClick={() => specificCategory(category.id)}
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
                              src={`${ENV.API_URL_image}${item.banner_image}`}
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
                                src={`${ENV.API_URL_image}${item.logo_image}`}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                        <div className="card-caption col-12 p-0">
                          <div className="card-body mt-4">
                            <a href={`/collectionDetail?${item.id}`}>
                              <h5 className="mb-2">
                                {item.collection_name
                                  ? item.collection_name
                                  : item.name}
                              </h5>
                              <span>{item.category}</span>
                              <br></br>
                            </a>
                            <span>{item.description}</span>
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
    </>
  );
};

export default Collections;

// var newArray = collectionData.concat(paginationRes.data.data.results);
// setCollectionData(newArray);
// console.log(paginationRes.data.data.count);
