import axios from "axios";
import React, { Component } from "react";
import AuthorProfile from "../AuthorProfile/AuthorProfile";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      royalty: "",
      size: "",
      no_of_copies: "",
      sale_type: "",
      total_views: "",
      price: "",
      collection: "",
      owner: "",
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  createNFT = (e) => {
    e.preventDefault();
    const { name, description, size, no_of_copies, price, collection } = this.state;
    const payload = { name, description, size, no_of_copies, price, collection };
    console.log(payload);
    axios
      .post("http://192.168.99.71:8001/nft/create_nft/", payload)
      .then((res) => {});
  };
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
              {/* Intro */}
              <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                <div className="intro-content">
                  <span>Get Started</span>
                  <h3 className="mt-3 mb-0">Create Item</h3>
                </div>
              </div>
              {/* Item Form */}
              <form
                className="item-form card no-hover"
                onSubmit={this.createNFT}
              >
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
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Item Name"
                        required="required"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="description"
                        placeholder="Description"
                        cols={30}
                        rows={3}
                        defaultValue={""}
                        value={this.state.description}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        placeholder="Item Price"
                        required="required"
                        value={this.state.price}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div class="form-group select-collection position-relative">
                      <select
                      name="collection"
                        value={this.state.collection}
                        onChange={this.handleInputChange}
                        class="form-control "
                      >
                        <option value="" hidden disabled selected>
                          Select Collection
                        </option>
                        <option name="a" value="a">a</option>
                        <option name="ab" value="ab">ab</option>
                        <option name="av" value="av">av</option>
                        <option name="ad" value="ad">ad</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="size"
                        className="form-control"
                        placeholder="Size"
                        required="required"
                        value={this.state.size}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="no_of_copies"
                        placeholder="No of Copies"
                        required="required"
                        value={this.state.no_of_copies}
                        onChange={this.handleInputChange}
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
                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">
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
