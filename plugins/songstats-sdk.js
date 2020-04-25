const axios = require("axios");

module.exports = {
    baseUrl: 'http://localhost:8000',
    login(code) { return axios.post(this.baseUrl + "/api/v1/auth", { code }) },
    getCurrentPlaying(token) { return axios.get(this.baseUrl + "/api/v1/playing?api_token=" + token) },
};