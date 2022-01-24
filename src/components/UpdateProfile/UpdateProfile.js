import React from "react";
import { useEffect, useState } from "react";
import { ENV } from "../../env";
import updateProfile from "../../services/updateProfile.service";
import $ from "jquery";

const placeholderImg = "";

const UpdateProfile = () => {
  const initialdata = {
    file: "",
    first_name: "",
    last_name: "",
    user_profile: {
      about: "",
      facebook_link: "",
      twitter_link: "",
      vine_link: "",
      google_plus_link: "",
    },
  };

  const [updateUser, setUpdateUser] = useState(initialdata);
  const arr = window.location.href.split("?");
  const id = arr[1];

  useEffect(async () => {
    const res = await updateProfile.updateProfileUserGet(
      `${ENV.API_URL}api/auth/users/me/`
    );
    console.log(res);
    setUpdateUser(res);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    let obj = updateUser.user_profile;
    obj[0][name] = value;
    setUpdateUser({
      ...updateUser,
      user_profile: obj,
    });
    console.log(updateUser);
  };

  const onFileChange = (e) => {
    let file = e.target.files[0];
    let fileId = e.target.id;
    console.log(file);

    if (file)
      if (file.type.includes("image")) {
        updateUser = { ...updateUser, [e.target.name]: file };
        setUpdateUser(
          {
            updateUser,
          },
          () => {
            if (file) {
              console.log(file);
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
  };

  const update_data = async () => {
    var formData = new FormData();
    for (const key in updateUser)
      if (updateUser[key]) formData.append(key, updateUser[key]);
    console.log(formData);
    const res = await updateProfile.updateProfileUser(
      `${ENV.API_URL}api/auth/users/me/`,
      formData
    );
    console.log(res);
  };

  // const update_data = async () => {
  //   const result = await updateProfile.updateProfileUser(
  //     `${ENV.API_URL}api/auth/users/me/`,
  //     updateUser
  //   );
  //   console.log(result);
  // };

  return (
    <div>
      {/* {console.log(
        updateUser.user_profile[0]
          ? updateUser.user_profile[0].twitter_link
          : "",
        "updateUserupdateUserupdateUserupdateUserupdateUser"
      )} */}
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
                      src=""
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
                    />
                    <div className="input-group-append">
                      <button>
                        <i className="icon-docs" />
                      </button>
                    </div>
                  </div>
                  <p>Username</p>
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
                          name="file"
                          onChange={() => onFileChange}
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
                          name="file"
                          onChange={() => onFileChange}
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
                        value={
                          updateUser.user_profile[0]
                            ? updateUser.user_profile[0].about
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
                          updateUser.user_profile[0]
                            ? updateUser.user_profile[0].facebook_link
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
                          updateUser.user_profile[0]
                            ? updateUser.user_profile[0].twitter_link
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
                          updateUser.user_profile[0]
                            ? updateUser.user_profile[0].vine_link
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
                          updateUser.user_profile[0]
                            ? updateUser.user_profile[0].google_plus_link
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
