let pumpCount = 0;
const balloonImages = [
    'Assets/1.png',
    'Assets/2.png',
    'Assets/3.png',
    'Assets/4.png',
    'Assets/5.png',
    'Assets/6.png',
    'Assets/7.png',
    'Assets/8.png',
    'Assets/9.png',
    'Assets/10.png'
];
const alphabetImages = [
    'Assets/A.png',
    'Assets/B.png',
    'Assets/C.png',
    'Assets/D.png',
    'Assets/E.png',
    'Assets/F.png',
    'Assets/G.png',
    'Assets/H.png',
    'Assets/I.png',
    'Assets/J.png',
    'Assets/K.png',
    'Assets/L.png',
    'Assets/M.png',
    'Assets/N.png',
    'Assets/O.png',
    'Assets/P.png',
    'Assets/Q.png',
    'Assets/R.png',
    'Assets/S.png',
    'Assets/T.png',
    'Assets/U.png',
    'Assets/V.png',
    'Assets/W.png',
    'Assets/X.png',
    'Assets/Y.png',
    'Assets/Z.png'   
];
let currentLetterIndex = 0;

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.id = 'j';
    balloon.style.bottom = '180px'; 
    balloon.style.right = '288px'; 
    balloon.style.transformOrigin = ' bottom center';

    const randomBalloonImage = balloonImages[Math.floor(Math.random() * balloonImages.length)];
    const currentAlphabetImage = alphabetImages[currentLetterIndex];
    
    const balloonImg = document.createElement('img');
    balloonImg.src = randomBalloonImage;
    balloonImg.style.width = '100%';
    balloonImg.style.height = '100%';
    balloonImg.style.position = 'absolute';
    
    const alphabetImg = document.createElement('img');
    alphabetImg.src = currentAlphabetImage;
    alphabetImg.style.width = '50%';
    alphabetImg.style.height = '50%';
    alphabetImg.style.position = 'absolute';
    alphabetImg.style.top = '50%';
    alphabetImg.style.left = '50%';
    alphabetImg.style.transform = 'translate(-50%, -50%)';
    
    balloon.appendChild(balloonImg);
    balloon.appendChild(alphabetImg);
    
    document.querySelector('.container').appendChild(balloon);

    
    currentLetterIndex = (currentLetterIndex + 1) % alphabetImages.length; 

    return balloon;
}

let balloon = createBalloon();
const pumpHandle = document.querySelector('.pump .handle');

document.querySelector('.pump').addEventListener('click', () => {
    pumpCount++;
    pumpHandle.style.top = '-40px'; 
    
    setTimeout(() => {
        pumpHandle.style.top = '-85px'; 
    }, 200); 

    if (pumpCount <= 4) {
        const newWidth = 50 + pumpCount * 30; 
        const newHeight = 70 + pumpCount * 45; 
        balloon.style.transform = `scale(${newWidth / 50}, ${newHeight / 70})`; 
    }

    if (pumpCount === 4) {
        setTimeout(() => {
            floatBalloon(balloon);
            pumpCount = 0;
            balloon = createBalloon();
        }, 300); 
    }
});

function floatBalloon(balloon) {
    balloon.style.transition = 'bottom 3s linear, right 3s linear';
    const randomBottom = Math.random() * (window.innerHeight - balloon.offsetHeight);
    const randomRight = Math.random() * (window.innerWidth - balloon.offsetWidth);
    balloon.style.bottom = `${randomBottom}px`;
    balloon.style.right = `${randomRight}px`;

    const floatInterval = setInterval(() => {
        const randomBottom = Math.random() * (window.innerHeight - balloon.offsetHeight);
        const randomRight = Math.random() * (window.innerWidth - balloon.offsetWidth);
        balloon.style.bottom = `${randomBottom}px`;
        balloon.style.right = `${randomRight}px`;
    }, 3000);

    balloon.addEventListener('click', () => {
        clearInterval(floatInterval);
        balloon.classList.add('pop');
        setTimeout(() => {
            balloon.remove();
        }, 300);
    });
}
