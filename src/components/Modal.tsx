import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

interface ModalProps {
  newCategoryValue: string;
  setNewCategoryValue: (value: string) => void;
  handleCloseModal: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  newCategoryValue,
  setNewCategoryValue,
  handleCloseModal,
  handleDelete,
  handleEdit,
}) => {
  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>카테고리 수정</Title>
          <CloseButton onClick={handleCloseModal}>
            <MdClose size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalInput
          type="text"
          value={newCategoryValue}
          onChange={(e) => setNewCategoryValue(e.target.value)}
        />
        <ButtonGroup>
          <ModalButton danger onClick={handleDelete}>
            삭제
          </ModalButton>
          <ModalButton onClick={handleEdit}>수정</ModalButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #504b38;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #504b38;
  cursor: pointer;
  padding: 0;
`;

const ModalInput = styled.input`
  width: calc(100% - 18px);
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  > * {
    width: 100%;
  }
`;

const ModalButton = styled.button<{ danger?: boolean }>`
  padding: 10px 15px;
  background-color: ${(props) => (props.danger ? "#292929cf" : "#a1a1a184")};
  color: ${(props) => (props.danger ? "#F8F3D9" : "#504B38")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? "#908a6b" : "#F8F3D9")};
  }
`;
