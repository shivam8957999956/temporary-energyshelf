import "./newEventSingle.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";
export default function NewEventSingle({ event, check }) {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const path = event.date.split("-");
  let today = "";
  let dateEvent = "";

  const [expired, setExpired] = useState(1);
  const [mon, setMon] = useState("");
  useEffect(() => {
    function getFormattedDate(date) {
      var year = date.getFullYear();

      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;

      var day = date.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
      today = year + month + day;
      dateEvent = path[0] + path[1] + path[2];

      if (dateEvent > today) setExpired(2);
      else if (dateEvent < today) setExpired(0);
      else setExpired(1);
    }
    getFormattedDate(new Date());
  });
  const handleClick = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.delete(`/event/${event._id}`, {
          data: {
            username: user.username,
            admin: true,
          },
        });
        window.location.replace("/events");
      } catch (err) {}
    } else {
      window.location.replace("/login");
    }
  };
  return (
    <>
      {check === expired ? (
        <div className="nse">
          <div className="nse-l">
            <div className="nse-l-bg">
              <div className="nse-l-date">{path[2]}</div>
              <div className="nse-l-month-year">
                {path[1] + "'"} {path[0]}
              </div>
            </div>
          </div>
          <div className="nse-r">
            <img className="nse-r-img" src={event.photo} alt="" />
            <div className="nse-r-text">
              <div className="nse-r-title">
                {event === null ? "" : event.title}
              </div>
              <div className="nse-r-desc">
                {event === null ? "" : event.desc}
              </div>
              <div className="nse-r-dateInfo">
                <div className="nse-r-time">
                  at {event === null ? "" : event.time}
                </div>
                {expired === 0 ? (
                  <div className="nse-r-now-expired">Expired</div>
                ) : (
                  <a
                    className="link"
                    href={event === null ? "" : event.link}
                    target="_blank">
                    <div className="nse-r-now">Join Now</div>
                  </a>
                )}

                <div className="nse-r-delete-t">
                  {user && user.admin == true && (
                    <i
                      class=" nse-r-delete far fa-trash-alt"
                      onClick={handleClick}></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
