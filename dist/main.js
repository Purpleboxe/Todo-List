(()=>{"use strict";class e{constructor(e){this.name=e,this.tasks=[]}}const t=[],n=document.querySelector(".projects"),c=document.getElementById("body");function o(e){const o=document.createElement("div");o.classList.add("project"),o.setAttribute("id",t.indexOf(e));const s=document.createElement("img");s.src="images/text-box-outline.svg",o.appendChild(s);const l=document.createElement("div");l.innerText=e.name,o.appendChild(l),o.addEventListener("click",(()=>{!function(e){document.querySelectorAll(".project").forEach((e=>{e!==this&&e.classList.remove("selected")})),e.classList.add("selected")}(o),c.innerHTML=`\n        <div class="top">\n        <h3>${e.name}</h3>\n        </div>\n        `;const n=document.querySelector(".top"),s=document.createElement("button");s.classList.add("projectDelete"),s.innerText="Delete",n.appendChild(s),s.addEventListener("click",(()=>{!function(e){c.innerHTML="",t.splice(t.indexOf(e),1),d()}(e)}))})),n.appendChild(o)}function d(){document.querySelectorAll(".project").forEach((e=>{n.removeChild(e)}));for(let e=0;e<t.length;e++)o(t[e])}const s=()=>{const e=document.getElementById("addProject"),t=document.querySelector(".overlay"),n=document.getElementById("name");e.classList.add("active"),t.classList.add("active"),n.focus(),n.value=""},l=()=>{const e=document.getElementById("addProject"),t=document.querySelector(".overlay");e.classList.remove("active"),t.classList.remove("active")};document.getElementById("addProjectBtn").addEventListener("click",s),document.querySelector(".overlay").addEventListener("click",l),document.getElementById("addProjectForm").onsubmit=n=>{n.preventDefault();const c=n.target.name.value;""==c?alert("Name cannot be empty!"):(function(e){t.push(e),d()}(new e(c)),l(),console.log(t))}})();