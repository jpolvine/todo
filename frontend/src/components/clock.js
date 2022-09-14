
import React, { useEffect, useState } from "react";
import moment from 'moment';

// Trying moment library in component, almost certainly need to 
// use separate components to update the times in realtime without updating 
// the site itself

export default function Clock() {
    const [time, setTime] = useState(moment().format
    ('dddd Do MMMM MM YYYY HH:mm:ss'));

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