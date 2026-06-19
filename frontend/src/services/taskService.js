import { api } from './api'

export const taskService = {
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/tasks${params ? `?${params}` : ''}`)
    return response.data.data
  },

  getTaskStats: async () => {
    const response = await api.get('/tasks/stats')
    return response.data.data
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData)
    return response.data
  },

  updateTask: async (taskId, updates) => {
    const response = await api.put(`/tasks/${taskId}`, updates)
    return response.data
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`)
    return response.data
  },
}
