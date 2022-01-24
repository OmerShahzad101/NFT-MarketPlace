import React, { Component } from "react";
import $ from "jquery";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import Category from "../../services/category.service";
import SimpleReactValidator from "simple-react-validator";
const placeholderImg = "";
class CreateCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nft: {
        banner_image: "",
        logo_image:"",
        name: "",
        description: "",
        categories: "",
      },
    };
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "This field is required.", // will override all messages
      },
    });
  }

  onFileChange(e) {
    let file = e.target.files[0];
    let fileId = e.target.id;

    if (file)
      if (file.type.includes("image")) {
        let { nft } = this.state;
        nft = { ...nft, [e.target.name]: file };
        this.setState({ nft }, () => {
          if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $(`#nft-${fileId}`).attr("src", e.target.result);
              $("#nft-image-label").html("File selected");
            };
            reader.readAsDataURL(file);
          }
        });
      } else {
        $(`#nft-${fileId}`).attr("src", placeholderImg);
        file = {};
      }
  }
  

  onChange(e) {
    let { name, value } = e.target;
    let { nft } = this.state;
    nft = { ...nft, [name]: value };
    this.setState({ nft }, () => {});
  }
  componentDidMount() {
    this.getCategories();
  }
  getCategories = async () => {
    const res = await Category.category(`${ENV.API_URL}api/category_list/`);
    var nft = { ...this.state.nft };
    nft.categories = res.data;
    this.setState({ nft });
    console.log(res.data);
  };

  reset = () => {
    const nft = {
      image: "",
      name: "",
      description: "",
      categories: "",
    };
    this.setState({ nft });
  };

  submit = async (e) => {
    e.preventDefault();

    console.log(
      "this.validator.allValid(): ",
      this.validator.allValid(),
      this.state.nft
    );

    this.setState(
      {
        isSubmitted: true,
        formValid: this.validator.allValid() ? true : false,
      },
      () => {
        const { formValid } = this.state;
        if (formValid) {
          this.setState(
            {
              loader: true,
            },
            async () => {
              const { nft } = this.state;
              var formData = new FormData();
              for (const key in nft)
                if (nft[key]) formData.append(key, nft[key]);

              // this.props.createNFT(nft)
              const res = await Collection.collectionPost(
                `${ENV.API_URL}api/create_collection/`,
                formData
              );
              // if (res.success) {
              //     this.reset()
              //     toast.success(`Success! ${res.message}`)
              //     this.setState({ loader: false }, () => {
              //         // this.props.history.push('/')
              //         window.location = '/'
              //     })
              // }
              // else
              //     this.setState({ errors: res.message, loader: false })
            }
            
          );
        } else {
          this.validator.showMessages();
          this.setState(
            {
              errors: "Please fill all required fields in valid format.",
              formValid: false,
            },
            () => {
              $("#create-nft").scrollTop(0, 0);
            }
          );
        }
      }
    );
    
  };

  // submit = async (e) => {
  //   e.preventDefault();
  //   const { nft } = this.state;
  //   var formData = new FormData();
  //   for (const key in nft) {
  //     if (nft[key]) {
  //       formData.append(key, nft[key]);
  //     }
  //   }
  //   const res = await Collection.collectionPost(
  //     `${ENV.API_URL}api/create_collection/`,
  //     formData
  //   );
  //   console.log(res);
  // };
  render() {
    const { nft, errors, loader, isSubmitted } = this.state;
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4">
              <AuthorProfile createNFT_data={nft} />
            </div>
            <div className="col-12 col-md-7">
              <div className="mt-5 mt-lg-0 mb-4 mb-lg-5">
                <div className="intro">
                  <div className="intro-content">
                    <span>Get Started</span>
                    <h3 className="mt-3 mb-0">Create Item</h3>
                  </div>
                </div>
              </div>
              {isSubmitted && errors && (
                <div className="row">
                  <div className="col-12">
                    <span id="create-nft-err" className="text-danger">
                      {errors}
                    </span>
                  </div>
                </div>
              )}
              <form id="create-nft" className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="banner_image"
                          accept=".png,.jpeg,.jpg"
                          onChange={(e) => this.onFileChange(e)}
                          name="banner_image"
                        />
                        <label
                          id="nft-image-label"
                          className="custom-file-label"
                          htmlFor="banner_image"
                        >
                          Choose Banner File *
                        </label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {this.validator.message(
                        "image",
                        nft.banner_image,
                        "required"
                      )}
                    </span>
                  </div>

                  <div className="col-12">
                    <div className="input-group form-group mt-3">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="logo_image"
                          accept=".png,.jpeg,.jpg"
                          onChange={(e) => this.onFileChange(e)}
                          name="logo_image"
                        />
                        <label
                          id="nft-image-label"
                          className="custom-file-label"
                          htmlFor="logo_image"
                        >
                          Choose Logo File *
                        </label>
                      </div>
                    </div>
                    <span className="text-danger">
                      {this.validator.message(
                        "image",
                        nft.logo_image,
                        "required"
                      )}
                    </span>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Collection Name *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.name}
                      />
                      <span className="text-danger">
                        {this.validator.message("name", nft.name, "required")}
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-md-12">
                    <div class="form-group select-collection position-relative">
                      <select
                        className="form-control"
                        name="category"
                        onChange={(e) => this.onChange(e)}
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
                        {nft.categories
                          ? nft.categories.map(function (category, i) {
                              return (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "name",
                          nft.category,
                          "required"
                        )}
                      </span>
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
                      <span className="text-danger">
                        {this.validator.message(
                          "description",
                          nft.description,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
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

export default CreateCollection;