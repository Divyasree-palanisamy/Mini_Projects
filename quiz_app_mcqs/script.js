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

const questionE1 = document.getElementById("question");
const optionsE1 = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreE1 = document.getElementById("score");
const resetBtn=document.getElementById("resetBtn");

function loadQuestion() {
    questionE1.textContent = questions[currentQuestion].question;
    optionsE1.innerHTML = "";

    questions[currentQuestion].options.forEach(optionText => {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = optionText;
        option.addEventListener('click', () => selectOption(option, optionText));
        optionsE1.appendChild(option);
    });
}

function selectOption(selectedE1, selectedAnswer) {
    const correctAnswer = questions[currentQuestion].answer;

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
    loadQuestion();
})
function showScore() {
    questionE1.textContent = `Quiz completed`;
    optionsE1.innerHTML = "";
    nextBtn.style.display = 'none';
    scoreE1.textContent=`Your score : ${score} out of ${questions.length}`;
    resetBtn.style.display=`inline-block`;
}



loadQuestion();
nextBtn.disabled = true; 
