var startButton = document.querySelector("#startButton");
var prevButton = document.querySelector("#prev");
var nextButton= document.querySelector("#next");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var wrapper = document.getElementsByTagName('main')[0];
var scores;
var storeScores = []
var count = 3*60*1000
var index = 0
var selectedAnswers = []
var answerSelected = false

prevButton.style.visibility = "hidden"
nextButton.style.visibility = "hidden"


function checkStorage() {
    if(localStorage.getItem('scores')) {
        scores = JSON.parse(localStorage.getItem('scores'))
    }
}


function startQuiz() {
    timer();
    startButton.style.display = "none"
    nextButton.style.visibility = "visible"
    prevButton.style.visibility = "visible"
    updateUI(index)
    
}




function updateUI(x) {
    answerSelected = false
        question.textContent = questions[x].question;
        while(answers.firstChild) {
            answers.removeChild(answers.firstChild)
        }
        for(i = 0; i < questions[x].answers.length; i++) {
            var label = document.createElement('label')
            var ans = document.createElement("input")
            ans.setAttribute("type", "radio")
            ans.setAttribute('name', 'answer')
            ans.setAttribute('id', `${i}`)
            ans.addEventListener('click', function(e) {
                answerSelected = true
                if(questions[x].correctAnswer === e.target.value) {
                    selectedAnswers[x] = true
                } else {
                    selectedAnswers[x] = false
                }
            })
            ans.value = questions[x].answers[i]
            label.appendChild(ans)
            label.append(`${questions[x].answers[i]}`)
            answers.append(label)
        }
    
}

function nextQuestion() {
    if(answerSelected === false) {
        alert('please select an answer first')
    } else {
        if(index === questions.length - 1) {
            updateUI(index)
            endQuiz()
        } else {
            // updateProgressBar(index)
            updateUI(index += 1)
        }
    }
    
}

function endQuiz() {
    while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild)
    renderResults()
}

function renderResults() {
    const score = document.createElement('h1')
    var count = 0
    for(var i = 0; i < selectedAnswers.length; i++) {
        if(selectedAnswers[i] === true) {
            count += 1
        }
    }
    score.setAttribute('id', 'score')
    score.textContent = `Your Score\n${(count/5 * 100)}%`
    wrapper.appendChild(score)
    renderSaveScore(count)
}

function prevQuestion() {
    if(index !== 0) {
        updateUI(index -= 1)
    }
}

function renderSaveScore(x) {
    checkStorage()
    const ul = document.createElement('ul')
    const saveForm = document.createElement('form');
    const input = document.createElement('input');
    const btn = document.createElement('button');
    const h = document.createElement('h4');
    h.textContent = 'High Scores';

    ul.setAttribute('id', 'scores');
    ul.appendChild(h);
    if(scores.length > 0) {
        for(i=0; i < scores.length; i++) {
            const li = document.createElement('li');
            li.textContent = scores[i];
            ul.appendChild(li);
        }
    }
    saveForm.id = 'saveForm';
    input.id = 'formInput';
    btn.id = 'formBtn';
    btn.type = 'button';
    btn.textContent = 'Save Score';
    btn.addEventListener('click', function() {
        const li = document.createElement('li');
        li.textContent = `${input.value} - ${x/5 *100}%`
        scores.push(`${input.value} - ${x/5 *100}%`)
        
        localStorage.setItem('scores', JSON.stringify(scores))
        ul.append(li)
    })

    saveForm.append(input, btn);
    wrapper.append(saveForm, ul);
}

function timer(){
    const time = document.createElement('h3')
    time.setAttribute('id', 'timer')
    wrapper.appendChild(time)
    var sec = 45;
    var timer = setInterval(function(){
        time.textContent = `Time Left: ${sec}`
        sec--;
        console.log(sec)
        if (sec < 0) {
            clearInterval(timer);
            endQuiz()
        }
        
    }, 1000);
}

startButton.addEventListener("click", startQuiz)
prevButton.addEventListener("click", prevQuestion)
nextButton.addEventListener("click", nextQuestion)

