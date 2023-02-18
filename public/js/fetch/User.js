const User = {
  get: async function () {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  },

  getOne: async function (id) {
    const response = await fetch(`/api/user/:${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  },

  update: async function(id, parameter) {
    const response = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({parameter}),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log("User progress update successful:", data);
    } else {
      console.error("Error updating comment:", response.statusText);
    }
  },

  delete: async function (id) {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`User with ID ${id} deleted successfully`);
    } else {
      console.error(
        `Error deleting User with ID ${id}:`,
        response.statusText
      );
    }
  },
};