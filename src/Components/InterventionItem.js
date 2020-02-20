import React from "react";
import {Badge, Icon} from 'antd';

export default ({ date, time, status, comment, active }) => {
  return (
    <div className="intervention-item container">
      <span className="col-2"><b>{date}</b></span>
      <span className="col-2"><Icon className="small-icon" type="clock-circle" /><b>{time}</b><Badge status={status} /></span>
      <span className="col-3 text">{comment}</span>
      <span className="col-1">{active && <span className="active"></span>}</span>
    </div>
  );
};
