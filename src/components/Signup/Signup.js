import React, { Component, useState } from "react";
import { ENV } from "../../env";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import auth from "../../services/auth.service";
import { Link } from "react-router-dom";

const initialData = {
  heading: "Create an Account",
};
const signupSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Please provide first name")
    .matches(
      /^([aA-zZ\s]{4,15})$/,
      "Only alphabets are allowed for this field, atleast 4 alphabets"
    ),

  last_name: yup
    .string()
    .required("Please provide last Name")
    .matches(
      /^([aA-zZ\s]{4,15})$/,
      "Only alphabets are allowed for this field, atleast 4 alphabets"
    ),
  email: yup.string().email().required("Please provide email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  re_password: "",
};

const Signup = () => {
  const [initData, setInitData] = useState(initialData);

  return (
    <section className="author-area login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={async (values) => {
                console.log(values);
                const res = await auth.register(
                  `${ENV.API_URL}api/auth/users/`,
                  values
                );

                console.log(res);
              }}
            >
              {({ touched, errors, isSubmitting, values }) =>
                !isSubmitting ? (
                  <Form className="item-form card no-hover">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <Field
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className={`form-control
                              ${
                                touched.first_name && errors.first_name
                                  ? "is-invalid"
                                  : ""
                              }`}
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
                            name="last_name"
                            placeholder="Last Name"
                            className={`form-control
                              ${
                                touched.last_name && errors.last_name
                                  ? "is-invalid"
                                  : ""
                              }`}
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
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            className={`form-control
                              ${
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : ""
                              }`}
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
                            name="password"
                            placeholder="Password"
                            className={`form-control
                              ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="password"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group mt-3">
                          <Field
                            type="text"
                            name="re_password"
                            placeholder="Confirm Password"
                            className={`form-control
                              ${
                                touched.re_password && errors.re_password
                                  ? "is-invalid"
                                  : ""
                              }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="re_password"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              checked
                              defaultValue="option1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              I agree to <a href="#">Privacy Policy</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn w-100 mt-3 mt-sm-4"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className="col-12">
                        <hr />
                        <div className="other-option">
                          <span className="d-block text-center mb-4">Or</span>
                          <strong className="signup_link d-block text-center">
                            Already have an account? <Link to="/login">Login</Link>
                          </strong>
                        </div>
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
};

export default Signup;
