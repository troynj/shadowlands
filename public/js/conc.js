async function updateLocation() {
  const { href } = window.location;

  const urlArr = href.split("/");
  const journey_id = urlArr[urlArr.length - 1]
  const next = Number(journey_id) + 1
//req.session
const playerID = parseInt(localStorage.getItem("playerID"))
  const response = await fetch(`/api/player/${playerID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({progress: 0, journey_id: next}),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("Successfully updated player's stats: ", data);
    document.location.replace(`http://localhost:3001/Journey/${next}`)
  } else {
    console.error(
      "Error updating player's stast:",
      response.statusText
    );
  }
}

document
  .getElementById("next-journey")
  .addEventListener("click", updateLocation);
