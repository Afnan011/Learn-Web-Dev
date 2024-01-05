const menu = document.querySelector(".menu-bar");
let nav = document.querySelector(".hide").style;

const body = document.querySelector('body')


menu.onclick = (e) => {
    console.log(e);
    if (nav.display == "flex") {
        nav.display="none";
    }
    else{
        nav.display="flex";
    }
}

if (body.onclick && !menu.onclick) {
    nav.display="none"
}


