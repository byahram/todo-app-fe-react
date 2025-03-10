import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useTodoStore } from "../utils/zustand";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const currentUser = useTodoStore((state) => state.currentUser);
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
