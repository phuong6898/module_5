import './App.css';
import React, { Component } from "react";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      item: ""
    };
  }

  handleChange = (event) => {
    this.setState({ item: event.target.value });
  };

  handleAddItem = () => {
    if (this.state.item.trim()) {
      this.setState((prevState) => ({
        list: [...prevState.list, prevState.item],
        item: ""
      }));
    }
  };

  render() {
    const { list, item } = this.state;
    return (
        <div style={{ margin: "20px" }}>
          <h1>Todo List</h1>
          <input
              type="text"
              value={item}
              onChange={this.handleChange}
              placeholder="Nhập công việc..."
          />
          <button onClick={this.handleAddItem} style={{ marginLeft: "10px" }}>
            Add
          </button>

          <ul style={{ marginTop: "20px" }}>
            {list.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
    );
  }
}

export default App;
