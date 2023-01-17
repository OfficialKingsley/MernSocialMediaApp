const login = async (username, password) => {
  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export default login;
