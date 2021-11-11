var toggleVar;
let boxAreas = document.getElementsByClassName("square");
let storedValues = [];

function startGame() {
    this.event.target.id ? toggleVar = false : toggleVar = true;

    setTimeout(function() {
        document.getElementById("start-game").classList = "hide-box";
        document.getElementById("playerselect").style.visibility = null;
        document.getElementById("desc").innerHTML = `${!toggleVar ? "First Player": "Second Player"}'s turn!`
        for (item in boxAreas) {
            boxAreas[item].setAttribute("onclick",`putClick(${parseInt(item)+1});`);
            boxAreas[item].style.cursor = "pointer";
        }
        
      }, 250);

}

// function playerSelect() {
//     console.log(this.event.target.id);
//     this.event.target.id === "false" ? toggleVar = false : toggleVar = true;

//     setTimeout(function() {
//         document.getElementById("playerselect").classList = "hide-box";
//         document.getElementById("desc").innerHTML = `Player '${!toggleVar ? "X": "O"}' starts!`
//        }, 250);
    

// }


function putClick(boxLocation) {
    const boxSection = document.getElementById(`rowcol${boxLocation}`);

    toggleVar = !toggleVar
    document.getElementById("desc").innerHTML = `${!toggleVar ? "First Player": "Second Player"}'s turn!`
    
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
                FIRST PLAYER 'X' WON!! <span class="btn-close" onclick="clearTable()">X</span>
            </span>
            `
            document.getElementById("scoreX").innerText = scoreXint + 1;
            for (item in boxAreas) {
                boxAreas[item].setAttribute("onclick",`putClick(${parseInt(item)+1});`);
                boxAreas[item].style.cursor = "pointer";
                toggleVar = false;
            }
            

        } else if (condArr[i] === "OOO") {
            document.getElementById("alertbox").innerHTML = `
            <span class="box-alert" >
                SECOND PLAYER 'O' WON!! <span class="btn-close" onclick="clearTable()">X</span>
            </span>
            `
            document.getElementById("scoreO").innerText = scoreOint + 1;
            for (item in boxAreas) {
                boxAreas[item].setAttribute("onclick",`putClick(${parseInt(item)+1});`);
                boxAreas[item].style.cursor = "pointer";
                toggleVar = false;
            }
            
            
        } else if (Object.keys(storedValues).length === 9) {
            document.getElementById("alertbox").innerHTML = `
            <span class="box-alert" >
                SCORELESS.. Play Again! <span class="btn-close" onclick="clearTable()">X</span>
            </span>
            `
            for (item in boxAreas) {
                boxAreas[item].setAttribute("onclick",`putClick(${parseInt(item)+1});`);
                boxAreas[item].style.cursor = "pointer";
                toggleVar = false;
            }
            
        }
    }
}

function clearTable() {
    for (item in boxAreas) {
        boxAreas[item].innerHTML = "";
    }
    document.getElementById("alertbox").innerHTML = "";
    window.localStorage.clear();
}



