import React from 'react';
import { connect } from 'react-redux';
import { removeTask } from "state";
import { createPortal } from 'react-dom';
function DeleteModal(props){
  function deleteTask(e){
    let id = e.target.parentElement.getAttribute("trash");
    props.removeTask(id);
    closeModal();
  }
  function closeModal(){
    document.getElementById("deleteModal").style.display = "none";
  }
  return createPortal(<div id="deleteModal">
    <div id="deleteBox" trash={null}>
      <p>Task can't be recovered once deleted.</p>
      <button onClick={deleteTask}>ok</button><button onClick={closeModal}>cancel</button>
    </div>
  </div>, document.getElementById("modals"));
}
const mapDispatchToProps = {
  removeTask
}
export default connect(null, mapDispatchToProps)(DeleteModal);