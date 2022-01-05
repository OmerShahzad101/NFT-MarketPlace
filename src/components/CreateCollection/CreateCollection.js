import React, { Component } from "react";

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
class Thumb extends Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}
class CreateCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-8 ">
              <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                <div className="intro-content">
                  <span>Get Started</span>
                  <h3 className="mt-3 mb-0">Create Collection</h3>
                </div>
              </div>
              {/* Item Form */}
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                }}
                validationSchema={createNftSchema}
                onSubmit={(values) => {
                  console.log(values);
                  alert(
                    JSON.stringify(
                      {
                        fileName: values.file.name,
                        type: values.file.type,
                        size: `${values.file.size} bytes`,
                      },
                      null,
                      2
                    )
                  );
                }}
              >
                {({ touched, errors, setFieldValue, isSubmitting, values }) =>
                  !isSubmitting ? (
                    <Form className="item-form card no-hover">
                      <div className="row">
                        <div className="col-12">
                          <div className="input-group form-group">
                            <div className="custom-file">
                              <input
                                id="file"
                                name="file"
                                type="file"
                                className="custom-file-input"
                                onChange={(event) => {
                                  setFieldValue(
                                    "file",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              <label for="file" className="custom-file-label">
                                File upload
                              </label>
                            </div>
                            <Thumb file={values.file} />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-group form-group">
                            <div className="custom-file">
                              <input
                                id="file"
                                name="file"
                                type="file"
                                className="custom-file-input"
                                onChange={(event) => {
                                  setFieldValue(
                                    "file",
                                    event.currentTarget.files[1]
                                  );
                                }}
                              />
                              <label for="file" className="custom-file-label">
                                File upload
                              </label>
                            </div>
                            <Thumb file={values.file} />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-group form-group">
                            <div className="custom-file">
                              <input
                                id="file"
                                name="file"
                                type="file"
                                className="custom-file-input"
                                onChange={(event) => {
                                  setFieldValue(
                                    "file",
                                    event.currentTarget.files[2]
                                  );
                                }}
                              />
                              <label for="file" className="custom-file-label">
                                File upload
                              </label>
                            </div>
                            <Thumb file={values.file} />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group mt-3">
                            <Field
                              type="text"
                              name="name"
                              placeholder="Name"
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

                        <div className="col-12 col-md-12">
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
                                Select Catagory
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

                        <div className="col-12">
                          <button
                            className="btn w-100 mt-3 mt-sm-4"
                            type="submit"
                          >
                            Create Collection{" "}
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

export default CreateCollection;
