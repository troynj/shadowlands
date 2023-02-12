let myAtk = document.getElementById("my-atk");
let myHp = document.getElementById("my-hp");
let oppAtk = document.getElementById("opp-atk");
let oppHp = document.getElementById("opp-hp");
let myAtkArr = myAtk.textContent.split(" ");
let myHpArr = myHp.textContent.split(" ");
let oppAtkArr = oppAtk.textContent.split(" ");
let oppHpArr = oppHp.textContent.split(" ");
const originalAtk = myAtkArr[1];
const originalHp = myHpArr[1];
let attackbtn = document.getElementById("atk-btn");

attackbtn.addEventListener("click", attack);

function attack() {
  attackbtn.removeEventListener("click", attack);
  let result;

  result = Number(oppHpArr[1]) - Number(myAtkArr[1]);
  oppHp.textContent = "Health: ".concat(result.toString());

  document.body.style.backgroundColor = "orangered";
  oppHp.style.fontSize = "200%";

  if (result <= 0) {
    interpretEndgame("me");
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

    if (result <= 0) {
      interpretEndgame("opp");
      return;
    }
    setTimeout(function () {
      document.body.style.backgroundColor = "";
      myHp.style.fontSize = "100%";
      attackbtn.addEventListener("click", attack);
    }, 500);
  }, 2000);
}

function interpretEndgame(winner) {
  if (winner === "opp") {
    updateProgress(5, 0);
  } else if (document.getElementById(enemy).textContent === "Wild Monster") {
    updateProgress(5, 0);
    promptUpgrade(5);
  } else if (document.getElementById(enemy).textContent === "Beast Monster") {
    updateProgress(5, 2);
    promptUpgrade(5);
  }

  document.location.reload();
}

async function updateProgress(id, progress) {
  const response = await fetch(`/api/player/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ progress }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Player progress update successful:", data);
  } else {
    console.error("Error updating comment:", response.statusText);
  }
}
function promptUpgrade() {
  const modalEl = document.getElementById("modal");
  modalEl.style.zIndex = 1;

  document
    .getElementsByClassName("#modal > article > table > tr")
    .forEach((row) =>
      row.addEventListener("click", function (event) {
        const stat =
          event.target.id === "atk"
            ? { attack: 5 + originalAtk }
            : { health: 5 + originalHp };
        updateCaptured(stat, document
          .querySelector("tag")
          .getAttribute("tag"));
      })
    );
}

async function updateCaptured(stat, id) {
  const response = await fetch(`/api/captured/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stat),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Player progress update successful:", data);
  } else {
    console.error("Error updating comment:", response.statusText);
  }
}
