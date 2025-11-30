import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export default {
  get: async (url) => (await api.get(url)).data,
  post: async (url, data) => (await api.post(url, data)).data,
  put: async (url, data) => (await api.put(url, data)).data,
  delete: async (url) => (await api.delete(url)).data,
}
