import React, { useEffect, useState } from "react";
import styles from "./Datalist.module.css";

export default function DataList({ data, setData }) {
  const [previousData, setPreviousData] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (previousData.length === 0 && data.length > 0) setPreviousData(data);
  }, [data, previousData]);
  function handleApply() {
    if (isChanged) {
      setTimeout(() => {
        setPreviousData(data);
        setIsChanged(false);
      }, 1000);
    }
  }
  function handleCancel() {
    setData(previousData);
    setIsChanged(false);
  }
  function handleCheckBoxClick(id) {
    let updatedArr = data.map((item) => {
      if (item.id === id) {
        console.log("before", { item });

        return { ...item, status: "true" };
      }
      console.log("after", { item });
      return item;
    });
    setData(updatedArr);
    setIsChanged(true);
  }
  return (
    <div className={styles.listItems}>
      <h1>TODO LIST</h1>
      <div className={styles.outerDiv}>
        {data
          .filter((item) => item.status === "false")
          .map((val) => {
            return (
              <div key={val.id} className={styles.listStyle}>
                <input
                  type="checkbox"
                  id={val.id}
                  value={val.id}
                  onChange={() => {
                    console.log("clicked");
                    handleCheckBoxClick(val.id);
                  }}
                  checked={val.status === "true"}
                ></input>
                <ul className={styles.text}>{val.text}</ul>
                <button
                  className={styles.button}
                  onClick={() => {
                    let newArr = data.filter((item) => item.id !== val.id);
                    setData(newArr);
                    setIsChanged(true);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
      <h1>COMPLETED ITEMS</h1>
      {data
        .filter((item) => item.status === "true") //make it boolean
        .map((item) => {
          return (
            <div key={item.id} className={styles.listStyle}>
              <input type="checkbox" checked={true} readOnly></input>
              <ul>{item.text}</ul>
            </div>
          );
        })}
      <button onClick={handleCancel} disabled={!isChanged}>
        Cancel
      </button>
      <button onClick={handleApply} disabled={!isChanged}>
        Apply
      </button>
    </div>
  );
}
