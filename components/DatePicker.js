import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setDateState } from 'state';
import { numsIn } from 'components/DateTimePicker';

function DatePicker(props){
  useEffect(
    () => {
      setCalendar(Date.now())
      props.setDateState(state.choosen);
      },
    []
  );
  
  const [state, setState] = useState(
    {
      choosen: new Date(),
      date: [],
      firstDay: new Date(),
      lastDay: null,
      present: new Date(),
      time: []
    }
  );
  
  let thisCalender = [];
  
  function setCalendar(time){
    /* sets the month's calender time falls in */
    let present = new Date(time);
    let firstDay = present.getTime() + 86400000 - (present.getDate() * 86400000);
    firstDay = new Date(firstDay);
    let lastDay;
    for (let i = 0; i < firstDay.getDay(); i++){
      thisCalender.push(null);
    }
    let tempDay = new Date(firstDay.getTime());
    let skip = false;
    let stop = false;
    for (let i = 0;; i++){
      if (stop){
        break;
      }
      for (let j = 0; j < 7; j++){
        if (!skip){
          j = firstDay.getDay();
          thisCalender.push(firstDay.getDate());
          tempDay = new Date(firstDay.getTime() + 86400000);
          skip = true;
        }else{
          if (stop){
            thisCalender.push(null);
          }else if (tempDay.getDate() === 1){
            stop = true;
            lastDay = new Date(tempDay.getTime());
            thisCalender.push(null);
          }else{
            thisCalender.push(tempDay.getDate());
            tempDay = new Date(tempDay.getTime() + 86400000);
          }
        }
      }
    }
  setState({...state, date: [...thisCalender], firstDay: firstDay, lastDay: lastDay});
  }
  
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  function prevMonth(){
    /* changes the calender displayed to the previous month */
    try{
      document.querySelector(".choosen").classList.remove("choosen");
    }catch(error){}
    let time = state.firstDay.getTime() - 86400000;
    setCalendar(time);
  }
  
  function nextMonth(){
    /* changes the calendar displayed to the next month */
    try{
      document.querySelector(".choosen").classList.remove("choosen");
    }catch(error){}
    let time = state.lastDay.getTime() + 86400000;
    setCalendar(time);
  }
  
  function pickDate(e) {
    /* select a day in calender and sets it to store @ [1].date*/
    if (e.currentTarget.textContent !== "" && (e.currentTarget.classList.contains("day") || e.currentTarget.classList.contains("present"))){
      try{
        document.querySelector(".choosen").classList.remove("choosen");
      }catch(error){}
      e.currentTarget.classList.add("choosen");
      let time = state.firstDay.getTime() + 86400000 * (e.currentTarget.textContent -1);
      setState({
        ...state,
        choosen: new Date(time)
      })
      props.setDateState(new Date(time));
    }
  }
  return (
    <div id="date">
      <div id="info">
        <div>
          <p>{state.firstDay.getFullYear()}</p>
          <p id="dayMonth">{`${days[state.choosen.getDay()]}, ${fullMonths[state.choosen.getMonth()]} ${state.choosen.getDate()}`}</p>
        </div>
        <div id="control">
          <svg viewBox="0 0 50 100" onClick={prevMonth}>
            <line x1="43" y1="7" x2="7" y2="50" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
            <line x1="7" y1="50" x2="43" y2="93" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
          </svg>
          <p>{`${fullMonths[state.firstDay.getMonth()]} ${state.firstDay.getFullYear()}`}</p>
          <svg viewBox="0 0 50 100" onClick={nextMonth}>
            <line x1="7" y1="7" x2="43" y2="50" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
    ;        <line x1="43" y1="50" x2="7" y2="93" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
          </svg>
        </div>
      </div>
      <div id="calendar">
          <p>S</p><p>M</p><p>T</p><p>W</p><p>T</p><p>F</p><p>S</p>
        {
          state.date.map((column, key) => {
            if (state.choosen.getMonth() === state.firstDay.getMonth() && state.choosen.getFullYear() === state.firstDay.getFullYear() && column === state.choosen.getDate()){
              return <p onClick={pickDate} className={(state.firstDay.getFullYear() === state.present.getFullYear() && state.firstDay.getMonth() === state.present.getMonth() && column === state.present.getDate()) ? "present choosen aDay" : "day choosen aDay"} key={`day${key}`}>{(column === null) ? "" : column}</p>
            }else{
              return <p onClick={pickDate} className={(state.firstDay.getFullYear() === state.present.getFullYear() && state.firstDay.getMonth() === state.present.getMonth() && column === state.present.getDate()) ? "present aDay" : "day aDay"} key={`day${key}`}>{(column === null) ? "" : column}</p>
            }
          })
        }
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setDateState
}
export default connect(null, mapDispatchToProps)(DatePicker);