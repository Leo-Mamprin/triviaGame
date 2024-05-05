import { personaggio } from './script.js'
import { showTriviaCard } from "./card.js";

class Question {
    constructor(answer) {
        this.type = answer.type;
        this.difficulty = answer.difficulty;
        this.category = answer.category;
        this.question = answer.question;
        this.correct_answer = answer.correct_answer;
        this.incorrect_answers = answer.incorrect_answers;

        this.total_answers = answer.incorrect_answers;
        this.total_answers.push(answer.correct_answer);

        this.shuffle(this.total_answers);
    }

    shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}

let currentQuestion;

async function getQuiz() {
    let url = "https://opentdb.com/api.php?amount=1";

    const response = await fetch(url);
    const quiz = (await response.json()).results[0];

    currentQuestion = new Question(quiz);
    await showTriviaCard(currentQuestion);
}

function verify(answer) {
    let res = document.getElementById("result");

    if (answer === currentQuestion.correct_answer) {
        res.innerHTML = "Correct";
        res.style.backgroundColor = "green";
        personaggio.win();
        return true;
    } else {
        res.innerHTML = "Wrong";
        res.style.backgroundColor = "red";
        personaggio.lose();
        return false;
    }
}

export { Question, getQuiz, verify };
