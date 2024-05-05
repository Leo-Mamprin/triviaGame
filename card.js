import { verify } from './quiz.js';

let card = null;
let res = null;

function createTriviaCard() {
    card = document.createElement("div");
    card.id = "card";
    card.style.display = "none"
    document.body.appendChild(card);
}

async function showTriviaCard(question) {
    if (!card) createTriviaCard();

    card.innerHTML = `<h2>${question.question}</h2>
                         <div id="answers">
                            ${question.total_answers.map((answer, index) => `
                                <div id="answer${index}" class="answer">${answer}</div>
                            `).join("")}
                         </div>
                         <div id="result">Answer...</div>`;

    question.total_answers.forEach((answer, index) => {
        const answerElement = document.getElementById(`answer${index}`);
        answerElement.addEventListener("click", () => {
            res = verify(answer);
        });
    });

    card.style.display = "block"
}


function hideTriviaCard() {
    setTimeout(null, 2000)
    document.getElementById("card").style.display = "none"
}

export { showTriviaCard, hideTriviaCard, res };
