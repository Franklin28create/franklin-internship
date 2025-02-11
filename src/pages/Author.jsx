import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorTop from "../components/UI/AuthorTop";
import Skeleton from "../components/UI/Skeleton";
import CollectionSkeleton from "../components/UI/CollectionSkeleton";

const Author = () => {
  const { authorId } = useParams();
  const [address, setAdress] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [followers, setFollowers] = useState("");
  const [nftCollection, setNftCollection] = useState([]);
  const [tag, setTag] = useState("");

  const [loading, setLoading] = useState(true);

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAdress(data.address);
    setAuthorImage(data.authorImage);
    setAuthorName(data.authorName);
    setFollowers(data.followers);
    setNftCollection(data.nftCollection);
    setTag(data.tag);
    setLoading(false);
  }

  useEffect(() => {
    fetchAuthor();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  {loading ? (
                    <>
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="200px" />
                              <span className="profile_username">
                                <Skeleton width="100px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width="150px" height="40px" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <AuthorTop
                      authorImage={authorImage}
                      tag={tag}
                      followers={followers}
                      authorName={authorName}
                      address={address}
                    />
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {new Array(8).fill(0).map((_, i) => (
                        <CollectionSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <AuthorItems
                      nftCollection={nftCollection}
                      authorImage={authorImage}
                      authorId={authorId}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
