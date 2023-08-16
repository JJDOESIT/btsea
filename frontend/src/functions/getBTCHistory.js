import axios from "axios";

export default function getBTCHistory(fromData, toData) {
  //Convert from epoch to unix time
  fromData = fromData / 1000;
  toData = toData / 1000;

  //get request to coingecko
  return axios
    .get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=" +
        fromData +
        "&to=" +
        toData
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
