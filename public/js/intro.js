//create arena
document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", async function (event) {
    const playerID = parseInt(localStorage.getItem("playerID"))
    console.log("player ID : ", playerID)
    const { name: type, id: monsterID } = event.target
    console.log(event.target)
    console.log("type: ", type)
    console.log("monsterID: ", monsterID)
    await Arena.create(type, monsterID, playerID)
    await Player.update(playerID, 1)
    document.location.reload();
  })
);
