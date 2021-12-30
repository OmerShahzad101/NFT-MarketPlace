import React, { Component } from "react";
import axios from "axios";

const initData = {
  //   pre_heading: "Signup",
  heading: "Create an Account",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const socialData = [
  {
    id: "1",
    link: "facebook",
    icon: "fab fa-facebook-f",
  },
  {
    id: "2",
    link: "twitter",
    icon: "fab fa-twitter",
  },
  {
    id: "3",
    link: "google-plus",
    icon: "fab fa-google-plus-g",
  },
];

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initData: {},
      data: [],
      error: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
      first_name_error: "",
      last_name_error: "",
      email_error: "",
      password_error: "",
      re_password_error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    // this.validate = this.validate.bind(this);
    this.Register = this.Register.bind(this);
    this.Send = this.Send.bind(this);
  }

  componentDidMount() {
    this.setState({
      initData: initData,
      data: socialData,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  Send(event) {
    event.preventDefault();
    console.log(`Email: ${this.state.email}`);
  }

  // validate() {
  //   const { first_name, last_name, email, password, re_password } = this.state;
  //   let isValid = true;

  //   if (first_name.length == "") {
  //     this.error.first_name_error = "first_name cannot be empty";
  //     isValid = false;
  //   } else if (first_name.length < 3) {
  //     this.error.first_name_error = "Minimum first_name length is 3 Character";
  //     isValid = false;
  //   } else if (first_name.length > 30) {
  //     this.error.first_name_error = "Maximum first_name length is 30 Character";
  //     isValid = false;
  //   } else {
  //     this.error.first_name_error = "";
  //   }

  //   if (last_name.length == "") {
  //     this.error.last_name_error = "last_name cannot be empty";
  //     isValid = false;
  //   } else if (last_name.length < 3) {
  //     this.error.last_name_error = "Minimum last_name length is 3 Character";
  //     isValid = false;
  //   } else if (last_name.length > 30) {
  //     this.error.last_name_error = "Maximum last_name length is 30 Character";
  //     isValid = false;
  //   } else {
  //     this.error.last_name_error = "";
  //   }
  //   setState({ ...this.error });
  //   return isValid ?   Register(isValid) : console.log("isvalide false");
  // }

  Register(event) {
    event.preventDefault();

    axios
      .post(
        "https://nft-marketeplace-fkg7q.ondigitalocean.app/user/auth/users/",
        this.state
      )
      .then((res) => {
        alert(res.data.message);
        alert("hi");
      });
  }

  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                {/* <span>{this.state.initData.pre_heading}</span> */}
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                <p>{this.state.initData.content}</p>
              </div>
              {/* Item Form */}
              <form
                className="item-form card no-hover"
                onSubmit={this.Register}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="First Name"
                        required="required"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last Name"
                        value={this.state.last_name}
                        required="required"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        placeholder="Email"
                        required="required"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        required="required"
                        onChange={this.handleChange}
                        value={this.state.password}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control"
                        name="re_password"
                        placeholder="Confirm Password"
                        required="required"
                        onChange={this.handleChange}
                        value={this.state.re_password}
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
                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                      Sign Up
                    </button>
                  </div>
                  <div className="col-12">
                    <span className="d-block text-center mt-4">
                      Already have an account? <a href="/login">Login</a>
                    </span>
                  </div>
                  <div className="col-12">
                    <hr />
                    <div className="other-option">
                      <span className="d-block text-center mb-4">Or</span>
                      {/* Social Icons */}
                      <div className="social-icons d-flex justify-content-center">
                        {this.state.data.map((item, idx) => {
                          return (
                            <a
                              key={`lsd_${idx}`}
                              className={item.link}
                              href="#"
                            >
                              <i className={item.icon} />
                              <i className={item.icon} />
                            </a>
                          );
                        })}
                      </div>
                    </div>
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

export default Signup;
