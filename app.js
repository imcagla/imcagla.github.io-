var toggleVar;
let boxAreas = document.getElementsByClassName("square");
let storedValues = [];
let firstPlayer = document.getElementById("firstplayer");
let secondPlayer = document.getElementById("secondplayer");
let playerForm = document.getElementById("player-form");

playerForm.addEventListener('submit', function(e) {
    let firstPlayerName = document.getElementById("firstname").value;
    let secondPlayerName = document.getElementById("secondname").value;
    firstPlayer.innerText = firstPlayerName;
    secondPlayer.innerText = secondPlayerName;

    e.preventDefault();
})

function setClickFunc() {
    for (item in boxAreas) {
        boxAreas[item].setAttribute("onclick",`putClick(${parseInt(item)+1});`);
        boxAreas[item].style.cursor = "pointer";
    }
}

function removeClickFunc() {
    for (item in boxAreas) {
        boxAreas[item].removeAttribute("onclick",`putClick(${parseInt(item)+1});`);
        boxAreas[item].style.cursor = null;
    }
}

function startGame() {
    this.event.target.id && (toggleVar = false);

    setTimeout(function() {
        document.getElementById("start-game").classList = "hide-box";
        document.getElementById("player-form").classList = "hide-box";
        document.getElementById("playerselect").style.visibility = null;
        document.getElementById("desc").innerHTML = `${!toggleVar ? firstPlayer.innerText: secondPlayer.innerText}'s turn!`
        setClickFunc();
        
      }, 250);
}

function putClick(boxLocation) {
    const boxSection = document.getElementById(`rowcol${boxLocation}`);

    toggleVar = !toggleVar
    document.getElementById("desc").innerHTML = `${!toggleVar ? firstPlayer.innerText: secondPlayer.innerText}'s turn!`
    
    toggleVar ? boxSection.innerHTML = "<span>X</span>" : boxSection.innerHTML = "<span>O</span>";
    localStorage.setItem(`rowcol${boxLocation}`, boxSection.innerHTML)
    storedValues = {... localStorage}
    boxSection.removeAttribute("onclick");

    setTimeout(function() {
       winCond();
      }, 200);
}

function winCond() {
    const condVar1 = document.getElementById(`rowcol1`).innerText + document.getElementById(`rowcol2`).innerText + document.getElementById(`rowcol3`).innerText;
    const condVar2 = document.getElementById(`rowcol4`).innerText + document.getElementById(`rowcol5`).innerText + document.getElementById(`rowcol6`).innerText;
    const condVar3 = document.getElementById(`rowcol7`).innerText + document.getElementById(`rowcol8`).innerText + document.getElementById(`rowcol9`).innerText;
    const condVar4 = document.getElementById(`rowcol1`).innerText + document.getElementById(`rowcol4`).innerText + document.getElementById(`rowcol7`).innerText;
    const condVar5 = document.getElementById(`rowcol2`).innerText + document.getElementById(`rowcol5`).innerText + document.getElementById(`rowcol8`).innerText;
    const condVar6 = document.getElementById(`rowcol3`).innerText + document.getElementById(`rowcol6`).innerText + document.getElementById(`rowcol9`).innerText;
    const condVar7 = document.getElementById(`rowcol1`).innerText + document.getElementById(`rowcol5`).innerText + document.getElementById(`rowcol9`).innerText;
    const condVar8 = document.getElementById(`rowcol3`).innerText + document.getElementById(`rowcol5`).innerText + document.getElementById(`rowcol7`).innerText;

    let condArr = [condVar1, condVar2, condVar3, condVar4, condVar5, condVar6, condVar7, condVar8];
    let scoreXint = parseInt(document.getElementById("scoreX").innerText);
    let scoreOint = parseInt(document.getElementById("scoreO").innerText);

    for(let i=0; i<condArr.length; i++) {
        if(condArr[i] === "XXX") {
            document.getElementById("alertbox").innerHTML = `
            <span class="box-alert" >
                ${firstPlayer.innerText} 'X' WON!! <span class="btn-close" onclick="clearTable()">X</span>
            </span>
            `
            document.getElementById("scoreX").innerText = scoreXint + 1;
            removeClickFunc();
            

        } else if (condArr[i] === "OOO") {
            document.getElementById("alertbox").innerHTML = `
            <span class="box-alert" >
                ${secondPlayer.innerText} 'O' WON!! <span class="btn-close" onclick="clearTable()">X</span>
            </span>
            `
            document.getElementById("scoreO").innerText = scoreOint + 1;
            removeClickFunc();
        } 
    }
    if (Object.keys(storedValues).length === 9) {
        document.getElementById("alertbox").innerHTML = `
        <span class="box-alert" >
            SCORELESS.. Play Again! <span class="btn-close" onclick="clearTable()">X</span>
        </span>
        `
        removeClickFunc();
    }
}

function clearTable() {
    for (item in boxAreas) {
        boxAreas[item].innerHTML = "";
    }
    document.getElementById("alertbox").innerHTML = "";
    toggleVar = false;
    document.getElementById("desc").innerHTML = `${!toggleVar ? firstPlayer.innerText: secondPlayer.innerText}'s turn!`
    window.localStorage.clear();
    setClickFunc();
    
}



// function playerSelect() {
//     console.log(this.event.target.id);
//     this.event.target.id === "false" ? toggleVar = false : toggleVar = true;

//     setTimeout(function() {
//         document.getElementById("playerselect").classList = "hide-box";
//         document.getElementById("desc").innerHTML = `Player '${!toggleVar ? "X": "O"}' starts!`
//        }, 250);
    

// }