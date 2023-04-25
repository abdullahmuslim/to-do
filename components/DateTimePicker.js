import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { setDateTimeRef } from 'state';
import DatePicker from 'components/DatePicker';
import TimePicker from 'components/TimePicker';

export function numsIn(start=0, end=Infinity, step=1){
  let nums = [];
  for (let i = start; i <= end; i++){
    nums.push(i);
  }
  return nums;
}

function DateTimePicker(props){
  const dateTime = useRef();
  useEffect(() => props.setDateTimeRef(dateTime), []);
  function closeDateTime(){
    dateTime.current.style.display = "none";
  }
  function clearDateTime(){
    props.element.current.firstElementChild.value = "";
    closeDateTime();
  }
  function setValue(){
    let date = props.state.date;
    let pickedTime = props.state.time[0];
    pickedTime = (props.state.time[1] === "AM") ? pickedTime  : pickedTime + 12 * 60 * 60;
    let initialTime = (date.getHours() * 60 * 60) + (date.getMinutes() * 60);
    if (pickedTime === initialTime){
      //date remains
    }else if(pickedTime < initialTime){
      let diff = initialTime - pickedTime;
      diff = date.getTime() - (diff * 1000);
      date = new Date(diff);
   }else{
      let diff = pickedTime - initialTime;
      diff = date.getTime() + (diff * 1000);
      date = new Date(diff);
    }
    let value = `${date.getFullYear()}-${((date.getMonth() + 1).toString().length < 2) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${((date.getDate()).toString().length < 2) ? `0${date.getDate()}` : date.getDate()}T${(date.getHours().toString().length < 2) ? `0${date.getHours()}` : date.getHours()}:${(date.getMinutes().toString().length < 2) ? `0${date.getMinutes()}` : date.getMinutes()}:${(date.getSeconds().toString().length < 2) ? `0${date.getSeconds()}` :  date.getSeconds()}`;
    props.element.current.firstElementChild.value = date.getTime();
    props.element.current.firstElementChild.textContent = value;
    props.element.current.selectedIndex = 0;
    closeDateTime();
  }
  return createPortal(
    <div ref={dateTime} id="dateTime">
      <div>
        <DatePicker />
        <TimePicker />
        <div id="comds">
          <p onClick={clearDateTime}>CLEAR</p>
          <div>
            <p onClick={closeDateTime}>CANCEL</p><p onClick={setValue}>SET</p>
          </div>
        </div>
      </div>
    </div>, document.getElementById("modals")
    );
}
function mapStateToProps(state){
  return {
    element: state[1][1],
    state: state[2]
  }
}
const mapDispatchToProps = {
  setDateTimeRef
}
export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker);