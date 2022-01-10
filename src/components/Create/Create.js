import React, { Component } from "react";
import NFT from "../../services/nft.service";
import { ENV } from "../../env";
import $ from "jquery";
import AuthorProfile from "../AuthorProfile/AuthorProfile";

const placeholderImg = "";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      formValid: true,
      loader: false,
      errors: "",
      nft: {
        image: "",
        name: "",
        description: "",
        price: "",
        royalty: "",
        size: "",
        copies: "",
        sale_type: "is_put_on_sale",
        collection: "2",
        owner:"8"
        // status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
      },
    };
   
  }

  onFileChange(e) {
    let file = e.target.files[0];
    let fileId = e.target.id;
    if (file)
      if (file.type.includes("image")) {
        let { nft } = this.state;
        nft = { ...nft, [e.target.name]: file };
        this.setState(
          {
            nft,
          },
          () => {
            if (file) {
              var reader = new FileReader();

              reader.onload = function (e) {
                $(`#nft-${fileId}`).attr("src", e.target.result);
                $("#nft-image-label").html("File selected");
              };
              reader.readAsDataURL(file);
            }
          }
        );
      } else {
        $(`#nft-${fileId}`).attr("src", placeholderImg);
        file = {};
      }
  }

  onChange(e, status = null) {
    let { name, value } = e.target;

    // if status is provided
    // if (status) value = status;

    let { nft } = this.state;
    nft = { ...nft, [name]: value };
    this.setState({ nft }, () => {});
  }

  reset = () => {
    const nft = {
      image: "",
      name: "",
      description: "",
      price: "",
      royalty: "",
      size: "",
      copies: "",
      sale_type: "is_put_on_sale",
      collection: "2",
      // status: 1, // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
    };
    this.setState({ nft });
  };

  submit = (e) => {
    e.preventDefault();

    const { formValid } = this.state;
    if (formValid) {
      this.setState(
        {
          loader: true,
        },
        async () => {
          const { nft } = this.state;
          var formData = new FormData();
          for (const key in nft) if (nft[key]) formData.append(key, nft[key]);

          const res = NFT.nft(`${ENV.API_URL}api/create_nft/`, formData);

          console.log(res);
          if (res.success) {
            this.reset();
            this.setState({ loader: false }, () => {
              window.location = "/";
            });
          } else this.setState({ errors: res.message, loader: false });
        }
      );
    }
  };
  render() {
    const { nft, errors, loader, isSubmitted } = this.state;

    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4">
              {/* Author Profile */}
              <AuthorProfile />
            </div>
            <div className="col-12 col-md-7">
              <div className="mt-5 mt-lg-0 mb-4 mb-lg-5">
                {/* Intro */}
                <div className="intro">
                  <div className="intro-content">
                    <span>Get Started</span>
                    <h3 className="mt-3 mb-0">Create Item</h3>
                  </div>
                </div>
                {/* Form Error */}
                {isSubmitted && errors && (
                  <div className="row">
                    <div className="col-12">
                      <span id="create-nft-err" className="text-danger">
                        {errors}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <form id="create-nft" className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="image"
                          accept=".png,.jpeg,.jpg"
                          onChange={(e) => this.onFileChange(e)}
                          name="image"
                        />
                        <label
                          id="nft-image-label"
                          className="custom-file-label"
                          htmlFor="image"
                        >
                          Choose file *
                        </label>
                      </div>
                     
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Item Name *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.name}
                      />
                     
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="description"
                        placeholder="Description *"
                        cols={30}
                        rows={3}
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.description}
                      />
                     
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        placeholder="Item Price *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.price}
                      />
                      
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="royalty"
                        placeholder="Royalty *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.royalty}
                      />
                     
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Size"
                        required="required"
                        name="size"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.size}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="copies"
                        placeholder="No. of Copies *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.copies}
                      />
                     
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <button
                      disabled={loader}
                      className="btn w-100 mt-3 mt-sm-4"
                      type="button"
                      onClick={(e) => this.submit(e)}
                    >
                      Create Item
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Create;

// ------------------------------------------
// ----------------------------------------
// -------------------------------------------
// ------------------------------------
// ----------------------------------------
// ------------------------------------------------
// ----------------------------------------------

// import React, { Component } from "react";
// import AuthorProfile from "../AuthorProfile/AuthorProfile";
// import NFT from "../../services/nft.service";
// import { ENV } from "../../env";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// import * as yup from "yup";
// import { useState } from "react/cjs/react.development";

// const createNftSchema = yup.object().shape({
//   name: yup
//     .string()
//     .required("Please provide first name")
//     .matches(
//       /^([aA-zZ\s]{4,15})$/,
//       "Only alphabets are allowed for this field, atleast 4 alphabets"
//     ),
//   description: yup.string().required("Please provide first name"),
//   price: yup.number().min(0.1).required("Please provide price"),
//   collection: yup.string().required("Please select collection"),
//   no_of_copies: yup.number().min(1).required("Please select collection"),
//   size: yup.string().required("Please define size of NFT"),
//  file: yup.mixed().required("A file is required"),

// });

// const Create = () => {
//   const nftInitialStates = {
//     name: "",
//     description: "",
//     royalty: "",
//     size: "",
//     no_of_copies: "",
//     sale_type: "is_put_on_sale",
//     total_views: "",
//     price: "",
//     collection: "",
//     owner: "15",
//     file: null,
//     fileName: "",
//     thumb: undefined,
//   };
//   const [ nftItem, setNftItem ] = useState(nftInitialStates)

//   return (
//     <section className="author-area">
//       <div className="container">
//         <div className="row justify-content-between">
//           <div className="col-12 col-md-4">
//             {/* Author Profile */}
//             <AuthorProfile createNFT_data={nftItem} />
//           </div>
//           <div className="col-12 col-md-7">
//             <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
//               <div className="intro-content">
//                 <span>Get Started</span>
//                 <h3 className="mt-3 mb-0">Create Item</h3>
//               </div>
//             </div>
//             {/* Item Form */}
//             <Formik
//               initialValues={nftItem}
//               validationSchema={createNftSchema}
//               onSubmit={(values) => {
//                 console.log(values);
//                 setNftItem(values);
//                 const res = NFT.nft(`${ENV.API_URL}api/create_nft/`, values);
//                 console.log(res);
//               }}
//             >
//               {({ touched, errors, isSubmitting, setFieldValue }) =>
//                 !isSubmitting ? (
//                   <Form className="item-form card no-hover">
//                     <div className="row">
//                       <div className="col-12">
//                         <div className="input-group form-group">
//                           <div className="custom-file">
//                             <input
//                               type="file"
//                               className="custom-file-input"
//                               id="inputGroupFile01"
//                               name="file"
//                               onChange={(event) => {
//                                 setFieldValue(
//                                   "file",
//                                   event.currentTarget.files[0]
//                                 );
//                                 setNftItem({
//                                   fileName: event.target.files[0].name,
//                                 });
//                               }}
//                             />
//                             <label
//                               className="custom-file-label"
//                               htmlFor="inputGroupFile01"
//                             >
//                               {nftItem.fileName
//                                 ? nftItem.fileName
//                                 : "Choose a File"}
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="form-group mt-3">
//                           <Field
//                             type="text"
//                             name="name"
//                             placeholder="Item Name"
//                             className={`form-control
//                               ${
//                                 touched.name && errors.name ? "is-invalid" : ""
//                               }`}

//                           />
//                           <ErrorMessage
//                             component="div"
//                             name="name"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="form-group">
//                           <Field
//                             as="textarea"
//                             name="description"
//                             placeholder="Description"
//                             className={`form-control
//                         ${
//                           touched.description && errors.description
//                             ? "is-invalid"
//                             : ""
//                         }`}
//                           />
//                           <ErrorMessage
//                             component="div"
//                             name="description"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <div className="form-group">
//                           <Field
//                             type="text"
//                             name="price"
//                             placeholder="Item Price"
//                             className={`form-control
//                               ${
//                                 touched.price && errors.price
//                                   ? "is-invalid"
//                                   : ""
//                               }`}
//                           />
//                           <ErrorMessage
//                             component="div"
//                             name="price"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <div class="form-group select-collection position-relative">
//                           <Field
//                             as="select"
//                             name="collection"
//                             className={`form-control
//                               ${
//                                 touched.collection && errors.collection
//                                   ? "is-invalid"
//                                   : ""
//                               }`}
//                           >
//                             <ErrorMessage
//                               component="div"
//                               name="collection"
//                               className="invalid-feedback"
//                             />

//                             <option value="" disabled selected>
//                               Select Collection
//                             </option>
//                             <option name="a" value="a">
//                               a
//                             </option>
//                             <option name="ab" value="ab">
//                               ab
//                             </option>
//                             <option name="av" value="av">
//                               av
//                             </option>
//                             <option name="ad" value="ad">
//                               ad
//                             </option>
//                           </Field>
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <div className="form-group">
//                           <Field
//                             type="text"
//                             name="size"
//                             placeholder="Size"
//                             className={`form-control
//                               ${
//                                 touched.size && errors.size ? "is-invalid" : ""
//                               }`}
//                           />
//                           <ErrorMessage
//                             component="div"
//                             name="size"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-12 col-md-6">
//                         <div className="form-group">
//                           <Field
//                             type="text"
//                             name="no_of_copies"
//                             placeholder="No of Copies"
//                             className={`form-control
//                               ${
//                                 touched.no_of_copies && errors.no_of_copies
//                                   ? "is-invalid"
//                                   : ""
//                               }`}
//                           />
//                           <ErrorMessage
//                             component="div"
//                             name="no_of_copies"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                       </div>
//                       {/* <div className="col-12">
//                     <div className="form-group mt-3">
//                       <div className="form-check form-check-inline">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="inlineRadioOptions"
//                           id="inlineRadio1"
//                           defaultValue="option1"
//                           defaultChecked
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="inlineRadio1"
//                         >
//                           Put on Sale
//                         </label>
//                       </div>
//                       <div className="form-check form-check-inline">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="inlineRadioOptions"
//                           id="inlineRadio2"
//                           defaultValue="option2"
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="inlineRadio2"
//                         >
//                           Instant Sale Price
//                         </label>
//                       </div>
//                       <div className="form-check form-check-inline">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="inlineRadioOptions"
//                           id="inlineRadio3"
//                           defaultValue="option3"
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="inlineRadio3"
//                         >
//                           Unlock Purchased
//                         </label>
//                       </div>
//                     </div>
//                   </div> */}

//                       <div className="col-12">
//                         <button
//                           className="btn w-100 mt-3 mt-sm-4"
//                           type="submit"
//                         >
//                           Create Item{" "}
//                         </button>
//                       </div>
//                     </div>
//                   </Form>
//                 ) : (
//                   <div>
//                     <h1 className="p-3 mt-5">Form Submitted</h1>
//                   </div>
//                 )
//               }
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Create;
