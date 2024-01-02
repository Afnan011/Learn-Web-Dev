// const URL = "http://localhost:3000";

console.log('login.js');

const validate = (email, password) => {
    if (email === "" || password === "" ) {
      alert("Please fill all the fields");
      return false;
    }
    return true;
}

const loginBtn = document.forms["loginForm"]["submitBtn"];
console.log(loginBtn);

 loginBtn.addEventListener("click", async (e) => {
    const email = document.forms["loginForm"]["email"].value;
    const password = document.forms["loginForm"]["password"].value;

    console.log(email);
    console.log(password);

    const isPosted = await postData(email, password);

    if(isPosted){
        window.location.href = "/home";
    }
});

const storeToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

const storeTeamId = (teamId) => {
  localStorage.setItem("teamId", teamId);
};

const postData = async (email, password) => {
    try {
      const res = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
      });
      const data = await res.json();
  
      if (res.status == 400) {
        alert(data.error);
        return false;
      }
  
      console.log(data);
      storeToken(data.data.token);
      storeTeamId(data.teamId);
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
};


  