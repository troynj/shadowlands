const Auth = {
  SignUp: async function({name, email, password}) {
    console.log("credentials", name, password)
    
    const response = await fetch("/api/Auth/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //req.sess
      body: JSON.stringify({name, email, password}),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("User added successfully:", data);
      return data.id
    } else {
      console.error("Error adding User:", response.statusText);
    }
  },
  SignIn: async function(email, password) {
    console.log("credentials", email, ", ", password)

    const response = await fetch("/api/Auth/SignIn", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //req.sess
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User added successfully:", data);
    } else {
      console.error("Error adding User:", response.statusText);
    }
  },
    SignOut : async function() {
      const response = await fetch('/api/Auth/SignOut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
      } else {
        alert(response.statusText);
      }
    }
}