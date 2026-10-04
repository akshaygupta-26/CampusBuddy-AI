/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId, clickedButton) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   AI TUTOR
========================= */

function handleEnter(event) {

    if (event.key === "Enter") {
        askAI();
    }
}


function askSuggestion(question) {

    document.getElementById("questionInput").value = question;

    askAI();
}


function askAI() {

    const input = document.getElementById("questionInput");

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    const chatBox = document.getElementById("chatBox");

    // User message

    const userMessage = document.createElement("div");

    userMessage.className = "message user";

    userMessage.innerHTML = `
        <div>
            <strong>You</strong>
            <p>${escapeHTML(question)}</p>
        </div>

        <div class="message-avatar">👤</div>
    `;

    chatBox.appendChild(userMessage);

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;


    // AI response

    setTimeout(() => {

        const answer = generateAnswer(question);

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>

            <div>
                <strong>CampusBuddy AI</strong>
                <p>${answer}</p>
            </div>
        `;

        chatBox.appendChild(aiMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 700);
}


function generateAnswer(question) {

    const q = question.toLowerCase();

    if (q.includes("algorithm")) {

        return `
        An <strong>algorithm</strong> is a step-by-step procedure used
        to solve a problem.<br><br>

        <strong>Example:</strong><br>
        To make tea, the steps could be:
        boil water → add tea → add milk → add sugar → serve.<br><br>

        In programming, algorithms help us solve problems efficiently.
        `;
    }


    if (q.includes("cloud")) {

        return `
        <strong>Cloud computing</strong> means using computing resources
        such as servers, storage and software through the internet
        instead of depending only on your own computer.<br><br>

        <strong>Examples:</strong> Google Drive, Microsoft Azure and
        Amazon Web Services.
        `;
    }


    if (q.includes("eigenvalue")) {

        return `
        An <strong>eigenvalue</strong> is a special value associated with
        a matrix.<br><br>

        In simple words, it tells us how much a particular vector is
        stretched or compressed when a matrix transformation is applied.
        `;
    }


    if (q.includes("integer")) {

        return `
        An <strong>integer</strong> is a whole number that can be positive,
        negative, or zero.<br><br>

        Examples: -5, -1, 0, 7, 25.
        `;
    }


    if (q.includes("vm") || q.includes("virtual machine")) {

        return `
        A <strong>Virtual Machine (VM)</strong> is a software-based computer
        that runs inside another physical computer.<br><br>

        It can have its own operating system, CPU, memory and storage.
        `;
    }


    return `
        That's a good question! 📚<br><br>

        In this demo version, CampusBuddy provides explanations for
        common college topics such as algorithms, cloud computing,
        eigenvalues, integers and virtual machines.<br><br>

        In the full version, this interface can be connected to an
        open-source AI model for real-time answers.
    `;
}


/* =========================
   NOTES SUMMARIZER
========================= */

function summarizeNotes() {

    const input = document.getElementById("notesInput").value.trim();

    const output = document.getElementById("summaryOutput");

    if (input === "") {

        output.innerHTML = `
            <div class="empty-state">
                <span>⚠️</span>
                <p>Please enter some notes first.</p>
            </div>
        `;

        return;
    }


    const sentences = input
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 10);


    const important = sentences.slice(0, 5);


    let list = "";

    important.forEach(sentence => {
        list += `<li>${escapeHTML(sentence)}</li>`;
    });


    output.innerHTML = `
        <h3>📌 Key Points</h3>

        <ul style="margin:15px 0 20px 20px; line-height:1.8;">
            ${list}
        </ul>

        <h3>🎯 Quick Revision</h3>

        <p style="margin-top:10px; color:#6d7080; line-height:1.7;">
            Review these points first and then test yourself using the
            Quiz section. Breaking long notes into smaller concepts can
            make revision easier.
        </p>
    `;
}


/* =========================
   QUIZ
========================= */

const quizQuestions = {

    c: [
        {
            question: "Which symbol is used to end a statement in C?",
            options: [";", ":", ".", ","],
            answer: ";"
        },
        {
            question: "Which function is the starting point of a C program?",
            options: ["start()", "main()", "begin()", "run()"],
            answer: "main()"
        },
        {
            question: "Which data type stores an integer in C?",
            options: ["float", "char", "int", "double"],
            answer: "int"
        }
    ],

    cloud: [
        {
            question: "What does IaaS stand for?",
            options: [
                "Internet as a Service",
                "Infrastructure as a Service",
                "Information as a Service",
                "Interface as a Service"
            ],
            answer: "Infrastructure as a Service"
        },
        {
            question: "Which is an example of cloud storage?",
            options: [
                "Google Drive",
                "Keyboard",
                "RAM",
                "CPU"
            ],
            answer: "Google Drive"
        },
        {
            question: "What does VM mean?",
            options: [
                "Virtual Machine",
                "Visual Memory",
                "Virtual Memory",
                "Variable Machine"
            ],
            answer: "Virtual Machine"
        }
    ],

    math: [
        {
            question: "What is the determinant of a 2 × 2 identity matrix?",
            options: ["0", "1", "2", "4"],
            answer: "1"
        },
        {
            question: "A matrix with equal rows and columns is called:",
            options: [
                "Rectangular matrix",
                "Square matrix",
                "Row matrix",
                "Column matrix"
            ],
            answer: "Square matrix"
        },
        {
            question: "Eigenvalues are associated with:",
            options: [
                "Matrices",
                "HTML",
                "Networks only",
                "Operating systems"
            ],
            answer: "Matrices"
        }
    ],

    dbms: [
        {
            question: "What does DBMS stand for?",
            options: [
                "Database Management System",
                "Data Backup Management System",
                "Database Machine System",
                "Data Basic Management Software"
            ],
            answer: "Database Management System"
        },
        {
            question: "Which language is commonly used to query databases?",
            options: ["HTML", "SQL", "CSS", "C"],
            answer: "SQL"
        },
        {
            question: "A primary key must be:",
            options: [
                "Duplicate",
                "Unique",
                "Empty",
                "Optional"
            ],
            answer: "Unique"
        }
    ]
};


function startQuiz() {

    const subject = document.getElementById("subjectSelect").value;

    const questions = quizQuestions[subject];

    const quizArea = document.getElementById("quizArea");

    let html = "";

    questions.forEach((question, index) => {

        html += `
            <div class="question">

                <h4>${index + 1}. ${question.question}</h4>

                ${question.options.map(option => `
                    <label class="option">
                        <input
                            type="radio"
                            name="question${index}"
                            value="${escapeHTML(option)}"
                        >
                        ${escapeHTML(option)}
                    </label>
                `).join("")}

            </div>
        `;
    });


    html += `
        <button class="primary-btn" onclick="checkQuiz()">
            Submit Quiz
        </button>

        <div id="quizResult" style="margin-top:20px;"></div>
    `;


    quizArea.innerHTML = html;

    quizArea.dataset.subject = subject;
}


function checkQuiz() {

    const quizArea = document.getElementById("quizArea");

    const subject = quizArea.dataset.subject;

    const questions = quizQuestions[subject];

    let score = 0;


    questions.forEach((question, index) => {

        const selected = document.querySelector(
            `input[name="question${index}"]:checked`
        );


        if (selected && selected.value === question.answer) {
            score++;
        }

    });


    const percentage = Math.round(
        (score / questions.length) * 100
    );


    let message = "";

    if (percentage >= 80) {
        message = "Excellent work! 🔥";
    }
    else if (percentage >= 50) {
        message = "Good job! Keep practicing. 💪";
    }
    else {
        message = "Keep learning and try again! 📚";
    }


    document.getElementById("quizResult").innerHTML = `
        <div class="plan-result">
            <h3>🎯 Your Score: ${score}/${questions.length}</h3>
            <p style="margin-top:8px;">
                ${percentage}% — ${message}
            </p>
        </div>
    `;
}


/* =========================
   STUDY PLANNER
========================= */

function createPlan() {

    const subject = document.getElementById("planSubject").value.trim();

    const date = document.getElementById("examDate").value;

    const hours = document.getElementById("studyHours").value;

    const output = document.getElementById("planOutput");


    if (!subject || !date) {

        output.innerHTML = `
            <div class="plan-result">
                ⚠️ Please enter a subject and exam date.
            </div>
        `;

        return;
    }


    const exam = new Date(date);

    const today = new Date();

    const difference =
        Math.ceil(
            (exam - today) /
            (1000 * 60 * 60 * 24)
        );


    const days = Math.max(1, difference);


    output.innerHTML = `
        <div class="plan-result">

            <h3>📅 Your ${subject} Study Plan</h3>

            <p style="margin-top:10px;">
                You have approximately <strong>${days} days</strong>
                before your exam.
            </p>

            <ul>
                <li>Day 1–${Math.ceil(days / 3)}: Learn basic concepts</li>
                <li>Day ${Math.ceil(days / 3) + 1}–${Math.ceil(days * 2 / 3)}: Practice questions</li>
                <li>Final days: Revision + mock tests</li>
                <li>Daily study target: <strong>${hours} hour(s)</strong></li>
            </ul>

            <p style="margin-top:15px;">
                💡 Tip: Take a 5–10 minute break after every
                45–50 minutes of focused study.
            </p>

        </div>
    `;
}


/* =========================
   TASK MANAGER
========================= */

function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (task === "") {
        return;
    }


    const taskList = document.getElementById("taskList");

    const newTask = document.createElement("div");

    newTask.className = "my-task";

    newTask.innerHTML = `
        <input type="checkbox" onchange="completeTask(this)">

        <span>${escapeHTML(task)}</span>

        <button onclick="deleteTask(this)">×</button>
    `;


    taskList.appendChild(newTask);

    input.value = "";

    updateTaskCount();
}


function completeTask(checkbox) {

    const text = checkbox.nextElementSibling;

    if (checkbox.checked) {
        text.classList.add("completed");
    }
    else {
        text.classList.remove("completed");
    }

    updateTaskCount();
}


function deleteTask(button) {

    button.parentElement.remove();

    updateTaskCount();
}


function updateTaskCount() {

    const tasks = document.querySelectorAll("#taskList .my-task");

    const completed =
        document.querySelectorAll(
            "#taskList input[type='checkbox']:checked"
        ).length;

    const taskCount = document.getElementById("taskCount");

    if (taskCount) {
        taskCount.textContent = completed;
    }
}


/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}