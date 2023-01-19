export default function RegisterPage() {
  return (
    <form
      action="http://localhost:5000/api/users/register"
      method="POST"
      className="bg-gray-900 flex flex-col gap-y-3 p-3"
    >
      <input type="text" placeholder="First Name" required name="firstName" />
      <input type="text" placeholder="Last Name" name="lastName" />
      <input type="email" name="email" id="" />
      <input type="text" name="username" />
      <input type="text" name="phone" />
      <input type="password" name="password" id="" />
      <button type="submit" className="bg-green-900 block text-white">
        Submit
      </button>
    </form>
  );
}
