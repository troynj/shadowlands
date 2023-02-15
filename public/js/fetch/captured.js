const Captured = {
  update: async function(id, stat) {
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
}