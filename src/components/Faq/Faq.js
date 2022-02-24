import React, { useEffect, useState } from "react";
import faqs from "../../services/faq.service";
import { ENV } from "../../env";

const Faq = () => {
  const initialData = {
    heading: "Frequently Asked Questions",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  };

  const [initData] = useState(initialData);
  const [faqdata, setfaqdata] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      const res = await faqs.faq(`${ENV.API_URL}api/faq_list/`);
      setfaqdata(res.data.data.results);
      setLoader(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loader ? (
        <div className="fullpage-loader-holder height">
          <div className="fullpage-loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
          <body></body>
        </div>
      ) : (
        <section className="faq-area pt-130 mt-10 ">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                {/* Intro */}
                <div className="intro text-center">
                  <h3 className="mt-3 mb-0">{initData.heading}</h3>
                  <p>{initData.content}</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                {/* FAQ Content */}
                <div className="faq-content">
                  {/* Netstorm Accordion */}
                  <div className="accordion" id="netstorm-accordion">
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-10">
                        {faqdata ? (
                          faqdata.map((item, idx) => {
                            return item.title ? (
                              <div
                                key={`fd_${idx}`}
                                className="single-accordion-item p-3"
                              >
                                <div className="card-header bg-inherit border-0 p-0">
                                  <h2 className="m-0">
                                    <button
                                      className="btn d-block text-left w-100 py-4 collapsed"
                                      type="button"
                                      data-toggle="collapse"
                                      data-target={`#faq_${idx}`}
                                    >
                                      {item.title}
                                    </button>
                                  </h2>
                                </div>
                                <div
                                  id={`faq_${idx}`}
                                  className="collapse"
                                  data-parent="#netstorm-accordion"
                                >
                                  {/* Card Body */}
                                  <div className="card-body py-3">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="no_data">
                                <span>No Data for FAQ</span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="no_data">
                            <span>No Data for FAQ</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Faq;
