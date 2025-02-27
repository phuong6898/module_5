import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    // 1️⃣ Khi load trang, gọi API để lấy danh sách todo
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
                setTodos(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchTodos();
    }, []);

    // 2️⃣ Xử lý thêm todo mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
                title: newTodo,
                completed: false,
            });

            alert(`Thêm thành công! (Status: ${response.status})`);

            setTodos([...todos, response.data]);
            setNewTodo("");
        } catch (error) {
            console.error("Lỗi khi thêm todo:", error);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Nhập todo mới..."
                />
                <button type="submit">Submit</button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
