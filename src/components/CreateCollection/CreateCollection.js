import React, { useState, useEffect } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
import Category from "../../services/category.service";
import axios from "axios";
import S from "jquery";
const initialState = {
  name: "",
  description: "",
  category: "",
};

const CreateCollection = () => {
  const [categories, setCategories] = useState([]);
  const [collectionData, setCollectionData] = useState(initialState);
  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };
  const getCategories = async () => {
    const res = await Category.category(`${ENV.API_URL}api/category_list/`);
    setCategories(res.data);
  };
  const CreateCollection = async (e) => {
    e.preventDefault();
    console.log(collectionData);
    const res = await Collection.collectionPost(
      `${ENV.API_URL}api/create_collection/`,
      collectionData
    );
  };

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 ">
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Get Started</span>
                <h3 className="mt-3 mb-0">Create Collection</h3>
              </div>
            </div>
            <form
              className="item-form card no-hover"
              onSubmit={CreateCollection}
            >
              <div className="row ">
                <div className="col-12">
                  <div className="input-group form-group">
                    <div className="custom-file">
                      {/* <img alt="not found" width={"250px"} src={file1.file1} /> */}
                      <input
                        type="file"
                        className="custom-file-input"
                        onChange={(e) => onFileChange(e)}
                        name="logoImage"
                      />

                      <label className="custom-file-label">Logo Image * </label>
                    </div>
                  </div>
                </div>
                {/* ------------------------ */}
                <div className="col-12">
                  <div className="input-group form-group mt-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        // onChange={onImageChange}
                        name="bannerImage"
                      />
                      <label className="custom-file-label">
                        Banner Image *
                      </label>
                    </div>
                  </div>
                </div>
                {/* ------------------------------- */}

                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      onChange={handleChange}
                      value={collectionData.name}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-12">
                  <div class="form-group select-collection position-relative">
                    <select
                      className="form-control"
                      name="category"
                      onChange={handleChange}
                      required
                    >
                      <option
                        value=""
                        selected="selected"
                        hidden="hidden"
                        required
                      >
                        Choose Category *
                      </option>
                      {categories
                        ? categories.map(function (category, i) {
                            return (
                              <option value={category.id}>
                                {category.name}
                              </option>
                            );
                          })
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      rows={3}
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                      value={collectionData.description}
                    />
                  </div>
                </div>
                {/* {console.log(file1.file1)} */}
                <div className="col-12">
                  <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                    Create Collection{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
