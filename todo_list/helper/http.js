import axios from 'axios';


const BASE_URL = 'http://10.0.0.236:8000/api/todos/';

export const fetchTodos = async (authToken) => {
    const response = await axios.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const addTodo = async (authToken, todoData) => {
    const response = await axios.post(`${BASE_URL}create/`, todoData, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const updateTodoHttp = async (authToken, id, todoData) => {
    const response = await axios.put(`${BASE_URL}update/${id}/`, todoData, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const deleteTodoHttp = async (authToken, id) => {
    const response = await axios.delete(`${BASE_URL}delete/${id}/`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const fetchCompletedTodos = async (authToken) => {
    const response = await axios.get(`${BASE_URL}?completed=true`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const fetchNotCompletedTodos = async (authToken) => {
    const response = await axios.get(`${BASE_URL}?completed=false`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};

export const searchTodos = async (authToken, query) => {
    const response = await axios.get(`${BASE_URL}?search=${query}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};
