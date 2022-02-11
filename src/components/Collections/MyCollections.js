import React, { useEffect, useState } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
// import Category from "../../services/category.service";
import { Link } from "react-router-dom";
import $ from "jquery"

const initialData = {
  heading: "My Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};
let limit = 4;
const MyCollections = () => {
  const [initData] = useState(initialData);
  const [collectionData, setCollectionData] = useState([]);
  const [page, setPage] = useState(1);
  //   const [categories, setCategories] = useState([]);
  const arr = window.location.href.split("?");
  const id = arr[1];
  useEffect(() => {
    // const result = await Category.category(`${ENV.API_URL}api/category_list/`);
    // setCategories(result.data);

    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/specific-user-collection/${id}?limit=${limit}&page=${page}`
    );
    let newArr = [...collectionData, ...res.data.data.user_collection];
    setCollectionData(newArr);
    if (res.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setPage(page + 1);
  };
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
          <Link className="btn content-btn" to={"/create-collection"}>
            Add Collection
          </Link>
        </div>
        <div className="row items popular-collections-area">
          {collectionData ? (
            collectionData.map((item, idx) => {
              return item.collection_name !== null ? (
                <div
                  key={`cd_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                >
                  <div className="card no-hover text-center">
                    <div className="image-over">
                      <Link to={`/collectionDetail?${item.id}`}>
                        <img
                          className="card-img-top image-container"
                          src={`${ENV.API_URL_image_media}${item.banner_image}`}
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
                            src={`${ENV.API_URL_image_media}${item.logo_image}`}
                            alt=""
                          />
                        </div>
                      </a>
                    </div>
                    <div className="card-caption col-12 p-0">
                      <div className="card-body mt-4">
                        <Link to={`/collectionDetail?${item.collection_id}`}>
                          <h5 className="mb-2">{item.collection_name}</h5>
                        </Link>
                        <span className="description_trim">
                          {item.collection_description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no_data mt-3">
                  <span>Create your first collection</span>
                </div>
              );
            })
          ) : (
            <div className="no_data mt-3">
              <span>Create your first collection</span>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={() => fetchData()}
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

export default MyCollections;
