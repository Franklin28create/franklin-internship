import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewItem = ({
  authorImage,
  nftImage,
  title,
  price,
  likes,
  expiryDate,
  nftId,
  authorId,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function getExpirationDate() {
    const millisLeft = expiryDate - Date.now();
    const secondsLeft = millisLeft / 1000;
    const minsLeft = secondsLeft / 60;
    const hoursLeft = minsLeft / 60;

    setSeconds(Math.floor(secondsLeft) % 60);
    setMinutes(Math.floor(minsLeft) % 60);
    setHours(Math.floor(hoursLeft));
  }
useEffect(() => {
  expiryDate && setInterval(getExpirationDate, 1000);
}, [])

  return (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ width: "100%", maxWidth: "100%", padding: "0" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <img className="lazy" src={authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {expiryDate && (
          <div className="de_countdown">
            {hours}h {minutes}m {seconds}s
          </div>
        )}
        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details${nftId}`}>
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${nftId}`}>
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{price}</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
