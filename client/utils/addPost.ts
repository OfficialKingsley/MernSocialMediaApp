const addPost = async (formData: FormData, token) => {
  const res = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  return response;
};
export default addPost;
