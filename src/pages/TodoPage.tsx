import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../components/Category";
import TodoCont from "../components/TodoCont";
import { useTodoStore } from "../utils/zustand";
import api from "../utils/api";

const TodoPage: React.FC = () => {
  const [error, setError] = useState("");
  const { categories, todos, setCategories, setTodos } = useTodoStore();

  useEffect(() => {
    fetchCategories();
    fetchTodos();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories/getAll");
      setCategories(response.data.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? "Error fetching categories: " + error.message
          : "An unexpected error occurred"
      );
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await api.get("/tasks/getAll");
      setTodos(response.data.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? "Error fetching todos: " + error.message
          : "An unexpected error occurred"
      );
    }
  };

  return (
    <Wrapper>
      <Category />
      <TodoCont />
    </Wrapper>
  );
};

export default TodoPage;

const Wrapper = styled.section`
  display: flex;
  gap: 2rem;
  height: 100%;
  padding: 3rem 0;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
