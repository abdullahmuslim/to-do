import React from 'react';
import ReactDOM from 'react-dom';
import store from 'state';
import { Provider } from 'react-redux';
import AddTask from 'components/AddTask';
import Filters from 'components/Filters';
import Tasks from 'components/Tasks';
import DateTimePicker from 'components/DateTimePicker';
import DeleteModal from 'components/DeleteModal';
import Menu from 'components/Menu';

//save tasks to localStorage on every change
store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState()[0]))
});

//register service worker
if ("serviceWorker" in navigator){
  navigator.serviceWorker.register("ws.js")
  .then(() => {
  })
  .catch(() => {
  });
}

ReactDOM.render(
  <React.Fragment>
    <Menu />
    <div>
      <Provider store={store}>
        <AddTask />
        <div>
          <Filters />
          <Tasks />
        </div>
        <DateTimePicker />
        <DeleteModal />
      </Provider>
    </div>
  </React.Fragment>,
document.getElementById("todo-app"));