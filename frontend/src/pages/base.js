import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/base.css";
import LoadingSVG from "../components/loadingSVG";
import _ from "lodash";

export default function Base() {
  const [cryptoData, setCryptoData] = useState(null);
  const [paginatedData, setPaginatedData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.querySelector("#root").style.overflow = "auto";
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => {
        setPaginatedData(_.take(response.data, 20));
        setCryptoData(response.data);
        setLoaded(true);
      });
  }, []);

  function handleCardFlipFront(card) {
    const cardFront = document.querySelector("#" + card + "-front");
    cardFront.style.transform = "rotateY(180deg)";
    const cardBack = document.querySelector("#" + card + "-back");
    cardBack.style.transform = "none";
  }

  function handleCardFlipBack(card) {
    const cardFront = document.querySelector("#" + card + "-front");
    cardFront.style.transform = "none";
    const cardBack = document.querySelector("#" + card + "-back");
    cardBack.style.transform = "rotateY(180deg)";
  }

  function handleShowMore() {
    setPaginatedData((prev) => {
      if (prev.length + 20 >= cryptoData.length) {
        document.querySelector(".base-show-more").style.display = "none";
      }
      return _.take(cryptoData, prev.length + 20);
    });
  }

  if (loaded) {
    console.log(cryptoData);
    return (
      <>
        <div className="base-title">
          <p>Cryptocurrencies</p>
        </div>
        <div className="crypto-card-grid-container">
          {paginatedData.map((crypto) => {
            return (
              <div className="crypto-card-container">
                <div className="crypto-card-front" id={crypto.id + "-front"}>
                  <div className="crypto-card-front-info-container">
                    <img className="crypto-card-image" src={crypto.image}></img>
                    <div>
                      <p>{crypto.name}</p>
                    </div>
                  </div>
                  <div className="crypto-card-front-input-container">
                    <input
                      type="button"
                      value="View Info"
                      onClick={() => {
                        handleCardFlipFront(crypto.id);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="crypto-card-back" id={crypto.id + "-back"}>
                  <div className="crypto-card-back-info-container">
                    <div>
                      <p>
                        <strong>Current Price: </strong> ${crypto.current_price}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Market Cap: </strong> {crypto.market_cap}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>24 Hour Price Change: </strong>
                        {crypto.price_change_percentage_24h}%
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Total Supply: </strong>
                        {crypto.total_supply}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Total Volume: </strong>
                        {crypto.total_volume}
                      </p>
                    </div>
                  </div>
                  <div className="crypto-card-back-input-container">
                    <input
                      type="button"
                      value="Go Back"
                      onClick={() => {
                        handleCardFlipBack(crypto.id);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="base-show-more">
          <input
            type="button"
            value="Show More"
            onClick={handleShowMore}
          ></input>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <LoadingSVG></LoadingSVG>
      </div>
    );
  }
}
