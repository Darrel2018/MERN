import axios from "axios";

class MovieDataService {

    getAll(page = 0) {// REACT_APP_API_URL
        return axios.get(`${process.env.REACT_APP_API_URL}/movies?page=${page}`);
    }

    get(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}/movies/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(
            `${process.env.REACT_APP_API_URL}/movies?${by}=${query}&page=${page}`
        );
    }

    createReview(data) {
        return axios.post(process.env.REACT_APP_API_URL + "/movies/review", data);
    }

    updateReview(data) {
        return axios.put(process.env.REACT_APP_API_URL + "/movies/review", data);
    }

    deleteReview(id, userId) {
        return axios.delete(
            process.env.REACT_APP_API_URL + "/movies/review",
            { data: { review_id: id, user_id: userId } }
        );
    }

    getRatings() {
        return axios.get(process.env.REACT_APP_API_URL + "/movies/ratings");
    }
}

export default new MovieDataService();