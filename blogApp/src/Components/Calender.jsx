import React, { useState } from 'react'
import './Calender.css'
const Calender = () => {
  const daysofweek=["sun","mon","tue","wed","thur","fri","sat"]
  const monthsofyear=["january","february","march","april","may","june"
    ,"july","august","september","october","november","december"
  ]
  const currentDate= new Date()
  const [currentmonth,setcurrentmonth]= useState(currentDate.getMonth())
  const [currentyear,setcurrentyear]= useState(currentDate.getFullYear())
  const daysinmonth=new Date(currentyear,currentmonth+1,0).getDate()
  const firstdayofmonth = new Date(currentyear,currentmonth,1).getDate()
  console.log(currentmonth,currentyear,daysinmonth,firstdayofmonth)
 const prevMonth = (e) => {
  e.preventDefault();
  setcurrentmonth((prevMonth) => {
    if (prevMonth === 0) {
      setcurrentyear((prevYear) => prevYear - 1);
      return 11;
    }
    return prevMonth - 1;
  });
};

const nextMonth = (e) => {
  e.preventDefault();
  setcurrentmonth((prevMonth) => {
    if (prevMonth === 11) {
      setcurrentyear((prevYear) => prevYear + 1);
      return 0;
    }
    return prevMonth + 1;
  });
};

  return (
    <div className='calender'>
      <div className="date">
        <h2 className="month">
         {monthsofyear[currentmonth]}
        </h2>
        <h2 className="year">{currentyear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" 
          onClick={prevMonth}></i>
          <i className="bx bx-chevron-right"
          onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysofweek.map((day)=>
          <span key={day}>{day}</span>
        )}
      </div>
      <div className="days">
        {[...Array(firstdayofmonth).keys()].map((_,index)=>
        (<span key={`empty-${index}`}></span>)
        )}
        {[...Array(daysinmonth).keys()].map((day)=>(
          <span className={day+1 ===
            currentDate.getDate()&& currentmonth ===
            currentDate.getMonth() && currentyear===
             currentDate.getFullYear()? 'current-day':''
          } key={day+1}>{day+1}</span>
        ))}
      </div>
    </div>
  )
}

export default Calender
