const API_KEY = "AIzaSyBkIWqYfn-E9ccj9fevEihFr7EBey3dap8";
//Question aléatoire
function selectRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}


function generateRandomQuestionHTML(question) {
    let randomQuestionHTML = '<div class="accordion-item col-11 col-lg-9 col-xl-7">' +
        '<h2 class="accordion-header">' +
        '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">' +
        '<strong class="questionTitle">' + question[0] + '</strong>' +
        '</button></h2>' +
        '<div id="collapse1" class="accordion-collapse collapse collapse" aria-labelledby="heading1" data-bs-parent="#notionsContent">' +
        '<div class="accordion-body">';

    for (let i = 1; i < question.length; i++) {
        randomQuestionHTML += '<p>' + question[i] + '</p>';
    }
    randomQuestionHTML += '</div></div></div>';

    return randomQuestionHTML;
}



async function getRandomQuestions() {
    let brutResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Hc7PM4OhE20N9kdYDjNrgP80XtskSrTsSA39Lw4SoNo/values/Questions!A1:G500?key=${API_KEY}`);
    let response = await brutResponse.json();
    response.values.sort((a, b) => a[0].localeCompare(b[0]));

    const randomQuestion = selectRandomQuestion(response.values);
    const randomQuestionHTML = generateRandomQuestionHTML(randomQuestion);

    document.getElementById("randomQuestionsContent").innerHTML = randomQuestionHTML;
}

var questionsWrap = document.getElementById('questionsWrap');
var computedStyles = getComputedStyle(questionsWrap);

var randomQuestionsWrap = document.getElementById('randomQuestionsWrap');

function refreshQuestion() {
    if (computedStyles.display !== 'none') {
        randomQuestionsWrap.style.display = 'block'
        questionsWrap.style.display = 'none';

    }
    getRandomQuestions();
}

function afficherQuestions() {
    questionsWrap.style.display = 'block';
    randomQuestionsWrap.style.display = 'none'
    getQuestions();
}
//Question aléatoire



//Toutes les questions
async function getQuestions() {
    let brutResponse = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1Hc7PM4OhE20N9kdYDjNrgP80XtskSrTsSA39Lw4SoNo/values/Questions!A1:G500?key=" + API_KEY
    );

    let response = await brutResponse.json();

    response.values.sort((a, b) => a[0].localeCompare(b[0]));

    let questionsContentHTML = "";

    for (let i = 0; i < response.values.length; i++) {

        document.getElementById("questions").innerHTML += "<option>" + response.values[i][0];

        questionsContentHTML += '<div class="accordion-item col-11 col-lg-9 col-xl-7">';
        questionsContentHTML += '<h2 class="accordion-header" id="heading' + i + '">';
        questionsContentHTML += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">';
        questionsContentHTML += '<strong class="questionTitle">' + response.values[i][0] + '</strong>';
        questionsContentHTML += '</button></h2>';
        questionsContentHTML += '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '" data-bs-parent="#notionsContent">';
        questionsContentHTML += '<div class="accordion-body">';
        for (let j = 1; j < response.values[i].length; j++) {
            questionsContentHTML += '<p>' + response.values[i][j] + '</p>';
        }
        questionsContentHTML += '</div></div></div>';
    }

    document.getElementById("questionsContent").innerHTML = questionsContentHTML;

    const inputElement = document.getElementById("questions-choice");
    inputElement.addEventListener("input", function () {
        const filterValue = inputElement.value.toLowerCase();
        const items = document.getElementsByClassName("accordion-item");

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const question = item.getElementsByTagName("strong")[0].textContent.toLowerCase();

            if (question.includes(filterValue)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });

};
getQuestions();
//Toutes les questions

function viderChamps() {
    window.location.reload();
}