const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
const score = document.getElementById("score");
const heart = document.getElementById("heart");
const highScore = document.getElementById("highScore");

let position = -50;

let isJumping =  false; 
let isCrouched =  false;
var start = false;

let dinoHeigth = 60;
let dinoWidth = 60;
let scoreNumber = 0;
let hearts = 5;


let highScoreNumber = 0;
let level = 0;
if(localStorage.getItem('highScore')){
    highScoreNumber = localStorage.getItem('highScore')
    level =  localStorage.getItem('level')
    highScore.innerHTML = "Level: " + level + " - " + highScoreNumber + " xp";
}

let randomTime = Math.floor(Math.random() * 4000 + 1000)

const listImage = [
    "url('images/series.png')", 
    "url('images/videoGame.png')"
];
const hearttList = [
    "Game over",
    "&#10084;", 
    "&#10084; &#10084;", 
    "&#10084; &#10084; &#10084;",
    "&#10084; &#10084; &#10084; &#10084;",
];


function handleKeyUp(event){
    if(event.keyCode === 38){
        if(!isJumping){
            jump();
            if(start == false){
                gameStart();
                start = true;
            }
        }
    }else if(event.keyCode === 40){
        if(!isCrouched){
            Crouched();
            console.log("agachou")
        }
    }
}


function jump(){
    isJumping =  true;
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(()=>{
                if(position <= 50){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 5;
                    dino.style.bottom = position + 'px';   
                }
            }, 20)
        }else{
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20)
}
function Crouched(){
    isCrouched =  true;
    let upInterval = setInterval(() => {
        if(position >= 60){
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(()=>{
                if(position <= 0){
                    clearInterval(downInterval);
                    isCrouched = false;
                }else{
                    position -= 5;
                    dino.style.bottom = position + 'px';   
                }
            }, 20)
        }else{
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20)
}

function createCactus(){
    
        const numberGenerator = Math.floor(Math.random() * 2); 
        const cactus = document.createElement('div')
        let cactusPosition = 900;
        cactus.classList.add('cactus');
        cactus.style.left = 900+ 'px';
        cactus.style.backgroundImage = listImage[numberGenerator];
        background.appendChild(cactus);

        let leftInterval =  setInterval(()=> {
            if(cactusPosition < -80) {
                clearInterval(leftInterval)
                background.removeChild(cactus)
                scoreNumber += 15;
                score.innerHTML = "Score: " + scoreNumber + " xp";
            }else if(cactusPosition > 0 && cactusPosition < 120 && position < 60){
                clearInterval(leftInterval)
                background.removeChild(cactus)
                saveScore();
                scoreNumber = 0;
                hearts -= 1;
                if(hearts != -1){
                    heart.innerHTML = hearttList[hearts];
                }
                score.innerHTML = "Score: " + scoreNumber + " xp";
            }else{
                cactusPosition -= 8
                cactus.style.left = cactusPosition + 'px' 
            }
        }, 20)
   
}
function createSmartphone(){
    
        const smartphone = document.createElement('div')
        let smartphonePosition = 900;
        smartphone.classList.add('smartphone');
        smartphone.style.left = 900+ 'px';
        background.appendChild(smartphone);

        let leftInterval =  setInterval(()=> {
            if(smartphonePosition < -80) {
                clearInterval(leftInterval)
                background.removeChild(smartphone)
                scoreNumber += 15;
                score.innerHTML = "Score: " + scoreNumber + " xp";
            }else if(smartphonePosition > 0 && smartphonePosition < 120 && position != 0){
                clearInterval(leftInterval)
                background.removeChild(smartphone)
                saveScore();
                scoreNumber = 0;
                hearts -= 1;
                if(hearts != -1){
                    heart.innerHTML = hearttList[hearts];
                }
                score.innerHTML = "Score: " + scoreNumber + " xp";
            }else{
                smartphonePosition -= 8
                smartphone.style.left = smartphonePosition + 'px' 
            }
        }, 20)   
    
}

function gameStart(){
    if( hearts > 0){
        const numberGenerator = Math.floor(Math.random() * 3); 
        if(numberGenerator == 1){
            createSmartphone();
        }else{
            createCactus();
        }
        setTimeout(gameStart, randomTime)
    }
}

function saveScore(){
  if (scoreNumber > highScoreNumber){
      highScoreNumber = scoreNumber
      level = getLevel(highScoreNumber);
      highScore.innerHTML = "Level: " + level + " - " + highScoreNumber + " xp";
      window.localStorage.setItem('highScore', highScoreNumber )
      window.localStorage.setItem('level', level )
  }
}

function getLevel(hS){
    var num = hS;
    let highNumberReturn = 0;
    var levelList = [
        { "xp" : 125,
          "level" : 1,  
        },
        { "xp" : 250,
          "level" : 2,  
        },
        { "xp" : 325,
          "level" : 3,  
        },
        { "xp" : 410,
          "level" : 4,  
        },
        { "xp" : 495,
          "level" : 5,  
        },
        { "xp" : 555,
          "level" : 6,  
        },
        { "xp" : 615,
          "level" : 7,  
        },
        { "xp" : 725,
          "level" : 8,  
        },
        { "xp" : 950,
          "level" : 9,  
        },
        { "xp" : 1155,
          "level" : 10,  
        },
        { "xp" : 1355,
          "level" : 11,  
        },
        { "xp" : 1585,
          "level" : 12,  
        },
        { "xp" : 1795,
          "level" : 13,  
        },
        { "xp" : 2255,
          "level" : 14,  
        },
        { "xp" : 2515,
          "level" : 15,  
        },
        { "xp" : 2895,
          "level" : 16,  
        },
        { "xp" : 3425,
          "level" : 17,  
        },
        { "xp" : 3995,
          "level" : 18,  
        },
        { "xp" : 4665,
          "level" : 19,  
        },
        { "xp" : 5205,
          "level" : 20,  
        },
    ]
    highNumberReturn =  levelList.find(el => el.xp > num).level;
    return highNumberReturn;
}

document.addEventListener('keyup', handleKeyUp)
