import React, { useEffect , useState } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
import Category from "../../services/category.service";

const initialData = {
  heading: "Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const Collections = () => {
  const [initData, setInitData] = useState(initialData);
  const [collectionData, setCollectionData] = useState();
  const [categories, setCategories] = useState([]);
  const [data , setData]= useState({})

  useEffect(async () => {
    const res = await Collection.collection(`${ENV.API_URL}api/collection_list/`);
    const result = await Category.category(`${ENV.API_URL}api/category_list/`);
    setCollectionData(res.data);
    setCategories(result.data)
  },[]);

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
                className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4"
                data-toggle="buttons">
                {categories ? categories.map(function (category, i) {
                  return (
                    <label className="btn d-table text-uppercase p-2">
                      <input type="radio" defaultValue={category.name} className="explore-btn"/>
                      <span>{category.name}</span>
                    </label>
                  )
                }): ""}
              </div>
            </div>
          </div>
        </div>
        <div className="popular-collections-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="intro d-flex justify-content-between align-items-end m-0">
                  <div className="intro-content">
                    <span>{data.preHeading}</span>
                    <h3 className="mt-3 mb-0">{data.heading}</h3>
                  </div>
                  <div className="intro-btn">
                    <a className="btn content-btn text-left" href="collection">
                      {data.btnText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row items">
              {collectionData
                ? collectionData.map((item, idx) => {
                    return (
                      <div
                        key={`cd_${idx}`}
                        className="col-12 col-sm-6 col-lg-3 item"
                      >
                        <div className="card no-hover text-center">
                          <div className="image-over">
                            <a href={`/item-details?${item.id}`}>
                              <img
                                className="card-img-top"
                                src={
                                  "https://images.unsplash.com/photo-1638913976381-5b8ed66c36d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                }
                                // src={item.banner_image}
                                alt=""
                              />
                            </a>
                            {/* Seller */}
                            <a className="seller" href={`/item-details?${item.id}`}>
                              <div className="seller-thumb avatar-lg">
                                <img className="rounded-circle"
                                  // src={item.logo_image}
                                  src={
                                    "https://images.unsplash.com/photo-1638913976381-5b8ed66c36d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                  }
                                  alt=""
                                />
                              </div>
                            </a>
                          </div>
                          <div className="card-caption col-12 p-0">
                            <div className="card-body mt-4">
                              <a href={`/item-details?${item.id}`}>
                                <h5 className="mb-2">{item.name}</h5>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Collections;
