import axios from "axios";

export const apiService = {
  get: (input) => {
    return axios
      .get(`https://viacep.com.br/ws/${input}/json/`)
      .then(function (response) {
        return response.data;
      });
  },
};

export default apiService;
