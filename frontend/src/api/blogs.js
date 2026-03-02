axios.post("/api/blogs", blogData, {
  headers: { Authorization: `Bearer ${token}` },
});
