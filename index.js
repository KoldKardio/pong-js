import Ball from "./ball.js"
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const aiPaddle = new Paddle(document.getElementById("ai-paddle"))
const playerScoreElem = document.getElementById("player-score")
const aiScoreElem = document.getElementById("ai-score")

let lastTime
// update loop
function update(time) {
    if (lastTime != null){
        const delta = time - lastTime
        // update code
        ball.update(delta, [playerPaddle.rect(), aiPaddle.rect()])
        playerPaddle.update(delta, ball.y)
        aiPaddle.update(delta, ball.y)
        // win-lose condition
        if (isLose()) handleLose()
        // bonus content -- make sure to input 50% saturation in css
        // const HUE = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        // document.documentElement.style.setProperty("--hue", HUE + delta * 0.01 )
    }

    lastTime = time
    //console.log(time)
    window.requestAnimationFrame(update)
}

function isLose() {
    const rect = ball.rect() 
    return rect.right >= window.innerWidth || rect.left <= 0 }

function handleLose() { 
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else { aiScoreElem.textContent = parseInt(aiScoreElem.textContent) + 1 }
    ball.reset()
    aiPaddle.reset()
    playerPaddle.reset() // not-necessary
 }

// document.addEventListener("mousemove", e=> {
//     playerPaddle.position = (e.y / window.innerHeight) * 100
// })

window.requestAnimationFrame(update)