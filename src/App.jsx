import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // 状態管理定義 stateの値に変更を感知するとreactではレンダリングが発生する
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // ロジック群
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 追加
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  // 削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  // 完了
  const onClickComplete = (index) => {
    // 未完了を削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    // 完了に追加
    const addTodo = incompleteTodos[index];
    const newCompleteTodos = [...completeTodos, addTodo];
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    // 完了から削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    // 未完了に追加
    const backTodo = completeTodos[index];
    const newIncompleteTodos = [...incompleteTodos, backTodo];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      {/* input入力エリア */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />

      {/* todo未完了 */}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      {/* todo完了 */}
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
