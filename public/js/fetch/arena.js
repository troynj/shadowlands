const Arena = {
  create: async function(type, id, playerID) {
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

}