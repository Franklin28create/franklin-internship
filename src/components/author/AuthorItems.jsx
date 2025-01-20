import React from "react";
import AuthorItem from "../UI/AuthorItem";

const AuthorItems = ({ nftCollection, authorImage, authorId }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((item) => (
            <AuthorItem
              authorImage={authorImage}
              key={item.id}
              nftId={item.nftId}
              likes={item.likes}
              price={item.price}
              title={item.title}
              nftImage={item.nftImage}
              authorId={authorId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
