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
    const aside = document.querySelector("aside");
    console.log(aside);
    aside.style.left = 0;
  }
  
  function closeMenu(){
    const options = document.getElementById("menuOptions");
    options.style.left = "-70vw";
    const aside = document.querySelector("aside");
    aside.style.display = "none";
    const menu = document.getElementById("menu");
    menu.style.display = "flex";
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
    <aside onClick={closeMenu}>
      <div id="menu">
        <svg viewBox="0 0 100 100" onClick={openMenu}>
          <line x1="0" y1="8" x2="100" y2="8" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
          <line x1="0" y1="50" x2="100" y2="50" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
          <line x1="0" y1="92" x2="100" y2="92" style={{stroke: "var(--blacks)", strokeWidth: 15, strokeLinecap: "round"}}/>
        </svg>
      </div>
      <div id="menuOptions">
        <div>
         <div className="toggler" onClick={changeTheme}>
           <p className="toggleButton"></p>
         </div>
        </div>
        <div id="attribution">Icons by 
          <a href="icons8.com"><img src="icons/icons8.svg" alt="ICONS8"/></a>
          &
          <a href="flaticon.com"><img src="icons/flaticon.svg" alt="FLATICON"/></a>
        </div>
      </div>
    </aside>
    );
}