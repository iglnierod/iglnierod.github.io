// VARIABLES
const display = document.querySelector('.consolas .display');
const ps3Console = document.querySelector('.ps3.console');
const ps4Console = document.querySelector('.ps4.console');
const ps5Console = document.querySelector('.ps5.console');

const pantalla = document.querySelector('.pantalla');
const pantallaDefault = `<article class="default"><img src="../img/logo-playstation.png" width="200px"><h3><em>Elige tu consola favorita para ver su información</em></h3></article>`;
// const pantallaPs3 = `<img src="https://images-ext-1.discordapp.net/external/qbaArkreFbduNMQwEdWj9Chl4FZPXiAAE7sdeIiUDWQ/https/i.imgur.com/Fnny3gy.png?width=685&height=426">`
// const pantallaPs3 = `<img src="https://i.pinimg.com/564x/ae/3d/7b/ae3d7b55dddcdfe4b28c31e72101c98b.jpg" />`;
// const pantallaPs4 = `<img src="https://i.pinimg.com/564x/1d/ff/fc/1dfffc327187c313eede44ba8c2b0d96.jpg" />`;
// const pantallaPs5 = `<img src="https://i.pinimg.com/564x/1e/0a/b7/1e0ab75f04dc277f1d6c7e1f8929beaa.jpg" />`;

let michis = [
    "https://i.pinimg.com/564x/3b/47/ae/3b47aea88918db78d30a24b99f8b04b2.jpg", // michi ok
    "https://i.pinimg.com/564x/02/2d/5a/022d5a001846222e90ce214a8c2ebf41.jpg", // michi facha 
    "https://images-ext-1.discordapp.net/external/qbaArkreFbduNMQwEdWj9Chl4FZPXiAAE7sdeIiUDWQ/https/i.imgur.com/Fnny3gy.png?width=685&height=426", // michi trabajador
    "https://i.pinimg.com/564x/1d/ff/fc/1dfffc327187c313eede44ba8c2b0d96.jpg", // michi chao
    "https://i.pinimg.com/564x/96/9b/e5/969be541e44e9319bffdcda2ae4c7824.jpg", // michi caminador
    "https://i.pinimg.com/564x/9d/2f/b6/9d2fb6df36cbf1b6f4bb8ed73b10e78e.jpg", // michi camionero
    "https://i.pinimg.com/564x/80/e2/21/80e221543ae9661162774db7a52784ad.jpg", // michi intelectual
    "https://i.pinimg.com/564x/c3/c0/19/c3c019f136dc5b12bc24cf6b1be66094.jpg", // michi catolico
    "https://i.pinimg.com/564x/a6/f4/73/a6f4736bc0c2ced957e5ca7f929feec9.jpg"  // michis elegantes
];

// FUNCIONES
function toggleConsole(console) {
    if (!console.classList.contains('active')) {
        console.classList.add('active');
        return true;
    } else {
        console.classList.remove('active');
        resetPantalla();
        return false;
    }
}

function resetPantalla() {
    pantalla.classList.remove('random');
    pantalla.innerHTML = pantallaDefault;
}

function imagenRandom(){
    pantalla.classList.add('random');
    return `<img src="${michis[Math.floor(Math.random() * michis.length)]}" width: 80% style="border-radius: 10px" />`;
}


// EVENTOS
ps3Console.addEventListener('click', function () {
    ps5Console.classList.remove('active');
    ps4Console.classList.remove('active');
    if (toggleConsole(ps3Console)) {
        pantalla.innerHTML = imagenRandom();
    }
});

ps4Console.addEventListener('click', function () {
    ps3Console.classList.remove('active');
    ps5Console.classList.remove('active');
    if (toggleConsole(ps4Console)) {
        pantalla.innerHTML = imagenRandom();
    }
});

ps5Console.addEventListener('click', function () {
    ps3Console.classList.remove('active');
    ps4Console.classList.remove('active');
    if (toggleConsole(ps5Console)) {
        pantalla.innerHTML = imagenRandom();
    }
});

