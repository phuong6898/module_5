import axios from "axios";
import { toast } from "react-toastify";

const getOrder = async () => {
    try {
        const response = await axios.get("http://localhost:8080/order");
        return response.data;
    } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Lỗi khi lấy đơn hàng!");
        return [];
    }
};

const addOrder = async (order) => {
    try {
        const response = await axios.post("http://localhost:8080/order", order);
        toast.success("Thêm đơn hàng thành công!");
        return response.data;
    } catch (error) {
        console.error("Error adding order", error);
        toast.error("Lỗi khi thêm đơn hàng!");
        return false;
    }
};

export { getOrder, addOrder };
