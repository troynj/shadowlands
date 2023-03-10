document.querySelectorAll(".action").forEach(el => {el.addEventListener("click", async function (event) {
  const player_id = event.target.getAttribute("player")
  const type = event.target.textContent
  if (type === "New Game") {
    console.log(type)
    const backdropEl = document.querySelector("#backdrop")
    backdropEl.classList.add('show');
    backdropEl.classList.remove('hide');
  document.querySelector("#close").addEventListener("click", function() {backdropEl.classList.add('hide');
    backdropEl.classList.remove('show');})
    document.querySelector("#create").addEventListener("click", async function() {
      const userInput = document.querySelector('input[id="player-name"]') 
      const userId = document.querySelector('h2[id]').getAttribute("id")
      // console.log(userId)
      if (userInput.value) {const playerID = await Player.create(userId, userInput.value)
        localStorage.setItem("playerID", playerID)
        await Load.update(playerID)
        // document.location.reload()
      document.location.replace("../../SelectMonster")
    }
    else {
      userInput.style = "outline: 2px solid red;"
    }
  })
}
else if(type === "Load") {
  // console.log(event.target.getAttribute("player"))
  
  const playerID = event.target.getAttribute("player")
  const journeyID = event.target.getAttribute("journey")
  localStorage.setItem("playerID", playerID)
  console.log(playerID)
  await Player.update(playerID, 0)
  await Load.update(playerID)
  document.location.replace(`../Journey/${journeyID}`)

}
else if (type === "Delete") {
  Player.delete(player_id);
  document.location.reload()
  }
  else {console.log("error in selecting action")}
});})
