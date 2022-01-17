import React from "react";
import { useEffect, useState } from "react";
import { ENV } from "../../env";
import updateProfile from "../../services/updateProfile.service";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const updateProfileSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Email is required"),
  email: yup.string().email().required("Please provide email"),
  about: yup.string().required("Please write about yourself"),
  facebook: yup.string().url(),
});

const UpdateProfile = () => {
  const [updateUser, setUpdateUser] = useState();
  const arr = window.location.href.split("?");
  const id = arr[1];

  useEffect(async () => {
    const result = await updateProfile.updateProfileUserGet(
      `${ENV.API_URL}api/auth/users/me`
    );
    console.log(result);
    setUpdateUser(result.data);
  }, []);

  return (
    <div>
      <section
        className="breadcrumb-area overlay-dark d-flex align-items-center"
        style={{
          backgroundImage: "",
        }}
      ></section>
      <div className="container author-area my-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card no-hover text-center mt-5">
              <div className="image-over">
                <img className="card-img-top" src="{data.img}" alt="" />

                <div className="author">
                  <div className="author-thumb avatar-lg">
                    <img
                      className="rounded-circle"
                      src="{data.authorImg}"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="card-caption col-12 p-0">
                <div className="card-body mt-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                    <div className="input-group-append">
                      <button>
                        <i className="icon-docs" />
                      </button>
                    </div>
                  </div>
                  <p>Username</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-4">
              <div className="intro-content">
                <span>Update Profile</span>
              </div>
            </div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                subject: "",
                message: "",
              }}
              validationSchema={updateProfileSchema}
              onSubmit={async (values) => {
                console.log(values);
                // const res = await contact.contacts(
                //   `${ENV.API_URL}api/contact_list/`,
                //   `http://192.168.99.229:8000/api/contact_list/`,
                //   values
                // );
                // console.log(res);
              }}
            >
              {({ touched, errors, isSubmitting, values }) => (
                <Form id="contact-form" className="item-form card no-hover">
                  <div className="row">
                    <div className="col-12">
                      <div className="input-group form-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            name="file"
                            onChange={(event) => {}}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Banner Image
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-group form-group my-4">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            name="file"
                            onChange={(event) => {}}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Profile Image
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="email"
                          className={`form-control
                              ${
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="email"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.username && errors.username
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="username"
                          placeholder="Username"
                        />
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.first_name && errors.first_name
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="first_name"
                          placeholder="First Name"
                        />
                        <ErrorMessage
                          component="div"
                          name="first_name"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.last_name && errors.last_name
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="last_name"
                          placeholder="Last Name"
                        />
                        <ErrorMessage
                          component="div"
                          name="last_name"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          as="textarea"
                          type="text"
                          className={`form-control
                              ${
                                touched.about && errors.about
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="about"
                          placeholder="About"
                        />
                        <ErrorMessage
                          component="div"
                          name="about"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.facebook_link && errors.facebook_link
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="facebook_link"
                          placeholder="facebook_link"
                        />
                        <ErrorMessage
                          component="div"
                          name="facebook_link"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.twitter_link && errors.twitter_link
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="twitter_link"
                          placeholder="twitter_link"
                        />
                        <ErrorMessage
                          component="div"
                          name="twitter_link"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.vine_link && errors.vine_link
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="vine_link"
                          placeholder="vine_link"
                        />
                        <ErrorMessage
                          component="div"
                          name="vine_link"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          className={`form-control
                              ${
                                touched.google_plus_link &&
                                errors.google_plus_link
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="google_plus_link"
                          placeholder="google_plus_link"
                        />
                        <ErrorMessage
                          component="div"
                          name="google_plus_link"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
