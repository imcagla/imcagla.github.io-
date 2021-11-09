var toggleVar = false;

function putClick(boxLocation) {
    const boxSection = document.getElementById(`rowcol${boxLocation}`);
    toggleVar = !toggleVar;

    toggleVar ? boxSection.innerHTML = "<span>X</span>" : boxSection.innerHTML = "<span>O</span>";

    setTimeout(function() {
       winCond();
      }, 1200);
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
    

    for(let i=0; i<condArr.length; i++) {
        if(condArr[i] === "XXX" || condArr[i] === "OOO") {
            //alert("YOU WIN!");
            document.getElementById("alertbox").innerHTML = `
            <span class="box-alert" >
                YOU WIN!! <span class="btn-close" onclick="window.location.reload()">X</span>
            </span>
            
            
            `
        }
    }
}

