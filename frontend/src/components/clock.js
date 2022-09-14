
import React, { useEffect, useState } from "react";
import moment from 'moment';




export default function Clock() {
    const [time, setTime] = useState(moment().format
    ());

    useEffect(() => {
        const interval = setInterval(() => setTime(moment().format
        ('dddd Do MMMM MM YYYY HH:mm:ss')), 1000);
        return () => {
          clearInterval(interval);
        };
      }, []);
    return (
        <div className="clock">
            <p> {time}</p>
        </div>
    )
}