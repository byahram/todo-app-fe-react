import React, { useState } from "react";
import styled from "styled-components";
import { useTodoStore } from "../utils/zustand";

const TodoCont = () => {
  const { selectedCategory, todos, addTodo } = useTodoStore();
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const status = ["all", "todo", "doing", "done", "pending"];
  const newId =
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTodo();
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: newId,
      categoryId: selectedCategory?.id || 1,
      title: inputValue,
      status: "todo",
    };

    console.log("newTodo :: ", newTodo);

    addTodo(newTodo);
    setInputValue("");
  };

  const handleEditTodo = (id, title) => {
    setEditingId(id);
    setEditingValue(title);
  };

  const handleSaveEdit = (id) => {
    if (editingValue.trim() === "") return;

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editingValue } : todo
    );

    useTodoStore.setState({ todos: updatedTodos });
    setEditingId(null);
  };

  return (
    <TodoWrapper>
      {/* Todo Input */}
      <InputWrapper>
        <InputBox
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Create a new task for ${selectedCategory?.name}'s To-Do List`}
        />
        <AddButton onClick={handleAddTodo}>Save</AddButton>
      </InputWrapper>

      {/* Filtered Btns */}
      <FilterWrapper>
        {status.map((status) => (
          <FilterButton
            key={status}
            active={filter === status}
            onClick={() => setFilter(status)}
          >
            {status.toUpperCase()}
          </FilterButton>
        ))}
      </FilterWrapper>

      <TodoList>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id}>
            <TodoCheckbox type="checkbox" />
            {editingId === todo.id ? (
              <TodoEditInput
                type="text"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={() => handleSaveEdit(todo.id)}
                autoFocus
              />
            ) : (
              <TodoText onClick={() => handleEditTodo(todo.id, todo.title)}>
                {todo.title}
              </TodoText>
            )}
          </TodoItem>
        ))}
      </TodoList>

      {/* {showModal && (
    <Modal
      newCategoryValue={newCategoryValue}
      setNewCategoryValue={setNewCategoryValue}
      handleCloseModal={handleCloseModal}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  )} */}
    </TodoWrapper>
  );
};

export default TodoCont;

const TodoWrapper = styled.article`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
  height: 2.8rem;
`;

const InputBox = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background: #9aa6b2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #707881;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0.5rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#121619" : "#e0e0e0")};
  color: white;
  font-size: 0.8rem;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 8px;
  max-height: 72vh;
  overflow-y: auto;

  /* 스크롤 커스텀 */
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* 스크롤바 배경 */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb; /* 스크롤 핸들 색상 */
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #888; /* 호버 시 색상 변경 */
  }
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
`;

const TodoCheckbox = styled.input`
  cursor: pointer;
`;

const TodoText = styled.span`
  flex: 1;
  cursor: pointer;
`;

const TodoEditInput = styled.input`
  flex: 1;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
