const URL = "http://localhost:3000";
const submitBtn = document.forms["signUpForm"]["submitBtn"];

const validate = (collegeName, email, password, isUg) => {
  if (collegeName === "" || email === "" || password === "" || isUg === "") {
    alert("Please fill all the fields");
    return false;
  }

  return true;
};

submitBtn.addEventListener("click", (e) => {
  const collegeName = document.forms["signUpForm"]["name"].value;
  const email = document.forms["signUpForm"]["email"].value;
  const password = document.forms["signUpForm"]["password"].value;
  let isUg = document.forms["signUpForm"]["isUg"].value;

  if (!validate(collegeName, email, password, isUg)) {
    return false;
  }

  console.log(collegeName);
  console.log(email);
  console.log(password);
  console.log(isUg);

  isUg = isUg === "true" ? true : false;

  const isPosted = postData(collegeName, email, password, isUg);
  if (isPosted) {
    window.location.href = "./auth/login.html";
  }
});

const postData = async (collegeName, email, password, isUg) => {
  try {
    const res = await fetch(`${URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: collegeName,
        email: email,
        password: password,
        isUG: isUg,
      }),
    });
    const data = await res.json();

    if (res.status == 400) {
      alert(data.error);
      return;
    }

    console.log(data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
