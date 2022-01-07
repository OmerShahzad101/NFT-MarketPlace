import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import contact from "../../services/contact.service";
import { ENV } from "../../env";

const initData = {
  heading: "Get In Touch",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};
const phoneRegExp = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please provide first name")
    .matches(
      /^([aA-zZ\s]{4,15})$/,
      "Only alphabets are allowed for this field, atleast 4 alphabets"
    ),
  email: yup.string().email().required("Please provide email"),
  phone: yup
    .string()
    .required("Please provide phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
  message: yup.string().required("Please write your message"),
  subject: yup.string().required("Please provied subject"),
});
const Contact = () => {
  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
            <Formik
              initialValues={{
                name: "",
                email: "",
                subject: "",
                message: "",
              }}
              validationSchema={contactSchema}
              onSubmit={async (values) => {
                console.log(values);
                const res = await contact.contacts(
                  `${ENV.API_URL}api/contact_list/`,
                  values
                );
                console.log(res);
              }}
            >
              {({ touched, errors, isSubmitting, values }) =>
                !isSubmitting ? (
                  <Form id="contact-form" className="item-form card no-hover">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group mt-3">
                          <Field
                            type="text"
                            className={`form-control
                              ${
                                touched.name && errors.name ? "is-invalid" : ""
                              }`}
                            name="name"
                            placeholder="Name"
                          />
                          <ErrorMessage
                            component="div"
                            name="name"
                            className="invalid-feedback"
                          />
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
                            type="phone"
                            className={`form-control
                              ${
                                touched.phone && errors.phone
                                  ? "is-invalid"
                                  : ""
                              }`}
                            name="phone"
                            placeholder="Phone"
                          />
                          <ErrorMessage
                            component="div"
                            name="phone"
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
                                touched.subject && errors.subject
                                  ? "is-invalid"
                                  : ""
                              }`}
                            name="subject"
                            placeholder="Subject"
                          />
                          <ErrorMessage
                            component="div"
                            name="subject"
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
                                touched.message && errors.message
                                  ? "is-invalid"
                                  : ""
                              }`}
                            name="message"
                            placeholder="Message"
                          />
                          <ErrorMessage
                            component="div"
                            name="message"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn w-100 mt-3 mt-sm-4"
                          type="submit"
                        >
                          <i className="icon-paper-plane mr-2" />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </Form>
                ) : (
                  <div>
                    <h1 className="p-3 mt-5">Form Submitted</h1>

                    <div className="alert alert-success mt-3">
                      Thank for your connecting with us. Here's what we got from
                      you !
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">Name: {values.name}</li>
                      <li className="list-group-item">Email: {values.email}</li>
                      <li className="list-group-item">Phone: {values.phone}</li>
                      <li className="list-group-item">
                        Message: {values.message}
                      </li>
                    </ul>
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

export default Contact;
