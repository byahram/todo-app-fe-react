import React, { useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  status: "open" | "in progress" | "done";
};

const todos: Todo[] = [
  {
    id: 1,
    title: "Complete project",
    description: "Finish the React project for the client.",
    dueDate: "2024-12-20",
    category: "Work",
    status: "open",
  },
  {
    id: 2,
    title: "Grocery shopping",
    description: "Buy vegetables, fruits, and milk.",
    dueDate: "2024-12-17",
    category: "Personal",
    status: "in progress",
  },
  {
    id: 3,
    title: "Workout",
    description: "Go for a morning run and stretch exercises.",
    dueDate: "2024-12-18",
    category: "Health",
    status: "done",
  },
];

export const TodoPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    "open" | "in progress" | "done"
  >("open");

  const filteredTodos = todos.filter((todo) => todo.status === selectedStatus);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex justify-around mb-6">
        {(["open", "in progress", "done"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedStatus === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status.replace(/\b\w/g, (char) => char.toUpperCase())}
          </button>
        ))}
      </div>

      <ul className="space-y-4">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-bold">{todo.title}</h3>
              <p className="text-gray-700 mb-1">{todo.description}</p>
              <p className="text-sm text-gray-500">Due: {todo.dueDate}</p>
              <p className="text-sm text-gray-500">Category: {todo.category}</p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  todo.status === "done"
                    ? "text-green-500"
                    : todo.status === "in progress"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              >
                Status: {todo.status}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No todos with the selected status.
        </p>
      )}
    </div>
  );
};
