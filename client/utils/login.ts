const login = async (username, password) => {
  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await res.json();

  return user;
};

export default login;
