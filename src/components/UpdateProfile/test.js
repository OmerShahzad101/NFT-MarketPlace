
import React from "react";
import { useEffect, useState } from "react";
import { ENV } from "../../env";
import updateProfile from "../../services/updateProfile.service";
import $ from "jquery";

const placeholderImg = "";

const UpdateProfile = () => {
  // __ __ initial state __ __ //
  const initialdata = {
    first_name: "",
    last_name: "",
    profile_image: "",
    banner_image: "",
    about: "",
    facebook_link: "",
    twitter_link: "",
    vine_link: "",
    google_plus_link: "",
  };

  //__ __ Hook functions __ __ //
  const [updateUser, setUpdateUser] = useState(initialdata);
  const arr = window.location.href.split("?");
  const id = arr[1];

  useEffect(async () => {
    const res = await updateProfile.updateProfileUserGet(
      `${ENV.API_URL}api/auth/users/me/`
    );
    setUpdateUser(res);
    // console.log(res);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const onFileChange = (e) => {
    let { name } = e.target;
    let file = e.target.files[0];
    let fileId = e.target.id;
    if (file)
      if (file.type.includes("image")) {
        let _obj = updateUser;
        _obj[name] = file;

        setUpdateUser(_obj);

        // __ redner __ //
        var reader = new FileReader();
        reader.onload = function (e) {
          $(`.rounded-circle`).attr("src", e.target.result);
          $("#custom-file-label").html("File selected");
        };
        reader.readAsDataURL(file);
      } else {
        $(`#nft-${fileId}`).attr("src", placeholderImg);
        file = {};
      }
  };

  const update_data = async () => {
    var formData = new FormData();
    console.log("d" + JSON.stringify(updateUser));
    for (let key in updateUser) {
      if (typeof updateUser[key] === "object") {
        let arr = [];
        arr.push(updateUser[key][0]);
        formData.append(`user_profile`, JSON.stringify(arr));
      } else {
        formData.append(key, updateUser[key]);
      }
    }

    const res = await updateProfile.updateProfileUser(
      `${ENV.API_URL}/update_profile/${id}/`,
      formData
    );
    console.log(res);
  };

  return (
    <div>
      <section
        className="breadcrumb-area overlay-dark d-flex align-items-center"

        // style={{
        //   backgroundImage: `${updateUser.user_profile[0].banner_image} ? url(${ENV.API_URL_image}${updateUser.user_profile[0].banner_image}) : "banner image "`,

        // }}
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
                      // src=""
                      // src={`${ENV.API_URL_image}${updateUser.user_profile[0].profile_image})`}
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
                      disabled
                      value={updateUser ? updateUser.email : ""}
                    />
                    <div className="input-group-append">
                      <button>
                        <i className="icon-docs" />
                      </button>
                    </div>
                  </div>
                  <p>
                    {updateUser
                      ? updateUser.first_name + " " + updateUser.last_name
                      : "Name"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-4">
              <div className="intro-content">
                <span>Update Profile</span>
              </div>
            </div>
            {updateUser ? (
              <form id="contact-form" className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group form-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="inputGroupFile01"
                          name="banner_image"
                          onChange={onFileChange}
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
                          name="profile_image"
                          onChange={onFileChange}
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
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        disabled
                        value={updateUser ? updateUser.email : ""}
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={updateUser ? updateUser.username : ""}
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={updateUser ? updateUser.first_name : ""}
                        placeholder="First Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={updateUser ? updateUser.last_name : ""}
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <textarea
                        type="text"
                        className="form-control"
                        name="about"
                        value={updateUser ? updateUser.about : ""}
                        placeholder="About"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="facebook_link"
                        value={updateUser ? updateUser.facebook_link : ""}
                        placeholder="Facebook Link"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        value={updateUser ? updateUser.twitter_link : ""}
                        name="twitter_link"
                        placeholder="Twitter Link"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        value={updateUser ? updateUser.vine_link : ""}
                        className="form-control"
                        name="vine_link"
                        onChange={handleChange}
                        placeholder="Vine Link"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        value={updateUser ? updateUser.google_plus_link : ""}
                        onChange={handleChange}
                        className="form-control"
                        name="google_plus_link"
                        placeholder="Google + Link"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn w-100 mt-3 mt-sm-4"
                      type="submit"
                      onClick={() => update_data()}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              " serching"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
