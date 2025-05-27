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
let shuffledQuestions=shuffleArray([...questions]);
const progressBar = document.getElementById("progressBar");

const questionE1 = document.getElementById("question");
const optionsE1 = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreE1 = document.getElementById("score");
const resetBtn=document.getElementById("resetBtn");

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
    updateProgressBar();
}

function selectOption(selectedE1, selectedAnswer) {
    const correctAnswer = shuffledQuestions[currentQuestion].answer;

    // Disable all options after selection
    Array.from(optionsE1.children).forEach(option => {
        option.style.pointerEvents = 'none';
        if(option.textContent === correctAnswer) {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
        }
    });

    // If correct answer selected, increment score
    if(selectedAnswer === correctAnswer) {
        score++;
    }

    // Enable the next button to go to next question
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;

    if(currentQuestion < questions.length) {
        loadQuestion();
        nextBtn.disabled = true;
    } else {
        showScore();
    }
});

resetBtn.addEventListener('click',()=>{
    currentQuestion=0;
    score=0;
    scoreE1.textContent="";
    nextBtn.style.display=`inline-block`;
    resetBtn.style.display=`none`;
    shuffledQuestions=shuffleArray([...questions]);

    loadQuestion();
})

function showScore() {
    questionE1.textContent = `Quiz completed`;
    optionsE1.innerHTML = "";
    nextBtn.style.display = 'none';

    let message = "";
    if(score === shuffledQuestions.length){
        message = "🔥🔥Perfect Score! Great job!";
    } else if(score < shuffledQuestions.length / 2){
        message = "🫠 🫠 Better luck next time";
    } else {
        message = "💫💫Good Effort!";
    }

    scoreE1.innerHTML = `Your score: ${score} out of ${shuffledQuestions.length}<br>${message}`;
    resetBtn.style.display = `inline-block`;
    progressBar.style.width = "100%";
    progressBar.textContent = "Done";
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateProgressBar(){
    const progress = ((currentQuestion+1)/shuffledQuestions.length)*100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent=`${currentQuestion+1}/${shuffledQuestions.length}`;

}
loadQuestion();
nextBtn.disabled = true; 
