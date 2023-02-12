let myAtk = document.getElementById("my-atk");
let myHp = document.getElementById("my-hp");
let oppAtk = document.getElementById("opp-atk");
let oppHp = document.getElementById("opp-hp");
let attackbtn = document.getElementById("atk-btn");
let myAtkArr = myAtk.textContent.split(" ");
let myHpArr = myHo.textContent.split(" ");
let oppAtkArr = oppAtk.textContent.split(" ");
let oppHpArr = oppHp.textContent.split(" ");
let result;

attackbtn.addEventListener("click", attack);

function attack() {
  attackbtn.removeEventListener("click", attack);

  result = Number(oppHpArr[1]) - Number(myAtkArr[1]);
  oppHp.textContent = "Health: ".concat(result.toString());

  document.body.style.backgroundColor = "orangered";
  oppHp.style.fontSize = "200%";

  if (result <= 0) {
    winner("me");
    return;
  }

  setTimeout(function () {
    document.body.style.backgroundColor = "";
    oppHp.style.fontSize = "100%";
  }, 500);

  setTimeout(function () {
    result = Number(myHpArr[1]) - Number(oppAtkArr[1]);
    myHp.textContent = "Health: ".concat(result.toString());
    document.body.style.backgroundColor = "orangered";
    myHp.style.fontSize = "200%";

    setTimeout(function () {
      document.body.style.backgroundColor = "";
      myHp.style.fontSize = "100%";
      attackbtn.addEventListener("click", attack);
    }, 500);
  }, 2000);

  if (result <= 0) {
    winner("opp");
    return;
  }
}

// function winner(monster) {
//   if (monster === "opp") {
//     updateProgress(5, 0);
//   } else if (
//     monster === "me" &&
//     document.getElementById(enemy).textContent === "Wild Monster"
//   ) {
//     updateProgress(5, 0);
//     consumeStats(5);
//   } else if (document.getElementById(enemy).textContent === "Beast Monster") {
//     updateProgress(5, 2);
//     consumeStats(5);
//   }

//   document.location.reload();
// }

// async function consumeStats() {
//   var modal = document.getElementById("consume-selection");
//   var select = document.getElementsById("select");

//   modal.style.display = "block";
//   select.onclick = function () {
//     document.getElementById("add-atk").addEventListener("click", add);
//     document.getElementById("add-hp").addEventListener("click", add);
//     function add(event) {
//       let { textContent, id } = event.target;
//       const selected = textContent.split(" ");
//       const result = {};
//       selected[1] === "Attack"
//         ? (result.attack = Number(myAtkArr[1] + Number(selected[0])))
//         : (result.health = Number(myHpArr[1] + Number(selected[0])));
//       updateCaptured(id, result);
//     }
//     modal.style.display = "none";
//   };
// }

// async function updateProgress(id, { result } ) {
//   const response = await fetch(`/api/player/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(result),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log("Player progress update successful:", data);
//   } else {
//     console.error("Error updating comment:", response.statusText);
//   }
// }

// async function updateCaptured(id, ammt, stat) {
//   const response = await fetch(`/api/captured/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       attack: 5,
//     }),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log("Player progress update successful:", data);
//   } else {
//     console.error("Error updating comment:", response.statusText);
//   }
// }
