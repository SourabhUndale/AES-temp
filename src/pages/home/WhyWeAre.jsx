const WhyWeAre = () => {
  const historyData = [
    {
      icon: "/assets/images/n-icon/1.png",
      title: "Trusted partner for 20+ OEM companies",
      delay: "1000ms",
    },
    {
      icon: "/assets/images/n-icon/2.png",
      title: "100+ successful embedded product platforms",
      delay: "1200ms",
    },
    {
      icon: "/assets/images/n-icon/3.png",
      title: "29+ years of embedded design excellence",
      delay: "1400ms",
    },
  ];

  return (
    <>
      <section
        className="wpo-history-section mb-5"
        style={{ marginTop: "7rem" }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="wpo-section-title">
                <h2 className="poort-text poort-in-right">
                  Embedded Expertise Across Industries That Cannot Afford to Get It Wrong.
                </h2>
                <p>
                  Engineering expertise, proven processes, and dependable
                  embedded solutions built for demanding healthcare and
                  industrial applications.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {historyData.map((item, index) => (
              <div
                className="col col-lg-4 col-md-6 col-sm-6 col-12"
                key={index}
              >
                <div
                  className="history-item wow animate__animated animate__fadeInUp"
                  data-wow-duration={item.delay}
                >
                  {/* ICON IMAGE */}
                  <div className="history-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>

                  <div className="text">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyWeAre;
