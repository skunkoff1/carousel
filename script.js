/*============================================================*/
/*================== CAROUSEL SLIDE EN JQUERY ================*/
/*============================================================*/

$imageSlideJq = 0; // Compteur d'image
$('#buttonLeftJq').hide();

function slideJq(move) {
    if (move == "left") {
        if ($imageSlideJq > 0) {
            $imageSlideJq -= 1;
            $('#figureJq').animate({ left: "+=100%" });
            $('#buttonRightJq').show();
        }
        if ($imageSlideJq == 0) {
            $('#buttonLeftJq').hide();
        }
    } else if (move == "right") {
        if ($imageSlideJq < 9) {
            $imageSlideJq += 1;
            $('#figureJq').animate({ left: "-=100%" });
            $('#buttonLeftJq').show();
            console.log($imageSlideJq)
        }
        if ($imageSlideJq == 9) {
            $('#buttonRightJq').hide();
        }
    }
}

/*============================================================*/
/*============== CAROUSEL SLIDE EN JAVASCRIPT ================*/
/*============================================================*/

let imageSlideJs = 0;
let buttonLeft = document.getElementById("buttonLeftJs");
let buttonRight = document.getElementById("buttonRightJs");
let slider = document.getElementById('figureJs');
slide = 0;
buttonLeft.style.display = "none";

function slideJs(move) {
    if (move == "left") {
        if (imageSlideJs > 0) {
            imageSlideJs -= 1;
            buttonRight.style.display = "block";
            for (let i = 1; i <= 100; i++) {
                setTimeout(() => {
                    slider.style.left = (slide + i) + "%";
                    if (i == 100) {
                        slide += i;
                    }
                }, i * 3);

            }
        }
        if (imageSlideJs == 0) {
            buttonLeft.style.display = "none";
        }
    } else if (move == "right") {
        if (imageSlideJs < 9) {
            imageSlideJs += 1;
            buttonLeft.style.display = "block";
            for (let i = 1; i <= 100; i++) {
                setTimeout(() => {
                    slider.style.left = (slide - i) + "%";
                    if (i == 100) {
                        slide -= i;
                    }
                }, i * 3);

            }

            console.log(imageSlideJs);
        }
        if (imageSlideJs == 9) {
            buttonRight.style.display = "none";
        }
    }
}

/*============================================================*/
/*=============== CAROUSEL TYPE MANEGE JQUERY ================*/
/*============================================================*/

$numJq = $('.imgJq').length;

// On crée une variable pair et impair 
// qui vont nous servir à déterminer le milieu du carroussel
$evenJq = $numJq / 2;
$oddJq = ($numJq + 1) / 2;


// on détermine l'image central du carousel,
// on lui applique la classe active pour lui donner un css particulier
// la propriété nth-child(x) permet de parcourir et selectionner un enfant en particulier
// nth-child(1) équivaut à la première image
// et donc nth-child(evenJq ou oddJq) équivaut à l'image centrale
// note bien la concaténation afin d'utiliser la variable
if ($numJq % 2 == 0) {
    $('.imgJq:nth-child(' + $evenJq + ')').addClass('active');
    // on aplique à l'enfant précedent une classe 'prev'
    // JQuery s'avère très pratique puisque la fonction prev() et next() n'existe pas en natif, il faut "gruger" (cf voir plus bas)
    $('.imgJq:nth-child(' + $evenJq + ')').prev().addClass('prev');
    $('.imgJq:nth-child(' + $evenJq + ')').next().addClass('next');
} else {
    $('.imgJq:nth-child(' + $oddJq + ')').addClass('active');
    $('.imgJq:nth-child(' + $oddJq + ')').prev().addClass('prev');
    $('.imgJq:nth-child(' + $oddJq + ')').next().addClass('next');
}

// on applique un écouteur d'évenements à toutes nos images
$('.imgJq').click(function() {

    // On récupère la largeur de l'image courante pour déterminer 
    // de combien de pixel le carroussel doit se décaler
    // le +40 correspond à la bordure de 20px qu'on a ajouté (voir css-> .imgJq.active)
    $slide = $('.active').width() + 40;

    // le "this" permet de jouer sur l'élément courant,
    // ici, il correspond à l'image sur laquelle on clique 
    //(gauche ou droite donc celle qui a une classe prev ou next)
    // si on clique sur la next donc droite , le caroussel doit aller vers la gauche
    // donc sa propriété css left (qui mesure l'espace depuis le bord gauche de l'écran et peut être négative)
    // doit décroitre
    if ($(this).hasClass('next')) {
        $('#carFigJq').stop(false, true).animate({ left: '-=' + $slide });
    }
    // et donc l'inverse
    else if ($(this).hasClass('prev')) {
        $('#carFigJq').stop(false, true).animate({ left: '+=' + $slide });
    }

    // Une fois que le caroussel s'est déplacé,
    // on efface toutes les classes "active" "prev" et "next"
    $(this).removeClass('prev next');
    $(this).siblings().removeClass('prev active next');

    // on redéfinit quel image est l'active, next ou prev 
    // this étant celle suer laquelle on clique
    // elle devient l'active
    $(this).addClass('active');
    // puis on s'occupe de sa précédente et de sa suivante
    $(this).prev().addClass('prev');
    $(this).next().addClass('next');
});

/*============================================================*/
/*======== CAROUSEL TYPE MANEGE JAVASCRIPT EN DUR ============*/
/*============================================================*/

let imgTab = document.querySelectorAll(".imgJs");
let numJs = imgTab.length;
let even = numJs / 2;
let odd = (numJs + 1) / 2;
let current = 0;
let width = 0;
let left = 0;
let carouselJs = document.getElementById('carFigJs');

if (numJs % 2 == 0) {
    document.querySelector('.imgJs:nth-child(' + even + ')').className = "imgJs active";
    document.querySelector('.imgJs:nth-child(' + (even + 1) + ')').className = "imgJs next";
    document.querySelector('.imgJs:nth-child(' + (even - 1) + ')').className = "imgJs prev";
    current = even;
} else {
    document.querySelector('.imgJs:nth-child(' + odd + ')').className = "imgJs active";
    document.querySelector('.imgJs:nth-child(' + (odd + 1) + ')').className = "imgJs next";
    document.querySelector('.imgJs:nth-child(' + (odd - 1) + ')').className = "imgJs prev";
    current = odd;
}

function move(img) {
    if (current > 0 && img.className.includes('prev')) {
        let active = document.querySelector('.imgJs.active')

        // J'ai recréé l'animation de transition
        // avec une boucle for qui bouge progressivement le caroussel

        for (let i = left; i < left + active.offsetWidth; i++) {
            setTimeout(() => {
                width = i;
                carouselJs.style.left = width + 'px';
                if (i == left + 552 - 1) {
                    left = width;
                }
            }, i - left);
        }


        if (document.querySelector('.imgJs.next')) {
            document.querySelector('.imgJs.next').className = 'imgJs';
        }
        active.className = "imgJs next"

        document.querySelector('.imgJs.prev').className = 'imgJs active';
        if (document.querySelector('.imgJs:nth-child(' + (current - 2) + ')')) {
            document.querySelector('.imgJs:nth-child(' + (current - 2) + ')').className = "imgJs prev";
        }
        current -= 1;
    } else if (current < numJs && img.className.includes('next')) {
        let active = document.querySelector('.imgJs.active')

        // J'ai recréé l'animation de transition
        // avec une boucle for qui bouge progressivement le caroussel

        for (let i = -left; i < -left + active.offsetWidth; i++) {
            setTimeout(() => {
                width = -i;
                carouselJs.style.left = width + 'px';
                if (i == -left + 552 - 1) {
                    left = width;
                }
            }, i + left);
        }

        if (document.querySelector('.imgJs.prev')) {
            document.querySelector('.imgJs.prev').className = 'imgJs';
        }
        active.className = "imgJs prev"

        document.querySelector('.imgJs.next').className = 'imgJs active';

        if (document.querySelector('.imgJs:nth-child(' + (current + 2) + ')')) {
            document.querySelector('.imgJs:nth-child(' + (current + 2) + ')').className = "imgJs next";
        }
        current += 1;
    }
};

/*============================================================*/
/*======== CAROUSEL TYPE MANEGE JAVASCRIPT EN DUR ============*/
/*============================================================*/

let imgTab2 = document.querySelectorAll(".imgJs2");
let num2 = imgTab.length;
let even2 = num2 / 2;
let odd2 = (num2 + 1) / 2;

if (num2 % 2 == 0) {
    document
        .querySelector(".imgJs2:nth-child(" + even2 + ")")
        .classList.add("active");
    document
        .querySelector(".imgJs2:nth-child(" + (even2 + 1) + ")")
        .classList.add("next");
    document
        .querySelector(".imgJs2:nth-child(" + (even2 - 1) + ")")
        .classList.add("prev");
} else {
    document.querySelector(".imgJs2:nth-child(" + odd2 + ")").classList.add("active");
    document
        .querySelector(".imgJs2:nth-child(" + (odd2 + 1) + ")")
        .classList.add("next");
    document
        .querySelector(".imgJs2:nth-child(" + (odd2 - 1) + ")")
        .classList.add("prev");
}

for (const img of imgTab2) {
    img.onclick = e => {
        const active = document.querySelector(".imgJs2.active");
        const prev = document.querySelector(".imgJs2.prev");
        const next = document.querySelector(".imgJs2.next");
        const size = active.offsetWidth;
        const figure = document.getElementById("carFigJs2");

        if (!figure.style.left) figure.style.left = "0px";

        const left = parseInt(figure.style.left);
        if (e.target.classList.contains("next")) {
            figure.style.left = `${left - size}px`;
        } else if (e.target.classList.contains("prev")) {
            figure.style.left = `${left + size}px`;
        }

        if (next) next.classList.remove("next");
        if (prev) prev.classList.remove("prev");
        active.classList.remove("active");

        e.target.classList.add("active");
        if (e.target.previousElementSibling)
            e.target.previousElementSibling.classList.add("prev");
        if (e.target.nextElementSibling)
            e.target.nextElementSibling.classList.add("next");
    };
}