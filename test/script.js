const menu = document.querySelector(".menu-bar");
let nav = document.querySelector(".hide").style;



menu.onclick = function toggleMenu() {
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


