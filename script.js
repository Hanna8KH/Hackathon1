let squares = 10
let anechkaIndex = Math.floor(Math.random()*squares)
const main = document.getElementById('main')

const audio = document.createElement('audio')
audio.src = 'vakavak.mp3'
main.appendChild(audio)

main.style.width = '100vw'
main.style.height = '100vh'
main.style.position = 'relative'

function createAnechka (x, y, squareSize) {
    let anechka = document.createElement('img')
    anechka.src = "https://mystickermania.com/cdn/stickers/anime/spy-family-anya-smirk-512x512.png"
    
    anechka.style.position = 'absolute';
    anechka.style.maxWidth = squareSize + 'px';
    anechka.style.maxHeight = squareSize + 'px';
    anechka.style.left = x + 'px';
    anechka.style.top = y + 'px';
    
    main.appendChild(anechka)
}

function createSquare (index) {
    
    const square = document.createElement('div');
    const squareSize = Math.random() * 50 + 50;
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.style.position = 'absolute';
    square.classList.add('square');
    
    let x = Math.random() * (main.clientWidth - squareSize);
    let y = Math.random() * (main.clientHeight - squareSize);
    square.style.left = x + 'px';
    square.style.top = y + 'px';
    square.style.zIndex = 2;
    
    const squareColor = generateRandomColor()
    square.style.backgroundColor = squareColor;

    if (anechkaIndex === index) {
        createAnechka(x, y, squareSize)
    }


    square.onmouseover = function () {
        square.style.transition = '500ms';
        x = Math.random() * (main.clientWidth - 100);
        y = Math.random() * (main.clientHeight - 100);
        square.style.left = x + 'px';
        square.style.top = y + 'px';
        if (anechkaIndex === index) {
            gameOver()   
        }
    }

    return square
}

function gameOver () {
    // const audio = new Audio('./vaka-vak.mp3');
    // audio.muted = false;
    // audio.play()

    audio.play()

    setTimeout(function() {
        alert('Anechka is found')
        squares++
        let arraySquares = document.querySelectorAll('div.square');
        for (let square of arraySquares) {
            main.removeChild(square);
        }        
        audio.pause()
        audio.currentTime = 0;
        
        let anechka = document.querySelector('img');
        main.removeChild(anechka);
        
        anechkaIndex = Math.floor(Math.random()*squares)

        for (let i = 0; i < squares; i++) {
            main.appendChild(createSquare(i));
        }
    }, 1000)  

}

for (let i = 0; i < squares; i++) {
    main.appendChild(createSquare(i));
}

function generateRandomColor () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

