document.querySelectorAll(".action").forEach(el => {el.addEventListener("click", function (event) {
  const player_id = event.target.getAttribute("player")
  const type = event.target.textContent
  if (type === "New Game") {
    console.log(type)
    const backdropEl = document.querySelector("#backdrop")
    backdropEl.classList.add('show');
    backdropEl.classList.remove('hide');
  document.querySelector("#close").addEventListener("click", function() {backdropEl.classList.add('hide');
    backdropEl.classList.remove('show');})
    document.querySelector("#create").addEventListener("click", function() {
      const userInput = document.querySelector('input[id="player-name"]') 
      if (userInput.value) {Player.create(userInput.value)
      document.location.reload()
    }
      else {
        userInput.style = "outline: 2px solid red;"
      }
    })
  }
  if (type === "Load") {
    //req.sess
  }
  if (type === "Delete") {
    Player.delete(player_id);
  }
});})
