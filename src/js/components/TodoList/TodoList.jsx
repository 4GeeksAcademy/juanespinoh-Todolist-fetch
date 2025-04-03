import React, { useEffect, useState } from "react";
import "./TodoListStyles.css";

const TodoContainer = ({ todoText, index, setList }) => {
  const [showButton, setShowButton] = useState(false);

  const deleteHandler = () => {
    setList((prev) => prev.filter((e) => e.id !== index));
  };

  const showButtonHandler = () => setShowButton((prev) => !prev);
  return (
    <div
      className="todoContainer "
      onMouseEnter={showButtonHandler}
      onMouseLeave={showButtonHandler}
    >
      <p className="m-0">{todoText}</p>
      {showButton && (
        <button onClick={deleteHandler} className="btn btn-danger deleteButton ">
          X
        </button>
      )}
    </div>
  );
};

const TodoList = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState({ id: 0, text: "" });

  const changeHandler = (e) => {
    setText({ id: list.length + 1, text: e.target.value });
  };

  const addTaskHandler = (e) => {
    if (e.key === "Enter") {
      if (text.text !== "") {
        setList((prev) => [...prev, text]);
        setText({ id: 0, text: "" });
      }
    }
    return;
  };
  return (
    <div className="mainContainer">
      <input
        type="text"
        onKeyDown={addTaskHandler}
        onChange={changeHandler}
        value={text.text}
        placeholder="Write and press enter to add to list."
        className="p-2"
      />

      {list.length !== 0 ? (
        <div className="listContainer ">
          {list.map((elemnt, i) => (
            <TodoContainer
              key={i}
              todoText={elemnt.text}
              index={elemnt.id}
              setList={setList}
            />
          ))}
        </div>
      ) : (
        <p className="m-0">No tasks, add a task</p>
      )}
      <div className="align-self-start p-2 ">
        {`${list.length} ${list.length === 1 ? "item" : "items"} `}
      </div>
    </div>
  );
};

export default TodoList;
