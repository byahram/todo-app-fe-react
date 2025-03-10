import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Category {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  categoryId: number;
  title: string;
  status: "todo" | "doing" | "done" | "pending";
}

interface TodoStoreProps {
  isDark: boolean;
  users: User[];
  categories: Category[];
  todos: Todo[];
  sort: "new" | "old";
  filter: "all" | "todo" | "doing" | "done" | "pending";
  selectedCategory: Category | null;
  currentUser: User | null;

  // users
  getUsersList: () => User[];
  getUserDetail: (id: string) => User | undefined;
  addUser: (user: User) => void;
  setCurrentUser: (user: User | null) => void;
  logoutUser: () => void;

  // categories
  addCategory: (newCategory: Category) => void;
  updateCategory: (id: number, newName: string) => void;
  deleteCategory: (id: number) => void;
  setSelectedCategory: (category: Category | null) => void;

  // todos
  addTodo: (task: Todo) => void;
  updateTodoText: (id: number, newTitle: string) => void;
  updateTodoStatus: (id: number, newStatus: Todo["status"]) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStoreProps>()(
  persist(
    (set, get) => ({
      isDark: false,
      users: [],
      categories: [{ id: 1, name: "Category1" }],
      todos: [],
      sort: "new",
      filter: "all",
      selectedCategory: { id: 1, name: "Category1" },
      currentUser: null,

      // users
      getUsersList: () => {
        return get().users;
      },
      getUserDetail: (id: string) => {
        return get().users.find((user) => user.id === id);
      },
      addUser: (user: User) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      setCurrentUser: (user: User | null) => set({ currentUser: user }),
      logoutUser: () => set({ currentUser: null }),

      // categories
      getCategories: () => {
        return get().categories;
      },
      getCategory: (id: number) => {
        return get().categories.find((category) => category.id === id);
      },
      addCategory: (newCategory: Category) =>
        set((state) => ({
          categories: [...state.categories, newCategory],
        })),
      updateCategory: (id: number, newName: string) =>
        set((state) => ({
          categories: state.categories.map((cate) =>
            cate.id === id ? { ...cate, name: newName } : cate
          ),
        })),

      deleteCategory: (id: number) =>
        set((state) => ({
          categories: state.categories.filter((cate) => cate.id !== id),
        })),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      // todos
      addTodo: (todo: Todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),
      updateTodoText: (id: number, newTitle: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          ),
        })),
      updateTodoStatus: (id: number, newStatus: Todo["status"]) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status: newStatus } : todo
          ),
        })),
      deleteTodo: (id: number) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: "react-todoapp",
    }
  )
);
