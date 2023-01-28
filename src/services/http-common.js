import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-type": "application/json",
        "Authorization": "vvvvvvvvrrg3r33rr33rr3rrg"
    }
});
