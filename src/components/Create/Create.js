import React, { Component } from "react";
import $ from "jquery";
import NFT from "../../services/nft.service";
import { ENV } from "../../env";
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import SimpleReactValidator from "simple-react-validator";
import Collection from "../../services/collections.service";
import jwt_decode from "jwt-decode";
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
        collections: "",
        collection: "",
        size: "",
        no_of_copies: "",
        expiry_date: "",
        // status: 1 // 1 = put on sale, 2 = instant sale price, 3 = unlock purchased
        sale_type: "is_put_on_sale",
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

  onChange(e, sale_type = "") {
  
    let { name, value } = e.target;
    if (sale_type) value = sale_type;

    let { nft } = this.state;
    nft = { ...nft, [name]: value };
    this.setState({ nft }, () => {});
    console.log(nft);
    
  }

  reset = () => {
    const nft = {
      image: "",
      name: "",
      description: "",
      price: "",
      collection: "",
      size: "",
      no_of_copies: "",
      sale_type: "1",
      expiry_date: "0",
    };
    this.setState({ nft });
  };

  submit = (e) => {
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
              const res = await NFT.nft(
                `${ENV.API_URL}api/create_nft/`,
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
              console.log(nft);
              console.log(res);
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

  componentDidMount() {
    this.getCollections();
  }
  getCollections = async () => {
    const token = JSON.parse(localStorage.getItem("access"));
    const decoded = jwt_decode(token);
    const id = decoded.user_id;

    const res = await Collection.collection(
      `${ENV.API_URL}api/specific-user-collection/${id}`
    );
    console.log(res);
    var nft = { ...this.state.nft };

    nft.collections = res.data.data.user_collection;
console.log(nft);
    this.setState({ nft });
  };

  render() {
    const { nft, errors, loader, isSubmitted } = this.state;

    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4">
              {/* Author Profile */}
              <AuthorProfile createNFT_data={nft} />
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
              {/* Item Form */}
              <form id="create-nft" className="item-form card no-hover">
                {/* onClick={(e) => this.submit(e)} */}
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
                    <span className="text-danger">
                      {this.validator.message("image", nft.image, "required")}
                    </span>
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
                      <span className="text-danger">
                        {this.validator.message("name", nft.name, "required")}
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
                      <span className="text-danger">
                        {this.validator.message("price", nft.price, "required")}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div class="form-group select-collection position-relative">
                      <select
                        className="form-control"
                        name="collection"
                        onChange={(e) => this.onChange(e)}
                        required
                      >
                        <option
                          value=""
                          selected="selected"
                          hidden="hidden"
                          required
                        >
                          Choose Collection *
                        </option>
                
                        {nft.collections
                          ? nft.collections.map(function (collections, i) {
                              return (
                                <option value={collections.id}>
                                  {collections.collection_name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "name",
                          nft.collections,
                          "required"
                        )}
                      </span>
                    </div>
                    {/* <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="collection"
                        placeholder="Collection *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.collection}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "collection",
                          nft.collection,
                          "required"
                        )}
                      </span>
                    </div> */}
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
                        name="no_of_copies"
                        placeholder="No. of Copies *"
                        required="required"
                        onChange={(e) => this.onChange(e)}
                        defaultValue={nft.no_of_copies}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "no_of_copies",
                          nft.no_of_copies,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="sale_type"
                          id="putOnSale"
                          defaultValue="is_put_on_sale"
                          checked={
                            nft.sale_type === "is_put_on_sale" ? true : false
                          }
                          value={nft.sale_type}
                          onChange={(e) => this.onChange(e, "is_put_on_sale")}
                        />
                        <label
                          onChange={(e) => this.onChange(e, "is_put_on_sale")}
                          className="form-check-label"
                          htmlFor="putOnSale"
                        >
                          Put on Sale
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="sale_type"
                          id="instantSalePrice"
                          defaultValue="is_instant_sale_price"
                          checked={
                            nft.sale_type === "is_instant_sale_price"
                              ? true
                              : false
                          }
                          value={nft.sale_type}
                          onChange={(e) =>
                            this.onChange(e, "is_instant_sale_price")
                          }
                        />
                        <label
                          onChange={(e) =>
                            this.onChange(e, "is_instant_sale_price")
                          }
                          className="form-check-label"
                          htmlFor="instantSalePrice"
                        >
                          Instant Sale Price
                        </label>
                      </div>
                    </div>
                  </div>
                  {$("#instantSalePrice").is(":checked") ? (
                    <div className="col-12">
                      <div className="form-group mt-2">
                        <input
                          type="date"
                          className="form-control expiry_date"
                          name="expiry_date"
                          placeholder="Expiry Date *"
                          required="required"
                          onChange={(e) => this.onChange(e)}
                          defaultValue={nft.expiry_date}
                        />
                        <span className="text-danger">
                          {this.validator.message(
                            "expiry_date",
                            nft.expiry_date,
                            "required"
                          )}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
