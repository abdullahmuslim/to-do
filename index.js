import React from 'react';
import ReactDOM from 'react-dom';
import store from 'state';
import { Provider } from 'react-redux';
import Addtask from 'components/Addtask';
import Filters from 'components/Filters';
import Tasks from 'components/Tasks';
import DateTimePicker from 'components/DateTimePicker';
import DeleteModal from 'components/DeleteModal';

store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState()[0]))
});
ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Addtask />
      <div>
        <Filters />
        <Tasks />
      </div>
      <DateTimePicker />
      <DeleteModal />
    </Provider>
  </React.Fragment>,
document.getElementById("todo-app"));