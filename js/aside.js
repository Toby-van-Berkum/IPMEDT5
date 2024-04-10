window.addEventListener('DOMContentLoaded', () => {
    const aside_img = document.getElementById("aside_img");
    let rnd_nbr = Math.floor((Math.random() * 3) + 1);
    aside_img.src=`/img/plant${rnd_nbr}.avif`;
});