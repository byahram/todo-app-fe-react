import React from "react";
import styled from "styled-components";
import { ThemeBtn } from "./ThemeBtn";
import { Link } from "react-router-dom";
import { useTodoStore } from "../utils/zustand";

export const Header: React.FC = () => {
  const currentUser = useTodoStore((state) => state.currentUser);

  return (
    <HeaderContainer>
      <HeaderInner>
        <TitleTxt>{currentUser?.name + `'s Todo`}</TitleTxt>
        <LeftWrap>
          <StyledLink to={currentUser ? "/register" : "/login"}>
            {currentUser ? "Logout" : "Sign In"}
          </StyledLink>
          <ThemeBtn />
        </LeftWrap>
      </HeaderInner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 4.5rem;
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.1);
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  color: #333;
  align-items: center;
  max-width: 1024px;
  width: auto;
  height: 100%;
  padding: 0 2rem;
  margin: 0 auto;
  text-align: center;
`;

const TitleTxt = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
`;

const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #121619;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
