btn_id = 0
Victory = []

function Victoire(btn, Players, current_player) {
    if ((
        btn[0].innerHTML == Players[current_player] &&
        btn[1].innerHTML == Players[current_player] &&
        btn[2].innerHTML == Players[current_player]
    ) || (
            btn[3].innerHTML == Players[current_player] &&
            btn[4].innerHTML == Players[current_player] &&
            btn[5].innerHTML == Players[current_player]
        ) || (
            btn[6].innerHTML == Players[current_player] &&
            btn[7].innerHTML == Players[current_player] &&
            btn[8].innerHTML == Players[current_player]
        ) || (
            btn[0].innerHTML == Players[current_player] &&
            btn[3].innerHTML == Players[current_player] &&
            btn[6].innerHTML == Players[current_player]
        ) || (
            btn[1].innerHTML == Players[current_player] &&
            btn[4].innerHTML == Players[current_player] &&
            btn[7].innerHTML == Players[current_player]
        ) || (
            btn[0].innerHTML == Players[current_player] &&
            btn[3].innerHTML == Players[current_player] &&
            btn[6].innerHTML == Players[current_player]
        ) || (
            btn[1].innerHTML == Players[current_player] &&
            btn[4].innerHTML == Players[current_player] &&
            btn[7].innerHTML == Players[current_player]
        ) || (
            btn[2].innerHTML == Players[current_player] &&
            btn[5].innerHTML == Players[current_player] &&
            btn[8].innerHTML == Players[current_player]
        ) || (
            btn[0].innerHTML == Players[current_player] &&
            btn[4].innerHTML == Players[current_player] &&
            btn[8].innerHTML == Players[current_player]
        ) || (
            btn[2].innerHTML == Players[current_player] &&
            btn[4].innerHTML == Players[current_player] &&
            btn[6].innerHTML == Players[current_player]
        )) {
        if (current_player == 0) {
            btn[0].style.backgroundColor = "#9ACD32";
            btn[1].style.backgroundColor = "#9ACD32";
            btn[2].style.backgroundColor = "#9ACD32";
            btn[3].style.backgroundColor = "#9ACD32";
            btn[4].style.backgroundColor = "#9ACD32";
            btn[5].style.backgroundColor = "#9ACD32";
            btn[6].style.backgroundColor = "#9ACD32";
            btn[7].style.backgroundColor = "#9ACD32";
            btn[8].style.backgroundColor = "#9ACD32";
        }
        else if (current_player == 1) {
            btn[0].style.backgroundColor = "#FF0000";
            btn[1].style.backgroundColor = "#FF0000";
            btn[2].style.backgroundColor = "#FF0000";
            btn[3].style.backgroundColor = "#FF0000";
            btn[4].style.backgroundColor = "#FF0000";
            btn[5].style.backgroundColor = "#FF0000";
            btn[6].style.backgroundColor = "#FF0000";
            btn[7].style.backgroundColor = "#FF0000";
            btn[8].style.backgroundColor = "#FF0000";
        }
        return true;
    }
    return false;
}

function caseVide(btn) {
    return btn.innerHTML.length == 0;
}

function setSymbole(element, symbole) {
    element.innerText = symbole;
}

function finPartie(btn, btn_id) {
    for (var i = 0, len = btn.length; i < len; i++) {
        btn[i].disabled = true
    }
    btn_id += 10

    if (btn_id >= 90) {
        Fin();
    } else {
        Partie(btn_id);
    }
}

function Partie(btn_id) {
    Players = ["X", "O"];

    var current_player = 0;
    var tour = 1;

    var btn = []
    for (var i = 0, len = 9; i < len; i++) {
        btn.push(document.getElementById(btn_id + i));
    }

    var jeuFin = false;

    for (var i = 0, len = btn.length; i < len; i++) {
        btn[i].addEventListener("click", function () {
            if (jeuFin) return;

            if (!caseVide(this)) {
                if (current_player == 0) {
                    // setTimeout(AI(btn), 1000);
                    // AI(btn);
                }
            }
            else {
                setSymbole(this, Players[current_player]);

                if (Victoire(btn, Players, current_player)) {
                    Victory.push(Players[current_player])
                    finPartie(btn, btn_id);
                    if (VictoireFin(Victory, Players, current_player)) {
                        Fin()
                        return;
                    }
                    else {
                        return;
                    }
                }

                tour++;
                current_player++;
                current_player = current_player % 2;

                if (tour >= 10) {
                    Victory.push("draw")
                    finPartie(btn, btn_id);
                }

                if (btn_id >= 90) {
                    Fin();
                }

                if (current_player == 1) {
                    if (tour < 10) {
                        setTimeout(AI(btn, tour), 1000);
                        // AI(btn)
                    }
                }
            }
        });
    }
}

function AI(btn, tour) {
    btn_random = btn[Math.floor(Math.random() * btn.length)]
    while (btn_random.innerHTML.length == 1) {
        btn_random = btn[Math.floor(Math.random() * btn.length)]
    }
    btn_random.click();
}

function Fin() {
    alert("Victoire");
}

function VictoireFin(Victory, Players, current_player) {
    if ((
        Victory[0] == Players[current_player] &&
        Victory[1] == Players[current_player] &&
        Victory[2] == Players[current_player]
    ) || (
            Victory[3] == Players[current_player] &&
            Victory[4] == Players[current_player] &&
            Victory[5] == Players[current_player]
        ) || (
            Victory[6] == Players[current_player] &&
            Victory[7] == Players[current_player] &&
            Victory[8] == Players[current_player]
        ) || (
            Victory[0] == Players[current_player] &&
            Victory[3] == Players[current_player] &&
            Victory[6] == Players[current_player]
        ) || (
            Victory[1] == Players[current_player] &&
            Victory[4] == Players[current_player] &&
            Victory[7] == Players[current_player]
        ) || (
            Victory[0] == Players[current_player] &&
            Victory[3] == Players[current_player] &&
            Victory[6] == Players[current_player]
        ) || (
            Victory[1] == Players[current_player] &&
            Victory[4] == Players[current_player] &&
            Victory[7] == Players[current_player]
        ) || (
            Victory[2] == Players[current_player] &&
            Victory[5] == Players[current_player] &&
            Victory[8] == Players[current_player]
        ) || (
            Victory[0] == Players[current_player] &&
            Victory[4] == Players[current_player] &&
            Victory[8] == Players[current_player]
        ) || (
            Victory[2] == Players[current_player] &&
            Victory[4] == Players[current_player] &&
            Victory[6] == Players[current_player]
        )) {
        return true;
    }
    return false;
}

Partie(btn_id);