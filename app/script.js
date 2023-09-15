// recipes = [
//   {
//     id: 1,
//     title: "Idly",
//     time: "30 min",
//     steps: "Grind the batter. Steam it.",
//     pic: "https://www.chefspencil.com/wp-content/uploads/Idli-1.jpg",
//   },
//   {
//     id: 2,
//     title: "Dosa",
//     time: "10 min",
//     steps: "Grind the batter. Spread in the griddle. Cook with or without oil. ",
//     pic: "https://t3.ftcdn.net/jpg/01/86/33/72/360_F_186337209_9rbcMLu3wGCDNaEoK1jO0aNzb0pv7Xs7.jpg",
//   },
// ];
recipes = [];
function updateUI() {
  clearapp();
  for (let i = 0; i < recipes.length; i++) {
    let recipe = makeRecipediv(recipes[i]);
    appendtoapp(recipe);
  }
  total();
}
function clearapp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}
function makeRecipediv(rec) {
  const divwrap = document.createElement("div");
  divwrap.setAttribute("class", "divwrap");
  divwrap.setAttribute("id", "divwrap");
  const divimg = document.createElement("div");
  divimg.setAttribute("class", "divimg");
  divimg.setAttribute("id", "divimg");
  const divtext = document.createElement("div");
  divtext.setAttribute("class", "divtext");
  divtext.setAttribute("id", "divtext");

  const divtextup = document.createElement("div");
  divtextup.setAttribute("class", "divtextup");

  const h2 = document.createElement("h2");
  h2.innerText = rec.title;

  const h3 = document.createElement("h3");
  h3.innerText = changetimeformat(rec.time);
  //timeformat
  const p = document.createElement("p");
  p.innerText = rec.steps;

  const btnremove = document.createElement("button");

  btnremove.setAttribute("class", "btn-remove");
  btnremove.setAttribute("id", `btn-${rec.id}`);

  btnremove.innerText = "Delete";
  btnremove.addEventListener("click", function () {
    removeRecipe(rec["id"]);
  });

  const img = document.createElement("img");
  img.src = rec.pic;
  img.setAttribute("alt", "foodimage");
  img.setAttribute("class", "rec-img");

  divimg.appendChild(img);

  divtextup.appendChild(h2);
  divtextup.appendChild(h3);
  divtext.appendChild(divtextup);
  divtext.appendChild(p);
  divtext.appendChild(btnremove);

  divwrap.appendChild(divimg);
  divwrap.appendChild(divtext);

  return divwrap;
}
function appendtoapp(recipe) {
  const app = document.querySelector("#app");
  app.appendChild(recipe);
}

function removeRecipe(recId) {
  const toDeleteIndex = recipes.findIndex((recipe) => recipe.id == recId);
  recipes.splice(toDeleteIndex, 1);
  updateUI();
  savetoLocal();
}
function hookform() {
  const form = document.querySelector("#Add-Recipe-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    let time = document.querySelector("#time").value;
    let steps = document.querySelector("#steps").value;
    let url = document.querySelector("#url").value;
    
    const recipe = {
      id: new Date().getTime(),
      title: name,
      time: time,
      steps: steps,
      pic: url,
    };
    addRecipe(recipe);
    location.reload();
    total();

    refresh();
  });
}
function addRecipe(recipe) {
  recipes.push(recipe);
  //sorthere
  sorttime(recipe.time);
  updateUI();
  savetoLocal();
}
//refresh
function refresh() {
  let name = document.querySelector("#name");
  let time = document.querySelector("#time");
  let steps = document.querySelector("#steps");
  let url = document.querySelector("#url");
  name.value = "";
  time.value = "";
  steps.value = "";
  url.value = "";
}
function savetoLocal() {
  const str = JSON.stringify(recipes);
  localStorage.setItem("my-recipes-list", str);
}

function getfromLocal() {
  const str = localStorage.getItem("my-recipes-list");
  if (!str) {
    return recipes;
  } else {
    recipes = JSON.parse(str);
  }
}
function total() {
  let total = recipes.length;
  if (total == 0) {
    // const p = document.createElement("p");
    // p.setAttribute("class", "total-count-red");
    // p.setAttribute("id", "totalp");
    //p.innerText = `Total Recipes : ${total}`;
    const totaldiv = document.querySelector("#showtotal");
    totaldiv.setAttribute("class", "total-count-red");
    totaldiv.innerText = `Total Recipes : ${total}`;
  } else {
    const p = document.createElement("p");
    const totaldiv = document.querySelector("#showtotal");
    totaldiv.setAttribute("class", "total-count-green");
    totaldiv.innerText = `Total Recipes : ${total}`;
  }
  //  refreshtotal();
}
// function refreshtotal() {
// const p = document.querySelector("#totalp");
// p.innerText=''

//  }

function changetimeformat(timegn) {
  let timetochange = timegn.split(":");
  //new Date().setHours(10, 14)
  let hr = timetochange[0];
  let min = timetochange[1];
  let newtime='';
  if (hr!=0) {
    newtime += `${hr} hours`;
    
  } 
  if(min!=0) {
    newtime += `  ${min} minutes`;
  }
  return newtime;
}
function sorttime() {

  // let timetosort = recipeTime.split(":");
  // let hr = timetochange[0];
  // let min = timetochange[1];
  //new Date(year,month,day,hours,minutes)
  //const timecreated=new Date(2023,8,15,hr,min)
  recipes.sort(function(a,b){
    let atime = a['time'].split(":");
    let btime = b['time'].split(":");
    return new Date(2023,8,15,atime[0],atime[1])-new Date(2023,8,15,btime[0],btime[1])
  })


}

getfromLocal();
updateUI();
hookform();
