// VARIABLES
const display = document.querySelector('.consolas .display');
const ps3Console = document.querySelector('.ps3.console');
const ps4Console = document.querySelector('.ps4.console');
const ps5Console = document.querySelector('.ps5.console');

const pantalla = document.querySelector('.pantalla');
const pantallaDefault = `<article class="default"><img src="../img/logo-playstation.png" width="200px"><h3><em>Elige tu consola favorita para ver su información</em></h3></article>`;
const pantallaPs3 = `<img src="https://images-ext-1.discordapp.net/external/qbaArkreFbduNMQwEdWj9Chl4FZPXiAAE7sdeIiUDWQ/https/i.imgur.com/Fnny3gy.png?width=685&height=426">`
// const pantallaPs3 = `<img src="https://i.pinimg.com/564x/ae/3d/7b/ae3d7b55dddcdfe4b28c31e72101c98b.jpg" />`;
const pantallaPs4 = `<img src="https://i.pinimg.com/564x/1d/ff/fc/1dfffc327187c313eede44ba8c2b0d96.jpg" />`;
const pantallaPs5 = `<img src="https://i.pinimg.com/564x/1e/0a/b7/1e0ab75f04dc277f1d6c7e1f8929beaa.jpg" />`;


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
    pantalla.innerHTML = pantallaDefault;
}

// EVENTOS
ps3Console.addEventListener('click', function () {
    ps5Console.classList.remove('active');
    ps4Console.classList.remove('active');
    if (toggleConsole(ps3Console)) {
        pantalla.innerHTML = pantallaPs3;
    }
});

ps4Console.addEventListener('click', function () {
    ps3Console.classList.remove('active');
    ps5Console.classList.remove('active');
    if (toggleConsole(ps4Console)) {
        pantalla.innerHTML = pantallaPs4;
    }
});

ps5Console.addEventListener('click', function () {
    ps3Console.classList.remove('active');
    ps4Console.classList.remove('active');
    if (toggleConsole(ps5Console)) {
        pantalla.innerHTML = pantallaPs5;
    }
});

