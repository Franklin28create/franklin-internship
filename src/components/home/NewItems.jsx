import React, { useState, useEffect } from "react";
import axios from "axios";
import Collection from "../UI/Collection";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import CollectionSkeleton from "../UI/CollectionSkeleton";

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
                {new Array(5).fill(0).map((_, i) => <CollectionSkeleton key={i} width="100%" maxWidth="100%" padding="0"/>)}
              </>
            ) : (
              <>
                {newItems.map((item) => (
                  <Collection
                    authorImage={item.authorImage}
                    nftImage={item.nftImage}
                    title={item.title}
                    price={item.price}
                    likes={item.likes}
                    expiryDate={item.expiryDate}
                    key={item.id}
                    nftId={item.nftId}
                    authorId={item.authorId}
                    width="100%"
                    maxWidth="100%"
                    padding="0"
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
