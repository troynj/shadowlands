const attackBtn = document.getElementById("atk-btn");
attackBtn.addEventListener("click", attack);
const capAtk = document.getElementById("cap-atk");
const capHp = document.getElementById("cap-hp");
const oppAtk = document.getElementById("opp-atk");
const oppHp = document.getElementById("opp-hp");
let capAtkArr = capAtk.textContent.split(" ");
let capHpArr = capHp.textContent.split(" ");
let oppAtkArr = oppAtk.textContent.split(" ");
let oppHpArr = oppHp.textContent.split(" ");
const capOriginalA = Number(capAtkArr[1]);
const capOriginalH = Number(capHpArr[1]);

function attack() {
  capAtkArr = capAtk.textContent.split(" ");
  capHpArr = capHp.textContent.split(" ");
  oppAtkArr = oppAtk.textContent.split(" ");
  oppHpArr = oppHp.textContent.split(" ");
  attackBtn.removeEventListener("click", attack);

  let result;

  result = Number(oppHpArr[1]) - Number(capAtkArr[1]);
  oppHp.textContent = "Health: ".concat(result.toString());

  document.body.style.backgroundColor = "orangered";
  oppHp.style.fontSize = "200%";

  if (result <= 0) {
    winner("cap");
    return;
  }

  setTimeout(function () {
    document.body.style.backgroundColor = "";
    oppHp.style.fontSize = "100%";
  }, 500);

  setTimeout(function () {
    result = Number(capHpArr[1]) - Number(oppAtkArr[1]);
    capHp.textContent = "Health: ".concat(result.toString());
    document.body.style.backgroundColor = "orangered";
    capHp.style.fontSize = "200%";

    if (result <= 0) {
      winner("opp");
      return;
    }
    setTimeout(function () {
      document.body.style.backgroundColor = "";
      capHp.style.fontSize = "100%";
      attackBtn.addEventListener("click", attack);
    }, 500);
  }, 2000);
}

function winner(monster) {
  console.log(monster);
  const enemyType = document.getElementById("enemy").textContent;

  if (monster === "opp") {
    console.log("Entered 1");
    // updateProgress(5, 0);
  } else if (enemyType == "Wild Monster") {
    // updateProgress(5, 0);
    increaseStats();
  } else if (enemyType === "Beast Monster") {
    // updateProgress(5, 2);
    increaseStats();
  }

  // document.location.reload();
}

function increaseStats() {
  const backdropEl = document.getElementById("backdrop");
  backdropEl.style.display = "flex";

  document.querySelectorAll("#modal tr").forEach((el) => {
    el.addEventListener("click", async function (event) {
      // event.preventDefault();
      const capMonId = document.querySelector("[tag]").getAttribute("tag");
      const stat =
        event.target.id === "atk"
          ? { attack: 5 + capOriginalA }
          : { health: 5 + capOriginalH };

      updateCaptured(capMonId, stat);
      backdropEl.style.display = "none";
    });
  });
}

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

async function updateCaptured(id, stat) {
  const response = await fetch(`/api/captured/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stat),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Successfully updated captured monster's stat: ", data);
  } else {
    console.error(
      "Error updating captured monster's stat:",
      response.statusText
    );
  }
}

//   if (response.ok) {
//     const data = await response.json();
//     console.log("Player progress update successful:", data);
//   } else {
//     console.error("Error updating comment:", response.statusText);
//   }
// }
