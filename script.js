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

$num = $('.imgJq').length;

// On crée une variable pair et impair 
// qui vont nous servir à déterminer le milieu du carroussel
$even = $num / 2;
$odd = ($num + 1) / 2;


// on détermine l'image central du carousel,
// on lui applique la classe active pour lui donner un css particulier
// la propriété nth-child(x) permet de parcourir et selectionner un enfant en particulier
// nth-child(1) équivaut à la première image
// et donc nth-child(even ou odd) équivaut à l'image centrale
// note bien la concaténation afin d'utiliser la variable
if ($num % 2 == 0) {
    $('.imgJq:nth-child(' + $even + ')').addClass('active');
    // on aplique à l'enfant précedent une classe 'prev'
    // JQuery s'avère très pratique puisque la fonction prev() et next() n'existe pas en natif, il faut "gruger" (cf voir plus bas)
    $('.imgJq:nth-child(' + $even + ')').prev().addClass('prev');
    $('.imgJq:nth-child(' + $even + ')').next().addClass('next');
} else {
    $('.imgJq:nth-child(' + $odd + ')').addClass('active');
    $('.imgJq:nth-child(' + $odd + ')').prev().addClass('prev');
    $('.imgJq:nth-child(' + $odd + ')').next().addClass('next');
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
/*============= CAROUSEL TYPE MANEGE JAVASCRIPT ==============*/
/*============================================================*/