async function create(type, id) {
  const response = await fetch(`/api/arena/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, id }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Arena creation successful:", data);
  } else {
    console.error("Error creating arena:", response.statusText);
  }
}

//create arena
document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", function (event) {
    const { name, id } = event.target
    create(name, id)
    // document.location.reload();
  })
);
