import './App.css';
import React, { useState } from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [ { name: "Nguyễn Văn A", phone: "0987654321", email: "vana@example.com" },
        { name: "Trần Thị B", phone: "0912345678", email: "thib@example.com" },
        { name: "Lê Văn C", phone: "0901234567", email: "vanc@example.com" }
      ],
      form: {name: "", phone: "", email: ""},
      isValid: false,
      indexSelected: -1
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState(
        (state) => {
          const form = {...state.form};
          form[name] = value;
          return {form};
        },
        () => this.checkInvalidForm()
    )
  }

  checkInvalidForm = () => {
    const { name, phone, email } = this.state.form;
    const isPhoneNumeric = /^[0-9]*$/.test(phone);
    const isValidForm = name.trim() && phone.trim() && email.trim() && isPhoneNumeric;
    this.setState({ isValid: !!isValidForm });
  };

  handleSelect = (studentSelected, index) => {
    this.setState({
      form: JSON.parse(JSON.stringify(studentSelected)),
      indexSelected: index
    });
  };

  handleSubmit = () => {
    if (this.state.isValid) {
      const newList = [...this.state.studentList];
      if (this.state.indexSelected > -1) {
        newList.splice(this.state.indexSelected, 1, this.state.form);
      } else {
        newList.push(this.state.form);
      }

      this.setState({
        studentList: newList,
        form: { name: "", phone: "", email: "" },
        isValid: false,
        indexSelected: -1
      });
    } else {
      alert("Form chưa hợp lệ hoặc thiếu dữ liệu!");
    }
  };

  handleDelete = (index) => {
    const newList = [...this.state.studentList];
    newList.splice(index, 1); // Xóa phần tử tại vị trí index
    this.setState({ studentList: newList });
  };

  render() {
    const { studentList, form } = this.state;

    return (
        <div style={{ margin: "20px" }}>
          <h1>Student List</h1>
          <div>
            <div>
              <label>Name: </label>
              <input
                  name="name"
                  value={form.name}
                  onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Phone: </label>
              <input
                  type="number"
                  name="phone"
                  value={form.phone}
                  onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                  name="email"
                  value={form.email}
                  onChange={this.handleChange}
              />
            </div>
            <button onClick={this.handleSubmit} style={{ marginTop: "10px" }}>
              Submit
            </button>
          </div>
          <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {studentList && studentList.length > 0 ? (
                studentList.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                      <td>
                        <button onClick={() => this.handleSelect(student, index)}>
                          Edit
                        </button>{" "}
                        <button onClick={() => this.handleDelete(index)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No student found
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
    );
  }
}

export default App;
