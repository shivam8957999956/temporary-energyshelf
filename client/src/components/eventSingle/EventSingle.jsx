import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./eventSingle.css";

export default function EventSingle({ event, check }) {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const path = event.date.split("-");
  let today = "";
  let dateEvent = "";
  const [expired, setExpired] = useState(1);
  useEffect(() => {
    function getFormattedDate(date) {
      var year = date.getFullYear();

      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;

      var day = date.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
      today = day + month + year;
      dateEvent = path[2] + path[1] + path[0];
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
          data: { username: user.username },
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
        <div className="es">
          {"MTP" === event.username && (
            <span className="es-exclusive">Exlusive</span>
          )}
          <div className="es-img">
            <img className="es-im" src={event.photo} alt="" />
          </div>
          <div className="es-title">{event === null ? "" : event.title}</div>
          <div className="es-desc">{event === null ? "" : event.desc}</div>
          <div className="es-time">
            <i class="es-time-icon far fa-calendar-alt"></i>
            <span className="es-date-val">
              {event === null ? "" : event.date}
            </span>
            <span className="es-time-val">
              {event === null ? "" : event.time}
            </span>
            {expired === 0 ? (
              <span className="es-openLink-expired">Expired</span>
            ) : (
              <a
                className="link"
                href={event === null ? "" : event.link}
                target="_blank">
                <span className="es-openLink">Open Event</span>
              </a>
            )}

            {event !== null && event.username === user.username && (
              <i
                class="es-delete-icon far fa-trash-alt"
                onClick={handleClick}></i>
            )}

            {/* <i class="es-time-icon openlink fas fa-external-link-alt"></i> */}
          </div>
          <div className="ex-right"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
