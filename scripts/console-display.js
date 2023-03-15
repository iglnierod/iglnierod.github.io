const ps3Console = document.querySelector('.ps3.console');
const ps4Console = document.querySelector('.ps4.console');
const ps5Console = document.querySelector('.ps5.console');
const pantalla = document.querySelector('.pantalla');

ps3Console.addEventListener('click', function(){
    ps5Console.classList.remove('active');
    ps4Console.classList.remove('active');
    ps3Console.classList.add('active');
});

ps4Console.addEventListener('click', function(){
    ps5Console.classList.remove('active');
    ps3Console.classList.remove('active');
    ps4Console.classList.add('active');
});

ps5Console.addEventListener('click', function(){
    ps3Console.classList.remove('active');
    ps4Console.classList.remove('active');
    ps5Console.classList.add('active');
});

// pantalla.addEventListener('click', function(){
//     pantalla.innerHTML = '<span>asdfasdfasdf</span>';
// })