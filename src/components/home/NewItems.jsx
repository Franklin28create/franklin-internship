import React, { useState, useEffect } from "react";
import axios from "axios";
import NewItem from "../UI/NewItem";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <OwlCarousel
            className="owl-theme"
            loop
            nav
            dots={false}
            key={loading}
            margin={8}
            navText={["<", ">"]}
            responsive={{
              0: { items: 1 },
              572: { items: 2 },
              992: { items: 3 },
              1200: { items: 4 },
            }}
          >
            {loading ? (
              <>
                {new Array(5).fill(0).map((_, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                    key={i}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <Skeleton width="100%" height="350px" />
                      <div className="nft__item_info">
                        <Skeleton width="180px" height="30px" />
                        <div className="nft__item_price">
                          <Skeleton width="100px" height="20px" />
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <Skeleton width="30px" height="15px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {newItems.map((item) => (
                  <NewItem
                    authorImage={item.authorImage}
                    nftImage={item.nftImage}
                    title={item.title}
                    price={item.price}
                    likes={item.likes}
                    expiryDate={item.expiryDate}
                    key={item.id}
                    nftId={item.nftId}
                    authorId={item.authorId}
                  />
                ))}
              </>
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
