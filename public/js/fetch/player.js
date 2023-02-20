const Player = {
  create: async function (name) {

    const response = await fetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //req.sess
      body: JSON.stringify({
        name: name,
        progress: 0,
        journey_id: 1,
        user_id: localStorage.getItem("playerID")
      }),
    });

    if (response.ok) {
      const data = await response.json();
      this.id = data.id;
      console.log("Player added successfully:", data);
    } else {
      console.error("Error adding Player:", response.statusText);
    }
  },

  update: async function(id, progress) {
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
      console.error("Error updating comment:", response.statusText);
    }
  },

  delete: async function (id) {
    const response = await fetch(`/api/player/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Player with ID ${id} deleted successfully`);
    } else {
      console.error(
        `Error deleting Player with ID ${id}:`,
        response.statusText
      );
    }
  },
};