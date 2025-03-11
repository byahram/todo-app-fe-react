import React, { useRef } from "react";
import styled from "styled-components";
import { useTodoStore } from "../utils/zustand";
import { FaPlus } from "react-icons/fa";
import { CateItem } from "./CateItem";

const Category = () => {
  const addCateInputRef = useRef<HTMLInputElement>(null);
  const categories = useTodoStore((state) => state.categories);
  const addCategory = useTodoStore((state) => state.addCategory);

  const onSubmitAddCate = (e: React.FormEvent) => {
    e.preventDefault();

    const value = addCateInputRef.current?.value;
    if (!value || value === "") return;

    const newCategory = {
      id: Date.now(),
      name: value,
    };
    addCategory(newCategory);

    if (addCateInputRef.current) {
      addCateInputRef.current.value = "";
    }
  };

  return (
    <CateWrapper>
      <Title>Category</Title>

      {/* Category List */}
      <List>
        {categories.map((category) => (
          <CateItem key={category.id} category={category} />
        ))}
      </List>

      {/* Add Category */}
      <AddCateForm onSubmit={onSubmitAddCate}>
        <div>
          <FaPlus size={14} />
        </div>
        <Input type="text" ref={addCateInputRef} placeholder="Add Category" />
      </AddCateForm>
    </CateWrapper>
  );
};

export default Category;

const CateWrapper = styled.article`
  width: 23%;
  height: fit-content;
  padding: 1rem;
  background: #f1f3f5;
  border-right: 2px solid #dee2e6;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    width: calc(100% - 2rem);
    display: block;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #343a40;
  padding-bottom: 8px;
  border-bottom: 2px solid #ced4da;

  @media (max-width: 1024px) {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const AddCateForm = styled.form`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 5px;
  opacity: 0.7;

  &:hover,
  &:focus-within {
    opacity: 1;
    background-color: #e0e0e0;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    width: max-content;
    margin-top: 0.5rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  flex: 1;
  margin-left: 6px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
    width: auto;
    flex: none;
    font-size: 0.8rem;
  }
`;
