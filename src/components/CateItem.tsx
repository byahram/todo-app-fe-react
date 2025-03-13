import React, { useState } from "react";
import styled from "styled-components";
import { FaListUl } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import { useTodoStore } from "../utils/zustand";
import { useModal } from "../hooks/useModal";
import { useHover } from "../hooks/useHover";
import { Modal } from "./Modal";

interface Category {
  id: number;
  name: string;
}

interface CateItemProps {
  category: Category;
}

export const CateItem: React.FC<CateItemProps> = ({ category }) => {
  const {
    updateCategory,
    deleteCategory,
    setSelectedCategory,
    selectedCategory,
  } = useTodoStore();
  const [newCategoryValue, setNewCategoryValue] = useState(category.name);
  const { showModal, handleShowModal, handleCloseModal } = useModal();
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  const handleSelectCategory = () => {
    setSelectedCategory(category);
  };

  const handleEdit = () => {
    updateCategory(category.id, newCategoryValue);
    setSelectedCategory({ ...category, name: newCategoryValue });
    handleCloseModal();
  };

  const handleDelete = () => {
    deleteCategory(category.id);

    const updatedCategories = useTodoStore.getState().categories;
    if (updatedCategories.length > 0) {
      setSelectedCategory(updatedCategories[0]);
    } else {
      setSelectedCategory(null);
    }

    handleCloseModal();
  };

  return (
    <CateItemWrapper>
      <CategoryItem
        selected={selectedCategory?.id === category.id}
        onClick={handleSelectCategory}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <FaListUl size={14} />
          <p>{category.name}</p>
        </div>
        {isHovered && <MdMoreVert onClick={handleShowModal} />}
      </CategoryItem>

      {showModal && (
        <Modal
          newCategoryValue={newCategoryValue}
          setNewCategoryValue={setNewCategoryValue}
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </CateItemWrapper>
  );
};

const CateItemWrapper = styled.li`
  position: relative;
  list-style-type: none;
  /* margin-bottom: 10px; */
`;

const CategoryItem = styled.div<{ selected?: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#e0e0e0" : "transparent")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;
  z-index: 1;

  &:hover {
    background-color: #e0e0e0;
  }

  > div {
    display: flex;
    align-items: center;
    p {
      margin-left: 6px;
    }
  }

  @media (max-width: 1024px) {
    > div {
      p {
        margin-right: 12px;
        font-size: 0.9rem;
      }
    }
  }
`;
