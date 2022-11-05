// make game functional
const gameContainer = document.querySelector(".game-container")
const bird = document.querySelector("#bird")
const ground = document.querySelector(".ground")

let birdBottom=15
let birdLeft = 20
let gravity = 0.4
let isGameOver=false 
let gap=28 
let count=0
let score=0;
let highscore=score;


bird.style.bottom = birdBottom + 'em'
bird.style.left = birdLeft + "em"

function startGame(){
    birdBottom-=gravity
    bird.style.bottom = birdBottom + 'em'
    if(birdBottom<=-1){
    birdBottom=-1
    bird.style.bottom = birdBottom +"em"
    }

}

let gameTimerId=setInterval(startGame,27)

function control(e) {
    if(e.keyCode===32){
        jump()
    }
    
    
}

function startAgain(e){
    if(e.keyCode===82){
        restart()
    }
}

function restart() {
    location.href="./game.html"
}


function jump() {
    if(birdBottom<30){
    birdBottom+=4
    bird.style.bottom = birdBottom +"em" 
    
    } 
    

}

document.addEventListener("keydown",control) 
document.addEventListener("keydown",startAgain)

function generateObstacle() {
    let obstacleLeft = 1500 

    let obstacleBottom = Math.random()*8
    let obstacle = document.createElement('div')
    let topObstacle=document.createElement('div')
    if(!isGameOver) {
        topObstacle.classList.add('topObstacle')
        obstacle.classList.add('obstacles')}
        
    
        gameContainer.appendChild(obstacle) 
        gameContainer.appendChild(topObstacle)
 
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'em'
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'em'
    


    function moveObstacle()  {
        obstacleLeft-=2
        obstacle.style.left = obstacleLeft+'px'
        topObstacle.style.left = obstacleLeft+'px'
        if(obstacleLeft===-60)  {
        clearInterval(timerId)
        gameContainer.removeChild(obstacle)
        gameContainer.removeChild(topObstacle)
        }
        if(birdBottom<=-1){
            console.log("onGround")
            gameOver()

        }

        if(obstacleLeft<380 && obstacleLeft>330 && birdLeft===20 && (birdBottom<obstacleBottom+8 || birdBottom>obstacleBottom+ gap -13) ||
            birdBottom===-1){
                clearInterval(moveObstacle)
                clearInterval(timerId)
                console.log("bird hit") 
                gameOver()         
        }


    }
    

    let timerId=setInterval(moveObstacle,10)
    if(!isGameOver) {
        setTimeout(generateObstacle,2000)
        count=count+1

    }

    if(count>3){
        score=score+1
        console.log("This is count")
        console.log(count)
        console.log("score")
        console.log(score)
        if(gameOver){
            score=score
            highscore=score
            console.log("end score")
            console.log(score-1)
            console.log(highscore-1)
            localStorage.setItem("score",score-1)
            if(score>=highscore){
                highscore=score
                console.log("highscore")
                console.log(highscore-1)

            }

        }
        
        
    }

    
    else{
        if(gameOver){
        score=0
        highscore=0
        console.log("count if less")
        console.log("final score")
        console.log(score)
        console.log(highscore)
        localStorage.setItem("score", score)
        }
    }
    

    

    
    
    
     
}
generateObstacle()

function gameOver(){
    isGameOver=true
    clearInterval(gameTimerId)
    console.log("Game Over")
    document.removeEventListener("keydown",control)

    function nextPage(){
        location.href="./result.html"
    }
    let timerend=setTimeout(nextPage,1000)
}
 



const  bgm = new Audio("./assets/Energy Theme - Jextor.wav")
 bgm.play();
bgm.loop=true;

