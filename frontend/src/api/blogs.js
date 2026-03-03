import API from "../api/blogApi"; 

// І просто роби запит — API сам додасть токен з localStorage!
API.post("/blogs", blogData);