import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { setTimeState } from 'state';
import { numsIn } from 'components/DateTimePicker';

function TimePicker(props) {
  const hours = useRef();
  const minutes = useRef();
  const meridiem = useRef();
  
  useEffect(() => {
  setCriteria();
  },[])
  
  const [state, setState] = useState({
    hour: 1,
    min: 0,
    mer: 0,
    hourCrit: 0,
    minuteCrit: 0,
    meridiemCrit: 0
  })
  
  let timedHourRecord;
  let timedMinRecord;
  let timedMerRecord;
  
  function setCriteria(){
    const firstHourFig = hours.current.children[0];
    state.hourCrit = firstHourFig.getBoundingClientRect().top + window.scrollY;
    
    const firstMinFig = minutes.current.children[0];
    state.minuteCrit = firstMinFig.getBoundingClientRect().top + window.scrollY;
    
    const firstMerFig = meridiem.current.children[0];
    state.meridiemCrit = firstMerFig.getBoundingClientRect().top + window.scrollY;
  }
  
  function changeMeridiem(e){
    const el = e.target;
    switch (el.textContent){
      case "AM":
        el.textContent = "PM";
        break;
      case "PM":
        el.textContent = "AM";
        break;
    }
  }
  
  function handleChange(e){
    const el = e.target;
    el.value = el.value.replace(/\D/g, "");
    const value = el.value;
    switch (e.target.name){
      case "hour":
        if (parseInt(value) === 0){
          el.value = 1;
        }else if(parseInt(value) > 12){
          el.value = 12;
        }
        break;
      case "min":
        if (parseInt(value) > 59){
          el.value = 59;
        }
        break;
    }
    updateTimeState();
  }
  
  function recordHour(){
    let hour = Array.from(hours.current.children);
    hour.map((anHour, index) => {
      let hourTop = anHour.getBoundingClientRect().top + window.scrollY;
      if (hourTop === state.hourCrit || (hourTop > state.hourCrit - 15 && hourTop < state.hourCrit + 15)){
        index++;
        state.hour = index;
        updateTimeState();
      }
    })
    clearTimeout(timedHourRecord);
  }
  
  function recordMinute(){
    let minute = Array.from(minutes.current.children);
    minute.map((aMinute, index) => {
      let minuteTop = aMinute.getBoundingClientRect().top + window.scrollY;
      if (minuteTop === state.minuteCrit || (minuteTop > state.minuteCrit - 15 && minuteTop < state.minuteCrit + 15)){
        state.min = index;
        updateTimeState();
      }
    })
    clearTimeout(timedMinRecord);
  }
  
  function recordMeridiem(){
    let meridian = Array.from(meridiem.current.children);
    meridian.map((aMeridian, index) => {
      let meridianTop = aMeridian.getBoundingClientRect().top + window.scrollY;
      if (meridianTop === state.meridiemCrit || (meridianTop > state.meridiemCrit - 15 && meridianTop < state.meridiemCrit + 15)){
        state.mer = index;
        updateTimeState();
      }
    })
    clearTimeout(timedMerRecord);
  }
  
  function updateTimeState(){
    const el = document.getElementById("time");
    let display = window.getComputedStyle(el.firstElementChild.firstElementChild).getPropertyValue("display");
    if (display === "none"){
      let hour = (el.firstElementChild.lastElementChild.value === "") ? 1 : parseInt(el.firstElementChild.lastElementChild.value);
      let min = (el.children[2].lastElementChild.value === "")? 0 : parseInt(el.children[2].lastElementChild.value);
      let mer = el.children[3].lastElementChild.textContent;
      let time = (hour * 60 * 60) + (min * 60);
      props.setTimeState([time, mer]);
    }else{
      let time = (state.hour * 60 * 60) + (state.min * 60);
      let meridian = (state.mer === 0) ? "AM" : "PM";
      props.setTimeState([time, meridian]);
    }
  }
  
  return (
    <div id="time">
      <div onTouchEnd={() => timedHourRecord = setTimeout(recordHour, 800)} ref={hours}>{
        numsIn(1, 12).map((num, key) => {
          return <p key={`hour${key}`}>{(num.toString().length === 1) ? `0${num}` : num}</p>
        })
      }
      <input type="tel" placeholder="hour" className="desktop" name="hour" onChange={handleChange} />
      </div>
      <div>:</div>
      <div onTouchEnd={() => timedMinRecord = setTimeout(recordMinute, 1000)
      } ref={minutes}>{
        numsIn(0, 59).map((num, key) => {
          return <p key={`minute${key}`}>{(num.toString().length === 1) ? `0${num}` : num}</p>
        })
      }
      <input type="tel" placeholder="minute" className="desktop" name="min" onChange={handleChange} />
      </div>
      <div onTouchEnd={() => timedMerRecord = setTimeout(recordMeridiem, 500)
      } ref={meridiem}><p>AM</p><p>PM</p>
      <div className="desktop" onClick={changeMeridiem}>AM</div>
      </div>
      <div id="overlay">
        <div>
        </div>
        <div>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <p>&nbsp;&nbsp;&nbsp;</p>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setTimeState
}

export default connect(null, mapDispatchToProps)(TimePicker);