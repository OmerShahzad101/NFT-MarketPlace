import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import updateProfile from "../../services/updateProfile.service";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const updateProfileSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Email is required"),
  // .test('Unique username', 'username already in use',
  //     function (value) {
  //         return new Promise((resolve, reject) => {
  //             axios.get(`http://localhost:8003/api/u/user/${value}/available`)
  //                 .then((res) => {
  //                     resolve(true)
  //                 })
  //                 .catch((error) => {
  //                     if (error.response.data.content === "The email has already been taken.") {
  //                         resolve(false);
  //                     }
  //                 })
  //         })
  //     }
  // ),
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
      // `${ENV.API_URL}api/profile/crud/${id}`
      `http://192.168.99.229:8000/api/profile/crud/${id}`
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
                  <div className="social-icons d-flex justify-content-center my-3">
                    {/* {socialData.map((item, idx) => {
                    return (
                      <a key={`asd_${idx}`} className={item.link} href="#">
                        <i className={item.icon} />
                        <i className={item.icon} />
                      </a>
                    );
                  })} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-4">
              <div className="intro-content">
                <span>Update Profile</span>
                {/* <h3 className="mt-3 mb-0">Update Profile</h3> */}
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
                                touched.facebook && errors.facebook
                                  ? "is-invalid"
                                  : ""
                              }`}
                          name="facebook"
                          placeholder="Facebook"
                        />
                        <ErrorMessage
                          component="div"
                          name="facebook"
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
