async function createArena(type, id) {
  let playerID = localStorage.getItem("playerID")
  const response = await fetch(`/api/arena/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, id, playerID }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Arena creation successful:", data);
  } else {
    console.error("Error creating arena:", response.statusText);
  }
}

async function updateProgress(id) {
    const response = await fetch(`/api/player/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       progress: 1
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Successfully updated player progress:", data);
    } else {
      console.error("Error updating player Progress:", response.statusText);
    }
  }

//create arena
document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", async function (event) {
    const { name, id } = event.target
    console.log(event.target)
    console.log("name", name)
    console.log("id", id)
    await createArena(name, id)
    await updateProgress(localStorage.get("playerID"))
    document.location.reload();
  })
);
