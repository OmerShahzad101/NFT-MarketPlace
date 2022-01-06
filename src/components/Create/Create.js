import React, { Component } from "react";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import NFT from "../../services/nft.service";
import { ENV } from "../../env";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as yup from "yup";

const createNftSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please provide first name")
    .matches(
      /^([aA-zZ\s]{4,15})$/,
      "Only alphabets are allowed for this field, atleast 4 alphabets"
    ),
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4">
              {/* Author Profile */}
              <AuthorProfile createNFT_data={this.state} />
            </div>
            <div className="col-12 col-md-7">
              <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                <div className="intro-content">
                  <span>Get Started</span>
                  <h3 className="mt-3 mb-0">Create Item</h3>
                </div>
              </div>
              {/* Item Form */}
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  royalty: "",
                  size: "",
                  no_of_copies: "",
                  sale_type: "put_on_sale",
                  total_views: "",
                  price: "",
                  collection: "",
                  owner: "15",
                }}
                validationSchema={createNftSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                
                {({ touched, errors, isSubmitting }) =>
                  !isSubmitting ? (
                    <Form className="item-form card no-hover">
                      <div className="row">
                        <div className="col-12">
                          <div className="input-group form-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="inputGroupFile01"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group mt-3">
                            <Field
                              type="text"
                              name="name"
                              placeholder="Item Name"
                              className={`form-control
                              ${
                                touched.name && errors.name ? "is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="name"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <Field
                              as="textarea"
                              name="description"
                              placeholder="Description"
                              className={`form-control
                        ${
                          touched.description && errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="description"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <Field
                              type="text"
                              name="price"
                              placeholder="Item Price"
                              className={`form-control
                              ${
                                touched.price && errors.price
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="price"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div class="form-group select-collection position-relative">
                            <Field
                              as="select"
                              name="collection"
                              className={`form-control
                              ${
                                touched.collection && errors.collection
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <ErrorMessage
                                component="div"
                                name="collection"
                                className="invalid-feedback"
                              />

                              <option value="" hidden disabled selected>
                                Select Collection
                              </option>
                              <option name="a" value="a">
                                a
                              </option>
                              <option name="ab" value="ab">
                                ab
                              </option>
                              <option name="av" value="av">
                                av
                              </option>
                              <option name="ad" value="ad">
                                ad
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <Field
                              type="text"
                              name="size"
                              placeholder="Size"
                              className={`form-control
                              ${
                                touched.size && errors.size ? "is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="size"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <Field
                              type="text"
                              name="no_of_copies"
                              placeholder="No of Copies"
                              className={`form-control
                              ${
                                touched.no_of_copies && errors.no_of_copies ? "is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="no_of_copies"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        {/* <div className="col-12">
                    <div className="form-group mt-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          defaultValue="option1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Put on Sale
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          defaultValue="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Instant Sale Price
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          defaultValue="option3"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Unlock Purchased
                        </label>
                      </div>
                    </div>
                  </div> */}

                        <div className="col-12">
                          <button
                            className="btn w-100 mt-3 mt-sm-4"
                            type="submit"
                          >
                            Create Item{" "}
                          </button>
                        </div>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      <h1 className="p-3 mt-5">Form Submitted</h1>
                    </div>
                  )
                }

              </Formik>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Create;
