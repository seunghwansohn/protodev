import React    from "react";
import TimeLine from '../components/TimeLine/TimeLine'

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
];

const TimeLinePage = () => {
  return(
    <div className="timeline-container">
        <TimeLine 
          timeLineDataArr = {timeLineData}
        ></TimeLine>
    </div>
  )
}

export default TimeLinePage