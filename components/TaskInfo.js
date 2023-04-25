import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setDateRef, updateTask } from 'state';

function TaskInfo(props){
  const {index, task} = props;
  const date = useRef();
  const categories = ["work", "personal", "school"];
  const priorities = ["high", "medium", "low"];
  useEffect(() => {
    date.current.firstElementChild.textContent = due;
    date.current.firstElementChild.value = task.due;
    date.current.selectedIndex = 0;
    let priority = document.getElementById(`priority${index}`);
    let priorityIndex = priorities.indexOf(task.priority);
    priority.selectedIndex = ++priorityIndex;
    let category = document.getElementById(`category${index}`);
    let categoryIndex = categories.indexOf(task.category);
    category.selectedIndex = ++categoryIndex;
    props.setDateRef(date)
  }, []);
  let timeValue = new Date(task.due);
  let due = `${timeValue.getFullYear()}-${((timeValue.getMonth() + 1).toString().length < 2) ? `0${timeValue.getMonth() + 1}` : timeValue.getMonth() + 1}-${((timeValue.getDate() + 1).toString().length < 2) ? `0${timeValue.getDate() + 1}` : timeValue.getDate() + 1}T${(timeValue.getHours().toString().length < 2) ? `0${timeValue.getHours()}` : timeValue.getHours()}:${(timeValue.getMinutes().toString().length < 2) ? `0${timeValue.getMinutes()}` : timeValue.getMinutes()}:${(timeValue.getSeconds().toString().length < 2) ? `0${timeValue.getSeconds()}` : timeValue.getSeconds()}`;
  const [state, setState] = useState(
    {...task}
  );
    
  function updateTask(e){
    /* update Task in store @[state[0]] */
    e.preventDefault();
    if (e.target.firstElementChild.value === ""){
      //do nothing.
    }else{
      let priority = document.getElementById(`priority${index}`);
      let category = document.getElementById(`category${index}`);
      let dateValue = parseInt(date.current.value);
      const data = {...state, category: category.value, priority: priority.value, due: dateValue
      };
      props.updateTask(data, index);
    }
  }
  function handleChange(e){
    switch (e.target.name){
      case "text":
        setState({...state, text: e.target.value});
        break;
      case "comment":
        setState({...state, comment: e.target.value});
        break;
    }
  }
  function openDateTime(){
    props.setDateRef(date);
    const element = props.state.current;
    element.style.display = "flex";
  }
  function collapseForm(){
    let element = [...document.getElementsByClassName("updateTask")];
    element.map((el) => {
      el.style.display = "none";
    })
  }
  return <form id={`updateTask${index}`} className="updateTask" onSubmit={updateTask}>
    <input type="text" value={state.text} onChange={handleChange} name="text" placeholder="Enter task caption" required />
    <select onClick={openDateTime} ref={date} id={`dateTimePicker${index}`} required>
      <option value="">Date</option>
    </select>
    <select id={`priority${index}`} required >
      <option value="">Priority</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <select id={`category${index}`} required >
      <option value="">Category</option>
      <option value="work">Work</option>
      <option value="personal">Personal</option>
      <option value="school">School</option>
    </select>
    <textarea placeholder="comment" onChange={handleChange} name="comment" value={state.comment}></textarea>
    <button onClick={collapseForm}>Close</button>
    <input type="submit" value="Update task" />
  </form>
}
function mapStateToProps(state){
  return {
    state: state[1][0]
  }
}
const mapDispatchToProps = {
  setDateRef,
  updateTask
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskInfo);