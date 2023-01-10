import axios from "axios";

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    TokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
  },
});

// interceptor
requester.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization:
      "Bearer " + 
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZGhzMTIxMjQyM0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsImRoczEyMTI0MjNAZ21haWwuY29tIiwiZ3AwMSJdLCJuYmYiOjE2NzI0NjU3NDUsImV4cCI6MTY3MjQ2OTM0NX0.GDMXyARF-OyPlvqHjasVwv0aG3jLDu8OIkK9j2tQ-vk",
      // localStorage.getItem("token"),
  };
  return req;
});

export default requester;
