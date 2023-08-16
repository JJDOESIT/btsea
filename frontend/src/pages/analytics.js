import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import TimestampToDate from "../functions/timestampToDate";
import modifyDocumentBody from "../functions/modifyDocumentBody";
import LoadingSVG from "../components/loadingSVG";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getBTCHistory from "../functions/getBTCHistory";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [priceData, setPriceData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [allYearMonthDay, setAllYearMonthDay] = useState({
    data: null,
    type: "day",
  });
  const [currentDate, setCurrentDate] = useState(null);

  //Stores data so API doesn't have to make as many calls
  const storedAllRef = useRef(null);
  const storedYearRef = useRef(null);
  const storedMonthRef = useRef(null);
  const storedDayRef = useRef(null);

  //Calculations for epoch time
  const all = 1000 * 60 * 60 * 24 * 30 * 12 * 11;
  const year = 1000 * 60 * 60 * 24 * 30 * 12;
  const month = 1000 * 60 * 60 * 24 * 30;
  const day = 1000 * 60 * 60 * 24;

  //Chart.JS Config Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "BTC Price History",
        color: "black",
        font: { weight: "bold" },
      },
    },
  };

  //Change .graph-container height on re-size
  useEffect(() => {
    setTimeout(() => {
      modifyDocumentBody("body", ".navbar-container", ".graph-container");
      window.addEventListener("resize", () => {
        modifyDocumentBody("body", ".navbar-container", ".graph-container");
      });
    }, 100);

    //Set Current Time to Now
    setCurrentDate(Date.now());
    //Set Default To day
    setAllYearMonthDay({ data: Date.now() - day, type: "day" });
  }, []);

  useEffect(() => {
    setLoaded(false);
    var fetchData = false;

    //Checks for the selection being made, and checks if any data is currently stored
    if (allYearMonthDay["type"] == "all") {
      if (storedAllRef.current != null) {
        setLabels(storedAllRef.current.labels);
        setPriceData(storedAllRef.current.priceData, setLoaded(true));
      } else {
        fetchData = true;
      }
    } else if (allYearMonthDay["type"] == "year") {
      if (storedYearRef.current != null) {
        setLabels(storedYearRef.current.labels);
        setPriceData(storedYearRef.current.priceData, setLoaded(true));
      } else {
        fetchData = true;
      }
    } else if (allYearMonthDay["type"] == "month") {
      if (storedMonthRef.current != null) {
        setLabels(storedMonthRef.current.labels);
        setPriceData(storedMonthRef.current.priceData, setLoaded(true));
      } else {
        fetchData = true;
      }
    } else if (allYearMonthDay["type"] == "day") {
      if (storedDayRef.current != null) {
        setLabels(storedDayRef.current.labels);
        setPriceData(storedDayRef.current.priceData, setLoaded(true));
      } else {
        fetchData = true;
      }
    }

    //Making sure that there's no stored data, and that the function
    //doesn't run before the allYearMonthDay data is fetched by the API
    if (fetchData && allYearMonthDay["data"] != null) {
      //Function gets an array with time and price columns from API
      getBTCHistory(allYearMonthDay["data"], currentDate)
        .then((response) => {
          var data = response.data["prices"];
          var dates = [];
          var prices = [];
          //Convert epoch time to DD/MM/YYYY format
          for (let i = 0; i < data.length; i++) {
            let date = TimestampToDate(data[i][0]);
            dates.push(date);
            prices.push(data[i][1]);
          }
          //Set price and label states
          setPriceData(prices);
          setLabels(dates, setLoaded(true));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  }, [allYearMonthDay]);

  useEffect(() => {
    //Anytime the loaded state changes, that means data is being fetched, which means
    //the current stored data needs to be updated
    if (loaded) {
      if (allYearMonthDay["type"] == "all") {
        storedAllRef.current = { priceData: priceData, labels: labels };
      } else if (allYearMonthDay["type"] == "year") {
        storedYearRef.current = { priceData: priceData, labels: labels };
      } else if (allYearMonthDay["type"] == "month") {
        storedMonthRef.current = { priceData: priceData, labels: labels };
      } else {
        storedDayRef.current = { priceData: priceData, labels: labels };
      }
    }
  }, [loaded]);

  if (loaded) {
    //Chart.JS config settings
    var dataConfig = {
      labels: labels,
      datasets: [
        {
          data: priceData,
          backgroundColor: "rgba(46,195,232,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  }

  return (
    <div
      className="graph-container"
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {loaded ? (
        <>
          <div style={{ height: "80%", width: "100%" }}>
            <Line
              data={dataConfig}
              options={options}
              width="100%"
              height="100%"
            ></Line>
          </div>
          <div className="flex flex-row h-1/5 items-center justify-center">
            <div className='bg-blue-700 hover:-translate-y-1'>
              <input
                type="button"
                className='text-lg text-white bg-transparent border-none hover:cursor-pointer'
                value="All"
                onClick={() => {
                  setAllYearMonthDay({ data: Date.now() - all, type: "all" });
                }}
              ></input>
            </div>
            <div className='bg-blue-600 hover:-translate-y-1'>
              <input
                type="button"
                className='text-lg bg-transparent text-white border-none hover:cursor-pointer'
                value="Year"
                onClick={() => {
                  setAllYearMonthDay({ data: Date.now() - year, type: "year" });
                }}
              ></input>
            </div>
            <div className='bg-blue-500 hover:-translate-y-1'>
              <input
                type="button"
                value="Month"
                className='text-lg text-white bg-transparent border-none hover:cursor-pointer'
                onClick={() => {
                  setAllYearMonthDay({
                    data: Date.now() - month,
                    type: "month",
                  });
                }}
              ></input>
            </div>
            <div className='bg-blue-400 hover:-translate-y-1 '>
              <input
                type="button"
                value="Day"
                className='text-lg text-white bg-transparent border-none hover:cursor-pointer'
                onClick={() => {
                  setAllYearMonthDay({ data: Date.now() - day, type: "day" });
                }}
              ></input>
            </div>
          </div>
        </>
      ) : (
        <LoadingSVG></LoadingSVG>
      )}
    </div>
  );
}
