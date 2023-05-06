import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { addTask, setDateRef } from 'state';

function AddTask(props){
  const date = useRef();
  useEffect(() => {
    props.setDateRef(date);
  }, [props])
  
  function openDateTime(){
    /* sets HOC DateTimePicker display to flex */
    props.setDateRef(date);
    const dateTime = props.state;
    dateTime.current.style.display = "flex";
  }
  let timeValue = new Date();
  let tempDue = `${timeValue.getFullYear()}-${((timeValue.getMonth() + 1).toString().length < 2) ? `0${timeValue.getMonth() + 1}` : timeValue.getMonth() + 1}-${((timeValue.getDate() + 1).toString().length < 2) ? `0${timeValue.getDate() + 1}` : timeValue.getDate() + 1}T${(timeValue.getHours().toString().length < 2) ? `0${timeValue.getHours()}` : timeValue.getHours()}:${(timeValue.getMinutes().toString().length < 2) ? `0${timeValue.getMinutes()}` : timeValue.getMinutes()}:${(timeValue.getSeconds().toString().length < 2) ? `0${timeValue.getSeconds()}` : timeValue.getSeconds()}`;//generates date value format
  
  const [state, setState] = useState(
      {
        category: "",
        comment: "",
        due: tempDue,
        priority: "",
        text: ""
      }
    );
  
  function addNewTask(e){
    /* Adds new Task to the store @[state[0]] */
    e.preventDefault();
    if (e.target.firstElementChild.value === ""){
      //do nothing.
    }else{
      let priority = document.getElementById("priority");
      let category = document.getElementById("category");
      let dateValue = parseInt(date.current.value);
      const data = {...state, category: category.value, priority: priority.value, due: dateValue, status: "inComplete"};
      props.addTask(data);
      setState(
            {
            category: "",
            comment: "",
            priority: "",
            text: ""
          }
        );
      category.selectedIndex = 0;
      priority.selectedIndex = 0;
      collapseForm();
    }
  }
  
  function handleChange(e){
    /* handles changes in form elements values */
    switch (e.target.name){
      case "text":
        setState({...state, text: e.target.value});
        break;
      case "comment":
        setState({...state, comment: e.target.value});
        break;
    }
  }
  
  function expandForm(e){
    /* makes other form fields visible */
    let element = e.target;
    if(state.text !== ""){
      element.parentElement.classList.remove("excludeExtras");
      let extras = document.querySelectorAll(".addTaskExtras");
      for (let i = 0; i < extras.length; i++){
        extras[i].classList.remove("addTaskExtras");
      }
    }
  }
  
  function collapseForm(){
    /* closes secondary form fields back */
    let element = document.getElementById("addTask");
    element.classList.add("excludeExtras");
    for (let i = 1; i < element.children.length-1; i++){
      element.children[i].classList.add("addTaskExtras");
    }
  }
  
  return (
    <form id="addTask" onSubmit={addNewTask} className="excludeExtras addTask">
      <input type="text" value={state.text} onChange={handleChange} name="text" placeholder="Enter task caption" required />
      <select onClick={openDateTime} ref={date} id="dateTimePicker" className="addTaskExtras" required>
        <option value="">Date</option>
      </select>
      <select id="priority" className="addTaskExtras" required >
        <option value="">Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select id="category" className="addTaskExtras" required >
        <option value="">Category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="school">School</option>
      </select>
      <textarea placeholder="comment" onChange={handleChange} name="comment" value={state.comment} className="addTaskExtras"></textarea>
      <input type="submit" value="Add task" onClick={expandForm}/>
    </form>
    );
}

function mapStateToProps(state){
  /* maps DateTime(picker) ref as state to props of Component invoked by connect*/
  return {
    state: state[1][0]
  };
}
const mapDispatchToProps = {
  addTask,
  setDateRef
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);