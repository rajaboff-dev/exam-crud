import API from "../utils/api.js";

const UserService = {
  async getUsers({ queryKey }) {
    const searchParams = queryKey[1]
    const queryParams = new URLSearchParams(searchParams);
    const { data } = await API.get(`/users?${queryParams.toString()}`);
    return data;
  },
  async addUser(payload) {
    return await API.post('/users', payload);
  },
  async updateUser({ id, payload }) {
    return await API.patch(`/users/${id}`, payload);
  },
  async deleteUser({ id }) {
    return await API.delete(`/users/${id}`);
  }
}

export default UserService