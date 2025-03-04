import axios from "axios";
import { toast } from "react-toastify";

export const getProduct = async () => {
    try {
        const response = await axios.get("http://localhost:8080/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching product", error);
        toast.error("Lỗi khi lấy sản phẩm !");
        return [];
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post("http://localhost:8080/products", product);
        return response.data;
    } catch (error) {
        console.error("Error adding product", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by id", error);
        throw error;
    }
};

export const updateProduct = async (product) => {
    try {
        const response = await axios.put(
            `http://localhost:8080/products/${product.id}`,
            product
        );
        return response.data;
    } catch (error) {
        console.error("Error updating product", error);
        throw error;
    }
};
