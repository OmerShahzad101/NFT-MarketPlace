import React, { Component, useState } from "react";
import { ENV } from "../../env";
import auth from "../../services/auth.service";

const socialIcons = [
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
const Login = () => {
  const initialData = {
    heading: "Login to your Account",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  };
  const userInitialState = {
    email: "",
    password: "",
  };

  const [initData, setInitData] = useState(initialData);
  const [user, setUser] = useState(userInitialState);
  const [data, setData] = useState(socialIcons);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginCall = async (event) => {
    event.preventDefault();
    console.log(user.email);
    console.log(user.password);
    const res = await auth.login(`${ENV.API_URL}api/auth/jwt/create/`, user);
    if (res.data) {
      localStorage.setItem("access", JSON.stringify(res.data.access));
      localStorage.setItem("refresh", JSON.stringify(res.data.refresh));
      alert(res.data.status);
      alert("sucess");
    } else {
      alert(res.data.status);
      console.log(res);
      alert("error");
    }
    console.log(res);
  };

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
            <form className="item-form card no-hover" onSubmit={loginCall}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      required="required"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your Password"
                      required="required"
                      value={user.password}
                      onChange={handleChange}
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
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="col-12">
                  <hr />
                  <div className="other-option">
                    <span className="d-block text-center mb-4">Or</span>
                    {/* Social Icons */}
                    <div className="social-icons d-flex justify-content-center">
                      {data.map((item, idx) => {
                        return (
                          <a key={`lsd_${idx}`} className={item.link} href="#">
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
};

export default Login;
