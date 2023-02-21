const Load = {
  update: async function(playerID) {
    const response = await fetch(`/api/loadPlayer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({playerID}),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log("Player update successful:", data);
      return data
    } else {
      console.error("Error updating Player:", response.statusText);
    }
  }
}