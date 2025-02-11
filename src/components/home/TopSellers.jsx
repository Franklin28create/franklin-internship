import React, { useEffect, useState } from "react";
import axios from "axios";
import TopSeller from "../UI/TopSeller";
import Skeleton from "../UI/Skeleton";
import Aos from "aos";
import "aos/dist/aos.css";
Aos.init();

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);

  async function fetchTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-in" data-aos-duration="400">
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol
              className="author_list"
              data-aos="fade-in"
              data-aos-duration="400"
            >
              {loading ? (
                <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="100px" height="20px" />
                        <span>
                          <Skeleton width="40px" height="20px" />
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {topSellers.map((seller) => (
                    <TopSeller
                      key={seller.id}
                      authorImage={seller.authorImage}
                      authorName={seller.authorName}
                      authorId={seller.authorId}
                      price={seller.price}
                      
                    />
                  ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
