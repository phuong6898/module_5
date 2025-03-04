import axios from "axios";

const getCategory = async () => {
    try {
        const response = await axios.get("http://localhost:8080/category");
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
};

export default getCategory;
