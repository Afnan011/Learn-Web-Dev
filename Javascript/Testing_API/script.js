const URL = "http://localhost:3000";
// const URL = "http://mca-fest.onrender.com";


const teamList = [];

// fetch(`${URL}/team`)
//   .then((res) => res.json())
//   .then((data) => {
//     data.forEach((team) => {
//       console.log(team);
//       teamList.push(team);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const teamId = "658811fa898946966c1f821d";
// fetch(`${URL}/team/${teamId}`, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     teamName: "CyberKnights",
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// function signUp() {
//   window.location.href = "./auth/signup.html";
// }

// function logIn() {
//   window.location.href = "./auth/login.html";
// }


// const getToken = () => {
//     return localStorage.getItem("jwtToken");
// };


// const token = getToken();

// if(token){
//     window.location.href = "../home.html";
//     console.log('token found');
// }
console.log('scriopt');

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  const targetPath = event.target.href || window.location.pathname;
  window.history.pushState({}, "", targetPath);
  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/": "/auth/login.html",
  "/signup": "/auth/signup.html",
  "/login": "/auth/login.html",
  "/about": "/pages/about.html",
  "/home": "/pages/home.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path);
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.querySelector(".main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

// Initial page load
handleLocation();



