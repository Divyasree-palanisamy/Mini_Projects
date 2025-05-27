const questions = [
    {
      question: "The sky is blue.",
      answer: "True"
    },
    {
      question: "5 + 7 = 10",
      answer: "False"
    },
    {
      question: "The capital of France is Paris.",
      answer: "True"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const trueBtn = document.getElementById("trueBtn");
  const falseBtn = document.getElementById("falseBtn");
  const nextBtn = document.getElementById("nextBtn");
  const scoreEl = document.getElementById("score");
  const resetBtn = document.getElementById("resetBtn");
  
  function loadQuestion() {
    const current = questions[currentQuestion];
    questionEl.textContent = current.question;
    trueBtn.disabled = false;
    falseBtn.disabled = false;
    trueBtn.className = "option";
    falseBtn.className = "option";
    nextBtn.disabled = true;
  }
  
  function selectAnswer(selectedAnswer) {
    const correct = questions[currentQuestion].answer;
  
    trueBtn.disabled = true;
    falseBtn.disabled = true;
  
    if (selectedAnswer === correct) {
      score++;
      if (selectedAnswer === "True") trueBtn.classList.add("correct");
      else falseBtn.classList.add("correct");
    } else {
      if (selectedAnswer === "True") trueBtn.classList.add("incorrect");
      else falseBtn.classList.add("incorrect");
  
      if (correct === "True") trueBtn.classList.add("correct");
      else falseBtn.classList.add("correct");
    }
  
    nextBtn.disabled = false;
  }
  
  trueBtn.addEventListener("click", () => selectAnswer("True"));
  falseBtn.addEventListener("click", () => selectAnswer("False"));
  
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });
  
  resetBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = "";
    nextBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
    loadQuestion();
  });
  
  function showScore() {
    questionEl.textContent = "Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Your score: ${score} out of ${questions.length}`;
    resetBtn.style.display = "inline-block";
  }
  
  loadQuestion();
  nextBtn.disabled = true;
  resetBtn.style.display = "none";
  