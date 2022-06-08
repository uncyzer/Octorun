const countryCode = (obj) => {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

const checkAnswer = (input, expectedAnswer) => {
    const correct = input.localeCompare(expectedAnswer, undefined, { sensitivity: 'base' }) === 0;
    if(correct){
        //document.querySelector('#game').querySelector('ul').innerHTML = "Bravo!";
        document.getElementById('input').value = "";
        playAgain();
    }
    else {
        countAttempt();
        if(window.localStorage.getItem('attempt') == 1){
            document.getElementById("skip").hidden = false;
        }
        //document.querySelector('#game').querySelector('ul').innerHTML = "Faux!";
    }
    saveScore(correct);
    document.getElementById("score").innerHTML = localStorage.getItem('score');

};

const saveScore = (correct) => {
    let score=localStorage.getItem('score') || parseInt('0');
    
    if(correct){
        score++;
    }
    localStorage.setItem('score', score);    
}

const countAttempt = () => {
    let attempt =localStorage.getItem('attempt') || parseInt('0');
    attempt ++;
    localStorage.setItem('attempt', attempt);
}

const addButton = () => {
    let btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Passer";
    btn.onclick = function () {
        localStorage.removeItem('attempt');
        playAgain();
    }
    document.querySelector('#inputs').appendChild(btn);
}

const playAgain = () => {
    if( localStorage.getItem('score') < 4 ){
        init();
    }
}

const init = async () => {

    const countriesjson = await fetch('https://flagcdn.com/fr/codes.json');
    const countries = await countriesjson.json();
    
    // Generate question
    let code = countryCode(countries);
    let country = countries[code];
    let flag = `https://flagcdn.com/w320/${code}.png`;

    console.log(country);

    // Display flag
    document.querySelector('#game').querySelector('img').setAttribute('src', flag);

    // Get answer
    document.getElementById("answer").addEventListener("click", () => {
        checkAnswer(document.getElementById('input').value, country);
    });

    document.getElementById("skip").onclick = function () {
        localStorage.removeItem('attempt');
        playAgain();
    }
    document.getElementById("skip").hidden = true;

};


window.onload = init;