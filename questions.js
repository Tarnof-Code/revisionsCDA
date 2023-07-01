function selectRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}


async function getQuestions() {
    let brutResponse = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1Hc7PM4OhE20N9kdYDjNrgP80XtskSrTsSA39Lw4SoNo/values/Questions!A1:G500?key=AIzaSyBkIWqYfn-E9ccj9fevEihFr7EBey3dap8");
    let response = await brutResponse.json();
    response.values.sort((a, b) => a[0].localeCompare(b[0]));

    const randomQuestion = selectRandomQuestion(response.values);
    const randomQuestionHTML = generateQuestionHTML(randomQuestion);

    document.getElementById("questionsContent").innerHTML = randomQuestionHTML;
}

function generateQuestionHTML(question) {
    let questionHTML = '<div class="accordion-item">' +
        '<h2 class="accordion-header">' +
        '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">' +
        '<strong>' + question[0] + '</strong>' +
        '</button></h2>' +
        '<div id="collapse1" class="accordion-collapse collapse collapse" aria-labelledby="heading1" data-bs-parent="#notionsContent">' +
        '<div class="accordion-body">';

    for (let i = 1; i < question.length; i++) {
        questionHTML += '<p>' + question[i] + '</p>';
    }

    '<p>' + question[1] + '</p>' +
        '</div></div></div>';

    return questionHTML;
}



function refreshQuestion() {
    getQuestions();
}