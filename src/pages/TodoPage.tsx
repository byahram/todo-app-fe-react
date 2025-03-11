import React from "react";
import styled from "styled-components";
import Category from "../components/Category";
import TodoCont from "../components/TodoCont";

const TodoPage: React.FC = () => {
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
