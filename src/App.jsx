import { useEffect, useState  } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation,Mousewheel } from 'swiper/modules';
const getDayName = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=eda8d98890214bab926190059241708&q=31.264437164841382,29.98754643247541&days=3`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {data ? (
        <div className="weather vh-100">
          <div className="Rainy h-50 position-relative overflow-hidden py-5">
            <div className="d-flex justify-content-center gap-5 align-items-center">
              <div>
                <h5 className="deadline">
                  {data.location.localtime.split(" ")[0]}
                </h5>
                <h6 className="palace">
                  {data.location.name}, {data.location.country}
                </h6>
              </div>
              <span className="temp_day h5">{data.current.temp_c} °C</span>
            </div>
            <div className="girl">
              <img src="/Rainy girl.png" alt="Rainy girl" />
            </div>
            <div className="cloud overflow-hidden">
              <img src="/Clouds.png" alt="Clouds" />
            </div>
          </div>
          
          <div className="degree bg-white h-50 border border-1 rounded-top-5 position-relative gap-4 d-flex justify-content-center align-items-center">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              mousewheel={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation,Mousewheel]}
              className="mySwiper"
            >
              {data.forecast.forecastday.map((day, dayIndex) => (
                <SwiperSlide
                  key={dayIndex}
                  className="forecast-slide d-flex flex-column align-items-center"
                >
                  <h3 className="">{getDayName(day.date)}</h3> 
                  <div className="day-forecast d-flex justify-content-center align-items-center gap-4">
                    {day.hour.slice(5, 10).map((hourlyData, index) => (
                      <div
                        key={index}
                        className="forecast-item d-flex justify-content-center align-items-center flex-column"
                      >
                        <span className="time">{hourlyData.time.split(" ")[1]}</span>
                        <span className="icon">
                          <img
                            src={hourlyData.condition.icon}
                            alt={hourlyData.condition.text}
                          />
                        </span>
                        <span className="temp">{hourlyData.temp_c} °C</span>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
