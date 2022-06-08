window.onload= () => {
    randomWord();
}

let coulString = ['Jaune','Bleu','Vert','Rouge','Orange','Violet','Rose','Turquoise','Marron','Noir']
let coulCode = ['#fff000','#000fff','#0fff00','#ff0000','#ff8000','#c100ff','#ff00b9','#00ffd8','#7d3b00','#000000']
let nbMots = 8;
let compt=6;
const compteur = document.getElementById("compt");
compteur.innerHTML="Compteur: "+compt;


function randomWord(){

    createElements(nbMots);

    max = coulString.length;
    let btn = document.querySelectorAll('div.text p');
    const randomVrai = Math.floor(Math.random() * (btn.length));
    const randomVrai2 = Math.floor(Math.random() * (max));

    for (let i = 0, len = btn.length; i < len; i++) {
        let randomNb1 = Math.floor(Math.random() * (max));
        let randomNb2 = Math.floor(Math.random() * (max));
        
        const randomCoulVraie = coulString[randomVrai2];
        const randomCoul2Vraie = coulCode[randomVrai2];
    
        if (i==randomVrai){
            btn[i].innerHTML=randomCoulVraie;
            btn[i].style.color=randomCoul2Vraie; 
        }
        else {
            while (randomNb1==randomNb2){
                randomNb1 = Math.floor(Math.random() * (max));
                randomNb2 = Math.floor(Math.random() * (max));
            }
            btn[i].innerHTML=coulString[randomNb1];
            btn[i].style.color=coulCode[randomNb2];
        }
        

        btn[i].addEventListener("click", function () {  

            if (coulString.indexOf(this.innerHTML)==coulCode.indexOf(rgb2hex(this.style.color))){
                const compt2 = document.getElementById("compt");
                compt=compt-1;
                compt2.innerHTML="Compteur: "+compt;
                randomWord();
            }
            
        });
    }

    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

    function createElements(nbMots){

        const div = document.getElementById("text");
        for (let a = 0, len = nbMots; a < len; a++){
            const elements = document.createElement("p");
            div.appendChild(elements);
        }

    }
}