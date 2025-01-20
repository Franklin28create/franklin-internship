import React, { useEffect, useState } from "react";
import Collection from "../UI/Collection";
import CollectionSkeleton from "../UI/CollectionSkeleton";
import axios from "axios";

const ExploreItems = () => {
  const [itemsInitialLength, setItemsInitialLength] = useState(0);
  const [sliceLength, setSliceLength] = useState(0);
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchExploreItems(filterValue) {
    if (filterValue) {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
      );
      return setItemsList(data);
    }

    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItemsList(data);
  }

  useEffect(() => {
    if (itemsList.length > 0) {
      setSliceLength(itemsList.length - 8);
      setItemsInitialLength(itemsList.length);
      setLoading(false);
    }
  }, [itemsList]);

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => fetchExploreItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, i) => (
            <CollectionSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {itemsList.slice(0, sliceLength).map((item) => (
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
            />
          ))}
        </>
      )}

      {sliceLength < itemsInitialLength && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setSliceLength(sliceLength + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
