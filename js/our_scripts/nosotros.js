const card = document.querySelector('.card__inner');
const card1 = document.querySelector('.card__inner1');
const card2 = document.querySelector('.card__inner2');
const card3 = document.querySelector('.card__inner3');
const card4 = document.querySelector('.card__inner4');
const card5 = document.querySelector('.card__inner5');
const boton = document.querySelector('#boton');
const boton1 = document.querySelector('#boton1');
const boton2 = document.querySelector('#boton2');
const boton3 = document.querySelector('#boton3');
const boton4 = document.querySelector('#boton4');
const boton5 = document.querySelector('#boton5');

card.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
    boton.classList.toggle('aparece');
});
card1.addEventListener("click", function (e) {
    card1.classList.toggle('is-flipped');
    boton1.classList.toggle('aparece');
});

card2.addEventListener("click", function (e) {
    card2.classList.toggle('is-flipped');
    boton2.classList.toggle('aparece');

});
card3.addEventListener("click", function (e) {
    card3.classList.toggle('is-flipped');
    boton3.classList.toggle('aparece');
});
card4.addEventListener("click", function (e) {
    card4.classList.toggle('is-flipped');
    boton4.classList.toggle('aparece');
});
card5.addEventListener("click", function (e) {
    card5.classList.toggle('is-flipped');
    boton5.classList.toggle('aparece');
});