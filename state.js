import { createStore } from 'redux';

// Action Creator
export function addTask(task) {
  return {
    type: 'ADD_TASK',
    data: task
  }
}
export function removeTask(index) {
  return {
    type: 'REMOVE_TASK',
    data: index
  }
}
export function updateTask(data, index) {
  return {
    type: 'UPDATE_TASK',
    data: data,
    index: index
  }
}

//sets checkbox value of a task
export function setStatus(task){
  return {
    type: 'SET_TASK_STATUS',
    index: task.index,
    status: task.status
  }
}

//sets a reference to DatePicker component
export function setDateRef(ref) {
  return {
    type: 'SET_DATE_REF',
    data: ref
  }
}

//sets a reference to HOC DateTimePicker
export function setDateTimeRef(ref) {
  return {
    type: 'SET_DATETIME_REF',
    data: ref
  }
}

//sets picked Date value to store @ [2].date
export function setDateState(state) {
  return {
    type: 'SET_DATE_STATE',
    data: state
  }
}

//sets picked Time value to store @ [2].time
export function setTimeState(state) {
  return {
    type: 'SET_TIME_STATE',
    data: state
  }
}

const initialState = [];
initialState[0] = (JSON.parse(localStorage.getItem("tasks")) !== null) ? [...JSON.parse(localStorage.getItem("tasks"))] : [/*{
  category: "work",
  comment: "The road to success is numerous, you choose your own path.",
  due: 12367388,
  priority: "medium",
  status: "completed",
  text: "work harder"
  },
  {
  category: "personal",
  comment: "The road to success is numerous, you choose your own path.",
  due: 1682325307007,
  priority: "medium",
  status: "inComplete",
  text: "focus"
  } *///tasks
];
initialState.push([
  {current: null},
  {current: null}
  ],//elements refs
  {date: new Date(), time: [`${new Date().getHours() * 3600 + new Date().getMinutes() * 60}`, "AM"]});

const state = function reducer(state = initialState, action){
  switch (action.type){
    case "ADD_TASK":
      return [[...state[0], action.data], state[1], state[2]];
      break;
    case "UPDATE_TASK":
      state[0].splice(action.index, 1, action.data);
      return [[...state[0]], state[1], state[2]];
      break;
    case "REMOVE_TASK":
      state[0].splice(action.data, 1);
      return [[...state[0]], state[1], state[2]];
      break;
    case "SET_TASK_STATUS":
      state[0][action.index] = {...state[0][action.index], status: action.status
      }
      return [[...state[0]], state[1], state[2]];
      break;
    case "SET_DATETIME_REF":
      return [[...state[0]], [action.data, state[1][1]], state[2]];
      break;
    case "SET_DATE_REF":
      return [[...state[0]], [state[1][0], action.data], state[2]];
    case "SET_DATE_STATE":
      return [state[0], state[1], {...state[2], date: action.data}];
      break;
    case "SET_TIME_STATE":
      return [[...state[0]], state[1], {...state[2], time: action.data}];
      break;
    default:
      return state;
  }
}

export default createStore(state);