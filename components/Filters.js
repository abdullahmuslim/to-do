import React from 'react';

export default function Filters(){
  const filters = {
    general: null,
    priority: null,
    due: null,
    category: null
  }
  function showFilters(e){
    const el = e.target;
    document.getElementById((el.getAttribute("id") === "filter") ? "extraFilters" : "advanceFilters").style.display = "flex";
    document.getElementById("cancel").style.visibility = "visible";
  }
  function closeFilters(){
    let filter = document.getElementById("filter");
    filter = window.getComputedStyle(filter).getPropertyValue("display");
    let advance = document.getElementById("advance");
    advance = window.getComputedStyle(advance).getPropertyValue("display");
    if (!(filter === "none" && advance === "none")) {
      document.getElementById((filter === "none") ? "advanceFilters" : "extraFilters").style.display = "none";
      document.getElementById("cancel").style.visibility = "hidden";
    }
  }
  function toggleFilter(e){
    const element = e.target;
    if (element.classList.contains("selected")){
      element.classList.remove("selected");
      filters[element.name] = null;
    }else{
      let selecteds = [...document.getElementsByClassName("selected")];
      selecteds.map((currElement) => {
        if (currElement.name === element.name){
          currElement.classList.remove("selected");
        }
      })
      element.classList.add("selected");
      let index = [...element.parentElement.children].indexOf(element);
      filters[element.getAttribute("name")] = (element.getAttribute("name") === "general") ? index : index - 1;
    }
    let filter = document.getElementById("filter");
    filter = window.getComputedStyle(filter).getPropertyValue("display");
    let advance = document.getElementById("advance");
    advance = window.getComputedStyle(advance).getPropertyValue("display");
    if (filter === "none" && advance === "none"){
      applyFilters();
    }
  }
  function applyFilters(){
    let hidden = [...document.getElementsByClassName("hidden")];
    hidden.map((element) => {
      element.classList.remove("hidden");
    });
    let general = ["aTask", "completed", "inComplete"];
    let priority = ["high", "medium", "low"];
    let due = ["thisweek", "today", "future"];
    let category = ["work", "personal", "school"];
    let allTasks = [...document.getElementsByClassName("aTask")];
    allTasks.map((task) => {
      let filterCrit = [];
      for (let filter of Object.getOwnPropertyNames(filters)){
        filterCrit.push((filters[filter] === null) ? true : task.classList.contains(eval(filter)[filters[filter]]));
      }
      let display = filterCrit.every((crit) => crit);
      if (!display){
        task.classList.add("hidden");
      }
    })
    closeFilters();
  }
  return (
    <div id="filters">
      <div id="extraFilters">
        <div>
          <p name="general" className="desktop tablet btnType1" onClick={toggleFilter}>All tasks</p>
          <p name="general" className="desktop tablet btnType1" onClick={toggleFilter}>Completed</p>
          <p name="general" className="desktop tablet btnType1" onClick={toggleFilter}>Incomplete</p>
          <div id="advanceFilters">
            <div>
              <p className="mobile desktop">Priority</p>
              <fieldset name="priority" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Priority</legend>
                High
              </fieldset>
              <fieldset name="priority" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Priority</legend>
                Medium
              </fieldset>
              <fieldset name="priority" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Priority</legend>
                Low
              </fieldset>
            </div>
            <div>
              <p className="mobile desktop">Due</p>
              <fieldset name="due" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Due</legend>
                This week
              </fieldset>
              <fieldset name="due" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Due</legend>
                Today
              </fieldset>
              <fieldset name="due" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Due</legend>
                Future
              </fieldset>
            </div>
            <div>
              <p className="mobile desktop">Category</p>
              <fieldset name="category" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Category</legend>
                Work
              </fieldset>
              <fieldset name="category" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Category</legend>
                Personal
              </fieldset>
              <fieldset name="category" onClick={toggleFilter} className="btnType1">
                <legend className="tablet">Category</legend>
                School
              </fieldset>
            </div>
          </div>
          <div className="mobile desktop">
            <p id="cancel" onClick={closeFilters}>Cancel</p><p onClick={applyFilters}>Apply</p>
          </div>
        </div>
      </div>
      <p id="advance" className="desktop" onClick={showFilters}>advance</p>
      <p id="filter" className="mobile" onClick={showFilters}>Filter</p>
    </div>
    );
}