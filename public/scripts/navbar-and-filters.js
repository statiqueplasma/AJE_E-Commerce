const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const container = document.querySelector(".container");
    const body = document.querySelector(".body");
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        if (container.classList.contains("active")) {
            container.classList.toggle("active");
            container.classList.toggle("passive");
            body.style.display = "block";
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.3s ease forwards ${index / 10 + 0.3}s`
                }
            })

        } else {
            body.style.display = "none"
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.3s ease forwards ${index / 10 + 0.3}s`
                }
            })
        }
    })
}
navSlide();

const toggle = document.querySelector(".filter-toggler");
toggle.addEventListener('click', function () {
    const container = document.querySelector(".container");
    const navLinks = document.querySelectorAll('.nav-links li');
    const nav = document.querySelector('.nav-links');
    const body = document.querySelector(".body");
    if (container.classList.contains("active")) {
        container.classList.toggle("active");
        container.classList.toggle("passive");
        body.style.display = "block";
        console.log("block");
    }
    else {
        nav.classList.toggle('nav-active');
        navLinks.forEach(link => {
            link.style.animation = '';
        })
        container.classList.toggle("passive");
        container.classList.toggle("active");
        body.style.display = "none";

    }
})

const returnBtn = document.querySelector(".return")
returnBtn.addEventListener('click', function () {
    const container = document.querySelector(".container");
    const body = document.querySelector(".body");
    if (container.classList.contains("active")) {
        container.classList.toggle("active");
        container.classList.toggle("passive");
        body.style.display = "block";
    } else {
        container.classList.toggle("active");
        container.classList.toggle("passive");
        body.style.display = "none";
    }

})
