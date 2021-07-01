var startup = document.querySelector("#startGame");
var choice1 = document.querySelector("#choiceA");
var choice2 = document.querySelector("#choiceB");
var choice3 = document.querySelector("#choiceC");
var choice4 = document.querySelector("#choiceD");
var timeClock = document.querySelector("#timer");
var count = 5;
var questionInd = 0;

var questions = [
    {
    title:"All of these are border styles except...",
    choices: ["a: Dotted", "b:Solid", "c:Sterling", "d:Groove"],
    answer: "c:Sterling"
    }, {
    title:"The API equivalent of CSS is...",
    choices: ["a:Bootstrap", "b:Boot Strap", "c:Bootstrapped", "d:Bootrap"],
    answer: "a:Bootstrap"
    }, {
    title:"Which HTML tag holds all of the page content?",
    choices: ["a:Head", "b:Title", "c:Header", "d:Body"],
    answer: "d:Body"
    }, {
    title:"The API equivalent of Javascript is...",
    choices: ["a:jQuote", "b:jQuest", "c:jQuestion", "d:jQuery"],
    answer: "d:jQuery"
    }, {
    title:"All of these are html semantic tags except...",
    choices: ["a:Header", "b:Section", "c:Footy", "d:Aside"],
    answer: "c:Footy"
    }
]

startup.addEventListener("click", () =>{
    console.log("start game")
    var countdown = setInterval(() =>{
        timeClock.innerHTML= count
        count = count-=1 
        console.log(count)
        if (count<= -1) {       
            clearInterval(countdown)
        }
    }, 1000)
    countdown;

})

// function timer() {
//     timeClock();
//     var clock= setInterval(clocktick, 1000);
//     var timeClock.textContent= time;
//     var time= questions.length*20;
//     console.log(timer)
// }
// // timer();
//on click display question
//manipulate DOM to display questions= .innerHTML
//create buttons for choices
// determine if answer is correct= if statement

//on click display score
//set interval stops game