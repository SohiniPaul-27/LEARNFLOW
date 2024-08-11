const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.result_box');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;

function step() {
    let levelMessageElement = document.getElementById('levelMessage');

    let level = (currentQuestionIndex < 3) ? 1 : (currentQuestionIndex < 6) ? 2 : 3;
    
    levelMessageElement.innerText = `Level ${level}`;
}
const quiz = {
    data: [
        // Level 1
        {
            q: "With reference to the modern history of India, 'Damin-i-Koh' refers to:",
            o: [
                "Duties imposed on the export of Indian handicrafts", 
                "Revenue system imposed by the British authorities in North-east India", 
                "Advances given by the English East India Company to merchants in Bengal",
                "Land exclusively demarcated for the Santhals to practise agriculture"
            ],
            a: 3
        },
        {
            q: "Who among the following established the 'Mahila Seva Mandal' and 'Native Female School' in Pune?",
            o: [
                "Aruna Asaf Ali", 
                "Jhalkari Bai", 
                "Savitribai Phule", 
                "Sarla Devi Chaudharani"
            ],
            a: 2
        },
        {
            q: "In medieval India, the term ‘Amir-i-Chahalgani’ referred to:",
            o: [
                "Foreign Invaders", 
                "Trusted Nobles", 
                "Women Spies",
                "Agricultural labourers"
            ],
            a: 1
        },
        // Level 2
        {
            q: "Which block elements are less electropositive in modern periodic table?",
            o: [
                "s", 
                "p", 
                "d",
                "f"
            ],
            a: 0
        },
        {
            q: "In modern periodic table, by which name d-block elements are known?",
            o: [
                "More electropositive elements", 
                "Less electropositive elements", 
                "Transition elements",
                "Inner transition elements"
            ],
            a: 2
        },
        {
            q: "Hexafluoroferrate (III) ion is an outer orbital complex. The number of unpaired electrons present in it is:",
            o: [
                "1", 
                "5", 
                "4",
                "Unpredictable"
            ],
            a: 1
        },
        // Level 3
        {
            q: "Which one of the following is not a client-server application?",
            o: [
                "Internet Chat", 
                "web Browsing", 
                "Email",
                "Ping"
            ],
            a: 3
        },
        {
            q: "Packets of the same session may be routed through different paths in:",
            o: [
                "TCP, but not UDP", 
                "TCP and UDP", 
                "UDP, but not TCP",
                "Neither TCP nor UDP"
            ],
            a: 1
        }
    ]
};

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    step();
});

function startQuiz() {
    startButton.parentElement.style.display = 'none';
    quizBox.style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;
    step();
}

function startTimer() {
    let timeLeft = 15;
    timerElement.innerText = `Time: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            markIncorrectAndProceed();
        }
    }, 1000);
}

function markIncorrectAndProceed() {
    document.querySelectorAll('#options button').forEach(button => button.disabled = true);
    nextButton.style.display = 'block';
    nextButton.click();
}

function step() {
    if (currentQuestionIndex >= quiz.data.length) {
        showResults();
        return;
    }

    let level = (currentQuestionIndex < 3) ? 1 : (currentQuestionIndex < 6) ? 2 : 3;
    document.getElementById('level').innerText = `Level: ${level}`;

    clearInterval(timer);
    startTimer();

    const currentQuestion = quiz.data[currentQuestionIndex];
    questionContainer.innerHTML = currentQuestion.q;
    optionsContainer.innerHTML = "";

    currentQuestion.o.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.dataset.idx = index;
        button.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
}

function checkAnswer(e) {
    clearInterval(timer);
    const selectedOption = e.target;
    const correct = selectedOption.dataset.idx == quiz.data[currentQuestionIndex].a;
    
    if (correct) {
        score++;
        selectedOption.classList.add("correct");
    } else {
        selectedOption.classList.add("wrong");
    }

    scoreElement.innerText = `Score: ${score}`;
    document.querySelectorAll('#options button').forEach(button => button.disabled = true);
    nextButton.style.display = 'block';
}

function showResults() {
    clearInterval(timer);
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    finalScoreElement.innerText = `Sohini, you scored ${score} out of ${quiz.data.length}`;
}

document.getElementById('restartButton').addEventListener('click', () => {
    resultBox.style.display = 'none';
    startButton.parentElement.style.display = 'block';
});
