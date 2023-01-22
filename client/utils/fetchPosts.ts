const fetchPosts = async (token) => {
  const res = await fetch("http://localhost:5000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await res.json();
  return posts;
};

export default fetchPosts;
