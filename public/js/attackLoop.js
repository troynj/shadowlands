let attackBtn = document.getElementById("atk-btn");
attackBtn.addEventListener("click", attack);

function attack() {
  attackBtn.removeEventListener("click", attack);

  const capAtk = document.getElementById("cap-atk");
  const capHp = document.getElementById("cap-hp");
  const oppAtk = document.getElementById("opp-atk");
  const oppHp = document.getElementById("opp-hp");
  let capAtkArr = capAtk.textContent.split(" ");
  let capHpArr = capHp.textContent.split(" ");
  let oppAtkArr = oppAtk.textContent.split(" ");
  let oppHpArr = oppHp.textContent.split(" ");
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
      capHp.style.fontSize = "100%";
      attackBtn.addEventListener("click", attack);
    }, 500);
  }, 2000);
}

  // document.location.reload();
function winner(monster) {
  const playerID = parseInt(localStorage.getItem("playerID"))
  const enemyType = document.getElementById("enemy").textContent
  if (monster === "opp") {
    updateProgress(playerID, 0);
    const backdropEl = document.getElementById("loss-backdrop");
  backdropEl.style.display = "flex";

  document.getElementById("ctu").addEventListener('click', function() {document.location.reload()})
  } else if (enemyType === "Wild Monster") {
    updateProgress(playerID, 0);
    increaseStats();
  } else if (enemyType === "Beast Monster") {
    updateProgress(playerID, 2);
    increaseStats();
  }
}

function increaseStats() {
  const backdropEl = document.getElementById("win-backdrop");
  backdropEl.style.display = "flex";

  document.querySelectorAll("#modal tr").forEach((el) => {
    el.addEventListener("click", async function (event) {
      // event.preventDefault();
      const capId = document.querySelector("[tag]").getAttribute("tag");
      let{attack, health} = await getCapDBStats(capId)
      // console.log(capADB)
      // console.log(capHDB)
      const stat =
        event.target.id === "atk"
          ? { attack: (5 + attack) }
          : { health: (5 + health) };

      await updateCaptured(capId, stat);
      // backdropEl.style.display = "none";
      document.location.reload()
    });
  });
}

async function getCapDBStats(id) {
  const response = await fetch(`/api/captured/${id}` , {
    method:'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  return {attack, health} = await response.json()
}

async function updateProgress(id, progress) {
  const response = await fetch(`/api/player/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({progress}),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Player progress update successful:", data);
  } else {
    console.error("Error updating player progress:", response.statusText);
  }
}

async function updateCaptured(id, stat) {
  console.log("line 117",stat)
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