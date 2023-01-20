const register = async (body: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await res.json();
  console.log(user);
  return user;
};

export default register;
