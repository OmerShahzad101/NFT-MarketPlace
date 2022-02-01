import React from "react";
import { useEffect, useState } from "react";
import { ENV } from "../../env";
import updateProfile from "../../services/updateProfile.service";
import $ from "jquery";
import Notifications, { notify } from "react-notify-toast";

const placeholderImg = "";

const UpdateProfile = () => {
  // __ __ initial state __ __ //
  const initialdata = {
    // file: "",
    first_name: "",
    last_name: "",
    user_profile: {
      profile_image: "",
      banner_image: "",
      about: "",
      facebook_link: "",
      twitter_link: "",
      vine_link: "",
      google_plus_link: "",
    },
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
    console.log(res);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  /**
   *
   * @param {eventObject} e
   */
  const handleChange2 = (e) => {
    debugger;
    const { name, value } = e.target;
    let obj = updateUser.user_profile;
    obj[name] = value;
    setUpdateUser({
      ...updateUser,
      user_profile: obj,
    });
  };

  /**
   *
   * @param {eventObject} e
   */
  const onFileChange = (e) => {
    debugger;
    let { name } = e.target;
    let file = e.target.files[0];
    let fileId = e.target.id;
    if (file)
      if (file.type.includes("image")) {
        let _obj = updateUser;
        _obj.user_profile[name] = file;

        setUpdateUser(_obj);

        // __ redner __ //
        if (name == "banner_image") {
          var reader = new FileReader();
          reader.onload = function (e) {
            $(`.img-banner_image`).attr("src", e.target.result);
            $(".label-banner").html("File selected");
          };
        } else {
          var reader = new FileReader();
          reader.onload = function (e) {
            $(`.rounded-circle`).attr("src", e.target.result);
            $(".label-profile").html("File selected");
          };
        }
        reader.readAsDataURL(file);
      } else {
        $(`#nft-${fileId}`).attr("src", placeholderImg);
        file = {};
      }
  };

  const update_data = async (e) => {
    var formData = new FormData();

    for (let key in updateUser) {
      if (typeof updateUser[key] === "object") {
        for (let subKey in updateUser[key]) {
          formData.append(`${subKey}`, updateUser[key][subKey]);
        }
      } else {
        formData.append(key, updateUser[key]);
      }
    }

    const res = await updateProfile.updateProfileUser(
      `${ENV.API_URL}api/update_profile/${id}/`,
      formData
    );
    if (res.status === true) {
      notify.show("Updated Succesfully!", "success", 3000);
      // window.location = "/";
    } else {
      notify.show("Failed to Update!", "error", 3000);
    }
  };

  return (
    <section className="author-area">
      <Notifications />
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card no-hover text-center mt-5">
              <div className="image-over">
                <img
                  className="card-img-top img-banner_image"
                  src="/img/auction_2.jpg"
                  alt=""
                />

                <div className="author">
                  <div className="author-thumb avatar-lg">
                    {updateUser.user_profile ? (
                      <img
                        className="rounded-circle img-profile_image"
                        src="/img/auction_2.jpg"
                        alt=""
                      />
                    ) : (
                      <img
                        className="rounded-circle img-profile_image"
                        // src={updateUser.user_profile[0].profile_image ? `${ENV.API_URL_image}${updateUser.user_profile[0].profile_image}` : "img/auction_2.jpg"}

                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="card-caption col-12 p-0">
                <div className="card-body mt-4">
                  <div className="input-group">
                    {/* { console.log(updateUser.user_profile[0].about)} */}

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
                          className="custom-file-label label-banner"
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
                          className="custom-file-label label-profile"
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
                        // onChange={handleChange}
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
                        value={
                          updateUser.user_profile
                            ? updateUser.user_profile.about
                            : ""
                        }
                        placeholder="About"
                        onChange={handleChange2}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="facebook_link"
                        value={
                          updateUser.user_profile
                            ? updateUser.user_profile.facebook_link
                            : ""
                        }
                        placeholder="Facebook Link"
                        onChange={handleChange2}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        value={
                          updateUser.user_profile
                            ? updateUser.user_profile.twitter_link
                            : ""
                        }
                        name="twitter_link"
                        placeholder="Twitter Link"
                        onChange={handleChange2}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        value={
                          updateUser.user_profile
                            ? updateUser.user_profile.vine_link
                            : ""
                        }
                        className="form-control"
                        name="vine_link"
                        onChange={handleChange2}
                        placeholder="Vine Link"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        value={
                          updateUser.user_profile
                            ? updateUser.user_profile.google_plus_link
                            : ""
                        }
                        onChange={handleChange2}
                        className="form-control"
                        name="google_plus_link"
                        placeholder="Google + Link"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn w-100 mt-3 mt-sm-4"
                      type="button"
                      onClick={(e) => update_data()}
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
    </section>
  );
};

export default UpdateProfile;
