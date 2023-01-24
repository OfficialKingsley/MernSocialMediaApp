const addPost = (formData: FormData, token) => {
  const res = fetch("http://localhost:5000/api/posts", {
    body: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export default addPost;
