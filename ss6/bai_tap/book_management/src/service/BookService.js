import axios from "axios";

const API_BASE_URL = "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";

export const getBooks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error in getBooks:", error);
        throw error;
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error in getBookById for id ${id}:`, error);
        throw error;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await axios.post(API_BASE_URL, bookData);
        return response;
    } catch (error) {
        console.error("Error in createBook:", error);
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, bookData);
        return response;
    } catch (error) {
        console.error(`Error in updateBook for id ${id}:`, error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response;
    } catch (error) {
        console.error(`Error in deleteBook for id ${id}:`, error);
        throw error;
    }
};
