import axios from "axios";

const getProduct = async () => {
    try {
        const response = await axios.get("http://localhost:8080/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
};

export default getProduct;
