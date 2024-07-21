import React, { useState, useEffect } from "react";
import { mockData } from "../../mockdata";
import styles from "./RenderData.module.css";
import Datalist from "../Datalist/Datalist";

export default function RenderData() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        //add loading state
        resolve(mockData.todos);
      }, 200);
    });
    fetchData.then((value) => {
      setData(value);
    });
  }, []);
  function handleAddTodo(event) {
    event.preventDefault();
    let task = data;
    let len = data.length;
    let newTodo = { id: len + 1, text: text, status: "false" };
    task.push(newTodo);
    setData(task);
    setText("");
  }
  return (
    <div className={styles.form}>
      <form>
        <input
          type="text"
          placeholder="add task"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></input>
        <button onClick={handleAddTodo}>Add</button>
      </form>
      <Datalist data={data} setData={setData} />
    </div>
  );
}
