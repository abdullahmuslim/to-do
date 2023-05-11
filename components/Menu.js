import React, { useEffect } from 'react';

export default function Menu(){
  let theme;
  if (localStorage.getItem("theme")){
    theme = localStorage.getItem("theme");
  }else{
    localStorage.setItem("theme", "light");
    theme = "light";
  }
  
  useEffect(() => changeTheme(), []);
  
  function openMenu(){
    const options = document.getElementById("menuOptions");
    options.style.left = 0;
    const trans = document.getElementById("trans");
    trans.style.left = 0;
  }
  
  function closeMenu(){
    const options = document.getElementById("menuOptions");
    options.style.left = "-70vw";
    const trans = document.getElementById("trans");
    trans.style.left = "-100vw";
  }
  
  function changeTheme(){
    switch (theme){
      case "light":
        localStorage.setItem("theme", "dark");
        break;
      case "dark":
        localStorage.setItem("theme", "light");
        break;
    }
  }
  
  return (
    <nav>
      <div id="trans" onClick={closeMenu}></div>
      <div id="menu">
        <svg viewBox="0 0 100 100" onClick={openMenu}>
          <line x1="0" y1="8" x2="100" y2="8" style={{stroke: "var(--whites)", strokeWidth: 15, strokeLinecap: "round"}}/>
          <line x1="0" y1="50" x2="100" y2="50" style={{stroke: "var(--whites)", strokeWidth: 15, strokeLinecap: "round"}}/>
          <line x1="0" y1="92" x2="100" y2="92" style={{stroke: "var(--whites)", strokeWidth: 15, strokeLinecap: "round"}}/>
        </svg>
        <p>To-do</p>
      </div>
      <div id="menuOptions">
        <div>
        <p>Dark theme</p>
         <div className="toggler" onClick={changeTheme}>
           <p className="toggleButton"></p>
         </div>
        </div>
        <div>
        <p>Notification</p>
         <div className="toggler" onClick={changeTheme}>
           <p className="toggleButton"></p>
         </div>
        </div>
        <div id="attribution">Icons by 
          <a href="icons8.com"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"/><path fill="var(--secondary-color)" d="M11 10H24V38H11z"/><path fill="var(--secondary-color)" d="M31 10A7 7 0 1 0 31 24 7 7 0 1 0 31 10zM31 24A7 7 0 1 0 31 38 7 7 0 1 0 31 24z"/></svg></a>
          and
          <a href="flaticon.com"><svg data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 76.5"><path d="M46.3 26.5H26.9L20.8 16h31.6l9.2-16H9.4a9.3 9.3 0 00-8.1 4.7 9.3 9.3 0 000 9.4l33.3 57.7a9.4 9.4 0 0016.2 0l1.1-1.9-15.3-26.6z" fill="var(--secondary-color)"/><path d="M84.2 4.7A9.3 9.3 0 0076.1 0h-2.3l-25 43.3 9.2 16L84.2 14a9.3 9.3 0 000-9.3z" fill="var(--secondary-color)"/></svg></a>
        </div>
      </div>
    </nav>
    );
}