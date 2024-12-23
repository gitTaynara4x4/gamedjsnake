const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audioFiles = [
    "../assets/amongus-made-with-Voicemod (1).mp3",
    "../assets/among-us-sus-made-with-Voicemod.mp3",
    "../assets/asmr-made-with-Voicemod.mp3",
    "../assets/minecraft-eating-sound-effect-(hd)-made-with-Voicemod.mp3",
    "../assets/audio-o-que-disseste-cachorro-chupetao-made-with-Voicemod",
    "../assets/audio.mp3",
    "../assets/bruh-bruh-bruh-bruh-made-with-Voicemod.mp3",
    "../assets/danger-alarm-meme-sound-effect-made-with-Voicemod.mp3",
    "../assets/discord-made-with-Voicemod.mp3",
    "../assets/ey-ey-pequeña-no-digas-eso-eres-perfecta-made-with-Voicemod.mp3",
    "../assets/gunshots-made-with-Voicemod.mp3",
    "../assets/hello-there!-made-with-Voicemod.mp3",
    "../assets/homecoming-samsung-ringtone-made-with-Voicemod.mp3",
    "../assets/laughing-dog-meme-made-with-Voicemod.mp3",
    "../assets/meme-made-with-Voicemod (1).mp3",
    "../assets/meow-made-with-Voicemod.mp3",
    "../assets/microsoft-teams-message-sound-notif-(getmp3-made-with-Voicemod.mp3",
    "../assets/my-money-dont-jiggle-jiggle-made-with-Voicemod.mp3",
    "../assets/no-no-no-no-no-no-no-wait-wait-wait-wait-meme-made-with-Voicemod.mp3",
    "../assets/oh-my-god-made-with-Voicemod.mp3",
    "../assets/oi-oi-baka-made-with-Voicemod.mp3",
    "../assets/olha-a-mensagem-estourado-made-with-Voicemod.mp3",
    "../assets/roblox-bye-made-with-Voicemod.mp3",
    "../assets/scream-(earrape)-made-with-Voicemod.mp3",
    "../assets/sonido-de-gemidos-broma-made-with-Voicemod.mp3",
    "../assets/spongebob-fog-horn-made-with-Voicemod.mp3",
    "../assets/uwu-made-with-Voicemod (1).mp3",
    "../assets/valorant-spike-kurma-sesi-efekti-made-with-Voicemod.mp3",
    "../assets/what-made-with-Voicemod.mp3",
    "../assets/windows-shut-down-made-with-Voicemod.mp3",
    "../assets/bom-dia-minha-princesa-made-with-Voicemod.mp3",
    "../assets/brazil-made-with-Voicemod.mp3",
    "../assets/canon-event-made-with-Voicemod.mp3",
    "../assets/coca-cola-espuma-made-with-Voicemod.mp3",
    "../assets/eine-schlafparaluse-made-with-Voicemod.mp3",
    "../assets/goofy-ahh-car-horn-200870.mp3",
    "../assets/hahaha-251796.mp3",
    "../assets/hypocrik.mp3-made-with-Voicemod.mp3",
    "../assets/if-milk-goes-bad-it-becomes-yogurt-made-with-Voicemod.mp3",
    "../assets/im-tweaking-out!-made-with-Voicemod.mp3",
    "../assets/incrivel-made-with-Voicemod.mp3",
    "../assets/lol-bait-ping-made-with-Voicemod.mp3",
    "../assets/mentirosa-é-a-tua-tia-made-with-Voicemod.mp3",
    "../assets/metal-banging-sfx-made-with-Voicemod.mp3",
    "../assets/muchas-gracias-siuuu-made-with-Voicemod.mp3",
    "../assets/no-tienes-un-pedacito-de-queso-made-with-Voicemod.mp3",
    "../assets/olha-tanta-luz-made-with-Voicemod.mp3",
    "../assets/skibidi-pap-explosion-made-with-Voicemod.mp3",
    "../assets/skibidi-sponge-&-squidward-made-with-Voicemod.mp3",
    "../assets/sound-1-167181.mp3",
    "../assets/this-dude-made-with-Voicemod.mp3",
    "../assets/to-be-continued-sound-effect-made-with-Voicemod.mp3",
    "../assets/two-hours-later-made-with-Voicemod.mp3",
    "../assets/uhh-uhh-uhh-made-with-Voicemod.mp3",
    "../assets/using-this-as-my-ringtone-ngl-made-with-Voicemod.mp3",
    "../assets/wowowowowowowow-103214.mp3",
    "../assets/yeah-boy-114748.mp3",
    "../assets/you-are-a-fat-diabetic-bear-made-with-Voicemod.mp3"
]
const size = 30

const initialPosition = { x: 270, y: 240}

let snake = [initialPosition]


const incrementScore = () => {
    score.innerText = +score.innerText + 1
}





const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}


const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "blue"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })

    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }
    
    snake.shift ()
}


const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }

}
 
let currentAudio = null;

const chackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)

        const randomIndex = randomNumber(0, audioFiles.length - 1)

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;

        }
        const audio = new Audio(audioFiles[randomIndex])
        audio.play()
        currentAudio = audio;

        food.x = randomPosition()
        food.y = randomPosition()

        food.color = randomColor()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position)=> position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x 
        food.y = y
        food.color = randomColor()
    }
}



const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckindex = snake.length - 2 

    const wallCollision = 
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit


    const selfCollision = snake.find((position, index) => {
        return index < neckindex && position.x == head.x && position.y == head.y
    })


    if (wallCollision || selfCollision ){
        gameOver()
    } 
}

const gameOver = () => {
    direction = undefined

    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(5px)"
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    chackEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 100)
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction !== "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction !== "right") {
        direction = "left"
    }
    
    if (key == "ArrowDown" && direction !== "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction !== "down") {
        direction = "up"
    }



})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [initialPosition]
})