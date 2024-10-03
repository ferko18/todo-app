import React, { useState } from "react";
import { Trash2, Edit, Plus, Save } from "lucide-react";
import "../App.css";

function Todos() {
  const initData = [
    {
      id: 1,
      title: "study React",
      completed: false,
    },
    {
      id: 2,
      title: "study Javascript",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(initData);
  const [inputValue, setInputValue] = useState("");
  const [activeId, setActiveId] = useState(null);

  const toggleCompleted = (id) => {
    const newArray = todos.map((todo) => {
      return id === todo.id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(newArray);
  };

  const handleDelete = (id) => {
    const newArray = todos.filter((todo) => id !== todo.id);
    setTodos(newArray);
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newArray = [
        ...todos,
        { id: Date.now(), title: inputValue, completed: false },
      ];
      setTodos(newArray);
      setInputValue("");
    }
  };

  const startEditing = (id, title) => {
    setActiveId(id);
    setInputValue(title);
  };

  const saveTodo = () => {
    if (inputValue.trim() !== "") {
      const newArray = todos.map((todo) => {
        return activeId === todo.id ? { ...todo, title: inputValue } : todo;
      });
      setTodos(newArray);
      setActiveId(null);
      setInputValue("");
    }
  };
  return (
    <div>
      <h2>My Todo App</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          marginBlock: "10px",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button className="reset" onClick={activeId ? saveTodo : addTodo}>
          {activeId ? <Save /> : <Plus />}
        </button>
      </div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <div
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </div>
          </div>

          <div>
            <button
              className="reset"
              onClick={() => startEditing(todo.id, todo.title)}
            >
              <Edit style={{ marginRight: "10px" }} />
            </button>
            <button className="reset" onClick={() => handleDelete(todo.id)}>
              <Trash2 color="red" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todos;
