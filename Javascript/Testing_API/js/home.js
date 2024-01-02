const URL = "http://localhost:3000";
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const getTeamId = () => {
  return localStorage.getItem("teamId");
};

const removeToken = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("teamId");
};

function getRandomInt(maxNumber) {
  const num = Math.floor(Math.random() * maxNumber);
  const currentTime = new Date().getTime();
  return currentTime * num;
}

const getDataBtn = document.querySelector("#getData");
const updateDataBtn = document.querySelector("#updateData");
const logOutBtn = document.querySelector("#logOut");
const teamName = document.querySelector("#teamName");
const formContainer = document.querySelector(".form-data");

function createInputs(data, prefix = "") {
  let rand = getRandomInt(100);
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const input = document.createElement("input");
      const br = document.createElement("br");
      const label = document.createElement("label");
      input.setAttribute("type", "text");
      input.setAttribute("value", data[key]);
      input.setAttribute("readonly", true);
      input.setAttribute("id", `new-id${rand}`);
      input.classList.add("input-group");
      input.setAttribute(
        "placeholder",
        `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`
      );

      label.setAttribute("for", `new-id${rand}`);
      label.innerText = key;

      formContainer.appendChild(label);
      formContainer.appendChild(input);

      // If the property is an object, recursively create inputs for its properties
      if (typeof data[key] === "object" && data[key] !== null) {
        createInputs(data[key], `${prefix}${key}.`);
        formContainer.appendChild(br);
      }
    }
  }
}

let dataAvailable = false;

getDataBtn.addEventListener("click", async () => {
  
    if(!dataAvailable){
        const team = await getData();
        if (team) {
            createInputs(team);
            dataAvailable = true;
          }
          else{
            dataAvailable = false;
        }
    }
});

updateDataBtn.addEventListener("click", async () => {
  if (dataAvailable) {
    const inputs = document.querySelectorAll(".form-data input");

    inputs.forEach((input) => {
        input.removeAttribute("readonly");
    });
  }
});

logOutBtn.addEventListener("click", () => {
  removeToken();
  window.location.href = "./auth/login.html";
});

const token = getToken();
if (!token) {
  window.location.href = "./auth/login.html";
  console.log("token not found");
}

teamName.innerText = "Cyber";
teamName.style.color = "darkblue";

const getData = async () => {
  try {
    const teamId = getTeamId();
    const res = await fetch(`${URL}/team/${teamId}`);
    const data = await res.json();
    if (res.status == 404) {
      alert(data.message);
      return;
    }
    if (res.status == 500) {
      console.log(data.message);
      alert("internal server error");
      return;
    }
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
