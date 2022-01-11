import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import updateProfile from "../../services/updateProfile.service";




const UpdateProfile = () => {
  const [updateUser, setUpdateUser] = useState();

  useEffect(async () => {
    const id = JSON.parse(localStorage.getItem("access"));
    const result = await updateProfile.updateProfileUserGet(`http://192.168.99.229:8000/api/profile/crud/${id}`);
    console.log(result);
    setUpdateUser(result.data);
    
  }, []);
  

  return (
    <div>
      <section
        className="breadcrumb-area overlay-dark d-flex align-items-center"
        style={{
          backgroundImage: "",
        }}
      ></section>
      <div className="row">
        <div className="col-lg-4">
          <div className="card no-hover text-center">
            <div className="image-over">
              <img className="card-img-top" src="{data.img}" alt="" />
              
              <div className="author">
                <div className="author-thumb avatar-lg">
                  <img className="rounded-circle" src="{data.authorImg}" alt="" />
                </div>
              </div>
            </div>
            <div className="card-caption col-12 p-0">
              <div className="card-body mt-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="{data.authorId}"
                  />
                  <div className="input-group-append">
                    <button>
                      <i className="icon-docs" />
                    </button>
                  </div>
                </div>
                <div className="social-icons d-flex justify-content-center my-3">
                  {/* {socialData.map((item, idx) => {
                    return (
                      <a key={`asd_${idx}`} className={item.link} href="#">
                        <i className={item.icon} />
                        <i className={item.icon} />
                      </a>
                    );
                  })} */}
                </div>
                <a className="btn btn-bordered-white btn-smaller" href="#">
                  zdc
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Update Profile</span>
                <h3 className="mt-3 mb-0">Update Profile</h3>
              </div>
            </div>
            <form
              className="item-form card no-hover"
              onSubmit="{createCollection}"
            >
              <div className="row ">
                <div className="col-12">
                  <div className="input-group form-group">
                    <div className="custom-file">
                    {/* <img alt="not found" width={"250px"} src={file1.file1} /> */}
                      <input
                        type="file"
                        className="custom-file-input"
                        // onChange={onImageChange}
                        name="logoImage"
                      />
                      
                      <label className="custom-file-label">Logo Image * </label>
                    </div>
                  </div>
                </div>
                {/* ------------------------ */}
                <div className="col-12">
                  <div className="input-group form-group mt-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        // onChange={onImageChange}
                        name="bannerImage"

                      />
                      <label className="custom-file-label">
                        Banner Image *
                      </label>
                    </div>
                  </div>
                </div>
                {/* ------------------------------- */}

                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      // onChange={handleChange}
                      // value={collectionData.name}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      rows={3}
                      name="description"
                      placeholder="Description"
                      // onChange={handleChange}
                      // value={collectionData.description}
                    />
                  </div>
                </div>
                         {/* {console.log(file1.file1)} */}
                <div className="col-12">
                  <button className="btn w-100 mt-3 mt-sm-4" type="submit">
                    Create Collection{" "}
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
