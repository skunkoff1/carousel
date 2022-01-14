//je me suis occupé de passer en JQuery que la premiere de nos trois fonctions
// A toi de jouer pour les deux autres ^^


//Récupération de nos boutons afin de les manipuler

/* Version Javascript Vanilla
// On les récupère et les stocke dans une variable pour les manipuler
let bouton1 = document.getElementById("boutonFilms")
let bouton2 = document.getElementById("boutonSpecies")
let bouton3 = document.getElementById("boutonVehicles")

// On leur applique un écouteur d'évènements
// le premier parametre ('click') indique à quel type d'évènement le bouton doit réagir
// le second parametre indique ce qu'il doit faire lorque l'évènement survient
// ici, on lui dit de lancer une fonction
// on pourrait tout aussi bien écrire directement la fonction mais c'est moins lisible et moins maintenable
bouton1.addEventListener("click", getMoviesList)
bouton2.addEventListener("click", getSpeciesList)
bouton3.addEventListener("click", getVehiclesList)
*/

// Version Jquery

// le $ en Jquery === le support de toutes les fonctionnalités du framework
$('#boutonFilms').click(getMoviesList);
$('#boutonSpecies').click(getSpeciesList);
$('#boutonVehicles').click(getVehiclesList);


/*======================= FONCTIONS ASSOCIEES AUX BOUTONS ===============*/

function getMoviesList() {
    $.ajax({
        url: "https://ghibliapi.herokuapp.com/films",
        type: "GET",
        datatype: "json",
        success: function(data) {

            // La version en Javascript Vanilla
            /*

            // On parcourt le tableau JSON reçu => ici element va donc prendre à chaque itération la valeur data[0] puis data[1], etc...
            for (const element of data) {
                //On crée un élement div, on le stocke dans une variable pour le manipuler
                let movieCard = document.createElement("div");

                // on se sert donc de la variable crée pour donner un id à notre élement afin de pouvoir lui appliquer du CSS
                movieCard.id = "movieCardFilms";

                //on récupère le parent qu'on stocke dans une variable
                let movieContainer = document.getElementById("reponseFilms");

                //on insère l'enfant dans l'élément parent (oui, la tournure est malheureuse)
                movieContainer.appendChild(movieCard);

                // même principe
                let image = document.createElement("img");
                image.id = "movieCardImage";
                movieCard.appendChild(image);

                let original_title = document.createElement("h1");
                original_title.id = "original_title";
                movieCard.appendChild(original_title);

                let title = document.createElement("h2");
                title.id = "title";
                movieCard.appendChild(title);

                // on remplit nos éléments crées avec ce dont on a besoin depuis le tableau json
                image.src = element.image;
                original_title.innerHTML = "element.original_title";
                title.innerHTML = element.title;
                }
            }*/

            //La version Jquery

            // J'ai laisse le console.log du tableau JSON
            console.log(data)

            //On parcourt notre tableau JSON
            for (const elmt of data) {

                //On crée une balise div et on lui donne tout de suite un attribut id, 
                //on le stocke dans une variable pour le manipuler
                //RAPPEL <div id="movieCard"></div>
                //     div = balise id= attribut                 
                let movieCard = $('<div></div>').attr({ id: 'movieCard' });

                //On crée une balise img, on lui donne tout de suite ses attribut source et id
                // et on remplit direct l'attribut source avec sa valeur 
                let movieCardImg = $('<img>').attr({ src: elmt.image, id: 'img' });

                // Ici, on crée directement les balises h1 avec ce qu'elle contient
                let movieCardTitle = $('<h1>' + elmt.title + '</h1>');

                // Ici, on le fais differement mais le résultat est le même
                let originalTitle = $('<h1></h1>').text(elmt.original_title);

                // Enfin, on insere les enfants dans leurs parents respectifs (oui, la tournure est ...hmmmm...)
                $('#reponseFilms').append(movieCard)
                movieCard.append(movieCardImg).append(originalTitle).append(movieCardTitle);

            }

        },
        error: function() {
            console.log("wesh, ca a pas marche");
        }

    })
}



function getSpeciesList() {
    $.ajax({
        url: "https://ghibliapi.herokuapp.com/species",
        type: "GET",
        datatype: "json",
        success: function(data) {
            console.log(data);

            for (const element of data) {

                let speciesCard = document.createElement("div");
                speciesCard.id = "speciesCardSpecies";
                let speciesContainer = document.getElementById("reponseSpecies");
                speciesContainer.appendChild(speciesCard);

                let classification = document.createElement("div");
                classification.id = "speciesCardClassification";
                speciesCard.appendChild(classification);

                let filmsDeSpeciesCard = document.createElement("div");
                filmsDeSpeciesCard.id = "speciesCardFilmsDeSpeciesCard";
                speciesCard.appendChild(filmsDeSpeciesCard);

                let nameDeSpecies = document.createElement("div");
                speciesCard.id = "speciesCardName";
                speciesCard.appendChild(nameDeSpecies);
            }
        }
    })
}

function getVehiclesList() {
    $.ajax({
        url: " https://ghibliapi.herokuapp.com/vehicles",
        type: "GET",
        datatype: "json",
        success: function(data) {
            console.log(data);

            let vehiclesCard = document.createElement("div");
            vehiclesCard.id = "VehicleCard";
            let vehiclesContainer = document.getElementById("reponseVehicle");
            vehiclesContainer.appendChild(vehiclesCard);

            let nameVehicles = document.createElement("div");
            nameVehicles.id = "vehiclesCardName";
            vehiclesCard.appendChild(nameVehicles);

            let pilotVehicles = document.createElement("h3");
            pilotVehicles.id = "Pilot";
            vehiclesCard.appendChild(pilotVehicles);

            let filmVehicles = document.createElement("h4");
            filmVehicles.id = "vehiclesCardfFilm";
            vehiclesCard.appendChild(filmVehicles);
            console.log(data)


        }
    })
}

/*======================== FONCTIONS ASSOCIEES AU CARROUSSEL ==================*/
//pour bien voir le comportement du caroussel ,
//hésite pas à inspecter le html pendant que tu joues avec
// pour voir les classes des images se modifier 
// a chaque fois que tu changes d'image


// On récupère tout les éléments portant une classe "img" en attribut
// Donc toutes les images composant notre carroussel et ca crée un tableau
// on stocke dans la variale num, la longueur du tableau (le nombre d'images donc)
$num = $('.img').length;

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
    $('.img:nth-child(' + $even + ')').addClass('active');
    // on aplique à l'enfant précedent une classe 'prev'
    // JQuery s'avère très pratique puisque la fonction prev() et next() n'existe pas en natif, il faut "gruger" (cf voir plus bas)
    $('.img:nth-child(' + $even + ')').prev().addClass('prev');
    $('.img:nth-child(' + $even + ')').next().addClass('next');
} else {
    $('.img:nth-child(' + $odd + ')').addClass('active');
    $('.img:nth-child(' + $odd + ')').prev().addClass('prev');
    $('.img:nth-child(' + $odd + ')').next().addClass('next');
}

// on applique un écouteur d'évenements à toutes nos images
$('.img').click(function() {

    // On récupère la largeur de l'image courante pour déterminer 
    // de combien de pixel le carroussel doit se décaler
    // le +40 correspond à la bordure de 20px qu'on a ajouté (voir css-> .img.active)
    $slide = $('.active').width() + 40;

    // le "this" permet de jouer sur l'élément courant,
    // ici, il correspond à l'image sur laquelle on clique 
    //(gauche ou droite donc celle qui a une classe prev ou next)
    // si on clique sur la next donc droite , le caroussel doit aller vers la gauche
    // donc sa propriété css left (qui mesure l'espace depuis le bord gauche de l'écran et peut être négative)
    // doit décroitre
    if ($(this).hasClass('next')) {
        $('#carousel').stop(false, true).animate({ left: '-=' + $slide });
    }
    // et donc l'inverse
    else if ($(this).hasClass('prev')) {
        $('#carousel').stop(false, true).animate({ left: '+=' + $slide });
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

// Pour le fun, je te mets la version Javascript Vanilla
// qui ne fonctionne pas aussi bien et bien plus galère à mettre en place
// Pour qu'elle fonctionne, il faut dans le html, rajouter la fonction move avec le parametre this sur le clic de chaque image

/*let imgTab = document.querySelectorAll(".img");
let num = imgTab.length;
let even = num / 2;
let odd = (num + 1) / 2;
let current = 0;
let width = 0;
let left = 0;

if (num % 2 == 0) {
    document.querySelector('.img:nth-child(' + even + ')').className = "img active";
    document.querySelector('.img:nth-child(' + (even + 1) + ')').className = "img next";
    document.querySelector('.img:nth-child(' + (even - 1) + ')').className = "img prev";
    current = even;
} else {
    document.querySelector('.img:nth-child(' + odd + ')').className = "img active";
    document.querySelector('.img:nth-child(' + (odd + 1) + ')').className = "img next";
    document.querySelector('.img:nth-child(' + (odd - 1) + ')').className = "img prev";
    current = odd;
}

function move(img) {
    if (current > 0 && img.className.includes('prev')) {
        let active = document.querySelector('.img.active')
        width += active.offsetWidth;
        let carousel = document.getElementById('carousel');
        carousel.style.left = width + 'px';

        // J'ai essayé de recréer l'animation de transition
        // avec une boucle for qui bouge progressivement le caroussel
        // mais ca marche pas terrible ma solution ^^

        // for (let i = left; i < left + active.offsetWidth; i++) {
        //     setTimeout(() => {
        //         width = i;
        //         carousel.style.left = width + 'px';
        //         console.log(i + ', left :' + width)
        //         if (i == left + active.offsetWidth - 1) {
        //             left += width;
        //             console.log(left)
        //         }
        //     }, i - i);
        // }


        if (document.querySelector('.img.next')) {
            document.querySelector('.img.next').className = 'img';
        }
        active.className = "img next"

        document.querySelector('.img.prev').className = 'img active';
        if (document.querySelector('.img:nth-child(' + (current - 2) + ')')) {
            document.querySelector('.img:nth-child(' + (current - 2) + ')').className = "img prev";
        }
        current -= 1;
    } else if (current < num && img.className.includes('next')) {
        let active = document.querySelector('.img.active')
        width -= active.offsetWidth;
        let carousel = document.getElementById('carousel');
        carousel.style.left = width + 'px';


        // J'ai essayé de recréer l'animation de transition
        // avec une boucle for qui bouge progressivement le caroussel
        // mais ca marche pas terrible ma solution ^^

        // for (let i = left; i < left + active.offsetWidth; i++) {
        //     setTimeout(() => {
        //         width = left - i;
        //         carousel.style.left = width + 'px';
        //         console.log(i + ', left :' + width)
        //         if (i == left + active.offsetWidth - 1) {
        //             left += width;
        //             console.log(left)
        //         }
        //     }, i - i);
        // }

        if (document.querySelector('.img.prev')) {
            document.querySelector('.img.prev').className = 'img';
        }
        active.className = "img prev"

        document.querySelector('.img.next').className = 'img active';

        if (document.querySelector('.img:nth-child(' + (current + 2) + ')')) {
            document.querySelector('.img:nth-child(' + (current + 2) + ')').className = "img next";
        }
        current += 1;
    }
};*/