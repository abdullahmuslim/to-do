import React from 'react';
import { connect } from 'react-redux';
import { setStatus } from 'state';
import TaskInfo from 'components/TaskInfo';

function Tasks(props){
  return <ul id="tasks">{
    props.state.map((task, key) => {
      return <ATask key={key} index={key} task={task} />
    })
  }</ul>
}

function ATask(props){
  const {index, task} = props;
  let due = new Date(task.due);
  let now = new Date();
  let classes;
  if ((due.getFullYear() === now.getFullYear() || due.getFullYear() > now.getFullYear()) && (due.getMonth() === now.getMonth() || due.getMonth() > now.getMonth())){
    if(getWeek(now) < getWeek(due)){
      classes = "future aTask";
    }else if(getWeek(now) === getWeek(due)){
      if(now.getDate() === due.getDate()){
        classes = "today aTask";
      }else{
        classes = "thisweek aTask";
      }
    }else{
      classes = "pastDue aTask";
    }
  }else{
    classes = "pastDue aTask";
  }
  
  function getWeek(currentDate){
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  }
  
  let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  function handleChange(e){
    const parent = e.target.parentElement.parentElement;
    if (e.target.checked){
      parent.classList.add("completed");
      parent.classList.remove("inComplete")
      props.setStatus({index: index, status: "completed"});
    }else{
      parent.classList.remove("completed")
      parent.classList.add("inComplete");
      props.setStatus({index: index, status: "inComplete"});
    }
  }
  
  function removeTask(e){
    const deleteModal = document.getElementById("deleteBox");
    deleteModal.parentElement.style.display = "flex";
    deleteModal.setAttribute("trash", index);
  }
  
  function openInfo(){
    /*opens extra information about a task and editing*/
    const el = document.getElementById(`updateTask${index}`);
    el.style.display = "flex";
  }
  
  return <li key={index}>
    <div className={`${task.status} ${task.category} ${task.priority} ${classes}`}>
      <div>
        <input type="checkbox" onChange={handleChange} checked={(task.status === "completed") ? true : false}/>
        <p onClick={openInfo}>{task.text}</p>
        <p className="tablet desktop">{`${months[due.getMonth()]} ${due.getDate()}, ${due.getFullYear()}`}</p>
        <p className="tablet desktop">{task.category}</p>
      </div>
      <svg onClick={removeTask} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="24" height="24"
viewBox="0 0 24 24" style={{stroke: "#e6bbad", fill: "#f22222"}}>
        <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" />
      </svg>
      <img src="" />
    </div>
    <TaskInfo index={index} task={task} />
  </li>;
}

const mapDispatchToProps = {
  setStatus
}

function mapStateToProps(state) {
  return {
    state: state[0]
  };
}

export default connect(mapStateToProps)(Tasks);

ATask = connect(null, mapDispatchToProps)(ATask);