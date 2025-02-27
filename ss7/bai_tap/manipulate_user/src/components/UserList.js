import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersRequest, deleteUserRequest } from "../store/Action";
import { Table, Button, Modal } from "react-bootstrap";

function UserList() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleGetUsers = () => {
        dispatch(getUsersRequest());
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            dispatch(deleteUserRequest(selectedUser.id));
        }
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="container mt-4">
            <h1>User list</h1>
            <Button variant="primary" onClick={handleGetUsers}>
                Get users
            </Button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.website}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteClick(u)}>
                                Delete user
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa user "{selectedUser?.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserList;