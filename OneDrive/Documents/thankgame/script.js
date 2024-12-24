const gridTost = document.querySelector('.grid')
const score = document.querySelector('.score')


const blockWidth = 100
const blockHight = 20
const borderWidth = 560
const borderHeight =300
const ballDiameter = 20
let scoreDisplay = 0
let timerId
let xDirection = 2
let yDirection = 2



const userStart = [230,10]
let currentPosition = userStart

const ballStart = [270,30]
let ballStartPosition = ballStart



class Block {
    constructor(xAxsis,yAxsis) {

        this.bottomLeft = [xAxsis,yAxsis]
        this.bottomRight = [xAxsis + blockWidth,yAxsis]
        this.topLeft = [xAxsis,yAxsis + blockHight]
        this.topRight = [xAxsis,blockWidth,yAxsis,blockHight]
        
    }
}

const blocks =  [
    new Block (10,270),
    new Block (120,270), 
    new Block (230,270), 
    new Block (340,270), 
    new Block (450,270), 
    new Block (10,240),
    new Block (120,240), 
    new Block (230,240), 
    new Block (340,240), 
    new Block (450,240), 
    new Block (10,210),
    new Block (120,210), 
    new Block (230,210), 
    new Block (340,210), 
    new Block (450,210), 
    // new Block (560,270), 
    // new Block (670,270), 


]
console.log(blocks[0]) 
function theBlocks() {
for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom =blocks[i].bottomLeft[1] + 'px'
    gridTost.appendChild(block)  
}

console.log(blocks)
}
theBlocks() 

const userHandle = document.createElement('div')
userHandle.classList.add('user')
drawUser() 
gridTost.appendChild(userHandle)


function drawUser() {
userHandle.style.left = currentPosition[0] + 'px'
userHandle.style.bottom = currentPosition[1] + 'px'
}
function drawBall() {
ball.style.left=ballStartPosition[0] + 'px'
ball.style.bottom=ballStartPosition[1] + 'px'
}

function moveUser(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser() 
            }
            
            break;

        case "ArrowUp":
            if (currentPosition[0] < borderWidth - 100) {
                currentPosition[0] += 10
                drawUser() 
            }
            

        break;
            
        default:
            break;
    }
}
document.addEventListener('keydown' , moveUser) 

const ball = document.createElement('div') 
ball.classList.add('ball') 
drawBall() 
gridTost.appendChild(ball) 


//move ball
function moveBall() {
    ballStartPosition[0] += xDirection
    ballStartPosition[1] += yDirection
    drawBall() 
    checkForCollision() 

}
timerId = setInterval(moveBall,30)
    
function checkForCollision() {

    for (let i = 0; i < blocks.length; i++) {
        if ( (ballStartPosition[0] > blocks[i].bottomLeft[0] && ballStartPosition[0] < blocks[i].bottomRight[0] ) &&
             (ballStartPosition[1] + ballDiameter)> blocks[i].bottomLeft[1] && ballStartPosition[1] < blocks[i].topLeft[1] ) 
            {
               const allBlocks = Array.from(document.querySelectorAll('.block') ) 
            //    console.log(allBlocks) 
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1 )
            changeDirection()
            scoreDisplay++
            scoreDisplay=score.innerHTML
        score.textContent++

           }
        
    }
  
    if (ballStartPosition[0] >= (borderWidth - ballDiameter) ||
        ballStartPosition[1] >= (borderHeight - ballDiameter) ||
        ballStartPosition[0] <=  0

        ) {

        changeDirection()
    }  

    if (
        (ballStartPosition[0]>currentPosition[0] && ballStartPosition[0] < currentPosition[0] + blockWidth) &&
        (ballStartPosition[1]>currentPosition[1] && ballStartPosition[1] < currentPosition[1] + blockHight)
    )
     {

       changeDirection()
    }

    if (ballStartPosition[1] <= 0) {
        clearInterval(timerId)
        score.textContent = 'you lose'
        document.removeEventListener('keyup' ,moveUser)
    }
    
   
}
 
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}