const questions = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Transfer Markup Language"],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: "CSS"
    },
    {
        question: "Which is not a JavaScript data type?",
        options: ["String", "Boolean", "Number", "Float"],
        answer: "Float"
    },
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = shuffleArray([...questions]);
let userAnswers = new Array(questions.length).fill(null);
let timeLeft = 60;
let timer;

let highScore = localStorage.getItem("highScore") || 0;

const timerE1 = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const questionE1 = document.getElementById("question");
const optionsE1 = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const scoreE1 = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const completedSound = document.getElementById("completedSound");

function loadQuestion() {
    questionE1.textContent = shuffledQuestions[currentQuestion].question;
    optionsE1.innerHTML = "";

    shuffledQuestions[currentQuestion].options.forEach(optionText => {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = optionText;
        option.addEventListener('click', () => selectOption(option, optionText));
        optionsE1.appendChild(option);
    });

    const previousAnswer = userAnswers[currentQuestion];
    if (previousAnswer) {
        const correctAnswer = shuffledQuestions[currentQuestion].answer;
        Array.from(optionsE1.children).forEach(option => {
            option.style.pointerEvents = 'none';
            option.classList.add(option.textContent === correctAnswer ? 'correct' : 'incorrect');
            if (option.textContent === previousAnswer) {
                nextBtn.disabled = false;
            }
        });
    } else {
        nextBtn.disabled = true;
    }

    prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    updateProgressBar();
}

function selectOption(selectedE1, selectedAnswer) {
    const correctAnswer = shuffledQuestions[currentQuestion].answer;
    const prevAnswer = userAnswers[currentQuestion];

    const isCorrect = selectedAnswer === correctAnswer;

    if (prevAnswer === null) {
        if (isCorrect) {
            score++;
            correctSound.play();
        } else {
            wrongSound.play();
        }
    } else {
        const wasCorrect = prevAnswer === correctAnswer;
        if (wasCorrect && !isCorrect) {
            score--;
            wrongSound.play();
        } else if (!wasCorrect && isCorrect) {
            score++;
            correctSound.play();
        }
        // No sound if switching between wrong options
    }

    userAnswers[currentQuestion] = selectedAnswer;

    Array.from(optionsE1.children).forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
        }
    });

    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
        completedSound.play(); // ✅ Play only at end
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

resetBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    scoreE1.textContent = "";
    nextBtn.style.display = 'inline-block';
    prevBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    shuffledQuestions = shuffleArray([...questions]);
    userAnswers = new Array(questions.length).fill(null);
    loadQuestion();
    startTimer();
});

function showScore() {
    questionE1.textContent = `Quiz completed`;
    optionsE1.innerHTML = "";
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';

    let message = "";
    if (score === shuffledQuestions.length) {
        message = "🔥🔥Perfect Score! Great job!";
    } else if (score < shuffledQuestions.length / 2) {
        message = "🫠🫠 Better luck next time";
    } else {
        message = "💫💫Good Effort!";
    }

    scoreE1.innerHTML = `Your score: ${score} out of ${shuffledQuestions.length}<br>${message}`;

    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScore = score;
        scoreE1.innerHTML += `<br>New high score`;
    } else {
        scoreE1.innerHTML += `<br>HighScore: ${highScore}`;
    }

    resetBtn.style.display = 'inline-block';
    progressBar.style.width = "100%";
    progressBar.textContent = "Done";
    clearInterval(timer);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${currentQuestion + 1}/${shuffledQuestions.length}`;
}

function startTimer() {
    timeLeft = 60;
    timerE1.textContent = `Time Left: ${timeLeft}`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerE1.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore();
            completedSound.play(); // ✅ Also play if time runs out
        }
    }, 1000); // ⏱ Set interval to 1 second
}

// Start quiz on load
loadQuestion();
startTimer();
