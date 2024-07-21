// store/TodoContext.js
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { fetchTodos, addTodo, updateTodoHttp, deleteTodoHttp, fetchCompletedTodos, fetchNotCompletedTodos, searchTodos as searchTodosApi } from "../helper/http";
import {useAuth} from "./AuthContex";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'ADD':
            return [action.payload, ...state];
        case 'UPDATE':
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
        case 'DELETE':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
};

export const TodoContextProvider = ({ children }) => {
    const { authToken } = useAuth();
    const [todos, dispatch] = useReducer(todoReducer, []);

    useEffect(() => {
        async function loadTodos() {
            if (!authToken) return; // authToken yoksa çağrıyı yapma
            try {
                const todosData = await fetchTodos(authToken);
                dispatch({ type: 'SET', payload: todosData });
            } catch (error) {
                console.error('Failed to load todos:', error);
            }
        }
        loadTodos();
    }, [authToken]);

    const addTodoItem = async (todoData) => {
        if (!authToken) return;
        try {
            const newTodo = await addTodo(authToken, todoData);
            dispatch({ type: 'ADD', payload: newTodo });
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    };

    const updateTodoItem = async (id, todoData) => {
        if (!authToken) return;
        try {
            const updatedTodo = await updateTodoHttp(authToken, id, todoData);
            dispatch({ type: 'UPDATE', payload: updatedTodo });
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const deleteTodoItem = async (id) => {
        if (!authToken) return;
        try {
            await deleteTodoHttp(authToken, id);
            dispatch({ type: 'DELETE', payload: id });
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    const loadCompletedTodos = async () => {
        if (!authToken) return;
        try {
            const completedTodos = await fetchCompletedTodos(authToken);
            dispatch({ type: 'SET', payload: completedTodos });
        } catch (error) {
            console.error('Failed to load completed todos:', error);
        }
    };

    const loadNotCompletedTodos = async () => {
        if (!authToken) return;
        try {
            const notCompletedTodos = await fetchNotCompletedTodos(authToken);
            dispatch({ type: 'SET', payload: notCompletedTodos });
        } catch (error) {
            console.error('Failed to load not completed todos:', error);
        }
    };

    const loadAllTodos = async () => {
        if (!authToken) return;
        try {
            const todosData = await fetchTodos(authToken);
            dispatch({ type: 'SET', payload: todosData });
        } catch (error) {
            console.error('Failed to load todos:', error);
        }
    };

    const searchTodos = async (query) => {
        if (!authToken) return;
        try {
            const searchResults = await searchTodosApi(authToken, query);
            dispatch({ type: 'SET', payload: searchResults });
        } catch (error) {
            console.error('Failed to search todos:', error);
        }
    };

    const value = {
        todos,
        addTodo: addTodoItem,
        updateTodo: updateTodoItem,
        deleteTodo: deleteTodoItem,
        loadCompletedTodos,
        loadNotCompletedTodos,
        loadAllTodos,
        searchTodos,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};
