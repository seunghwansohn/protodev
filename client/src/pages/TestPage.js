import React from "react";
import styled, { createGlobalStyle } from "styled-components";

// import timelineData from './timeLine/timeLineData';

import TimelineItem from './timeLine/TimeContainer'
import './timeLine/timeLine.css'

const timeLineData = [
  {
      text: 'Wrote my first blog post ever on Medium',
      date: 'March 03 2017',
      category: {
          tag: 'medium',
          color: '#018f69'
      },
      link: {
          url:
              'https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2',
          text: 'Read more'
      }
  },
  {
    text: 'Wrote my first blog post ever on Medium',
    date: 'March 03 2017',
    category: {
        tag: 'medium',
        color: '#018f69'
    },
    link: {
        url:
            'https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2',
        text: 'Read more'
    }
  },
  // {
  //     // Another object with data
  // }
];
console.log(timeLineData)
const TimeLine = () => {
  return(
    timeLineData.length > 0 && (
        <div className="timeline-container">
            {timeLineData.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </div>
    )
  )
}

export default TimeLine