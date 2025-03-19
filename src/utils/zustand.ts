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
  status: "todo" | "doing" | "done";
}

interface TodoStoreProps {
  isDark: boolean;
  users: User[];
  categories: Category[];
  todos: Todo[];
  sort: "new" | "old";
  filter: "all" | "todo" | "doing" | "done";
  selectedCategory: Category | null;
  currentUser: User | null;

  // users
  addUser: (user: User) => void;
  setCurrentUser: (user: User | null) => void;
  logoutUser: () => void;

  // categories
  setCategories: (categories: Category[]) => void;
  addCategory: (newCategory: Category) => void;
  updateCategory: (id: number, newName: string) => void;
  deleteCategory: (id: number) => void;
  setSelectedCategory: (category: Category | null) => void;

  // todos
  setTodos: (todos: Todo[]) => void;
  addTodo: (task: Todo) => void;
  updateTodoText: (id: number, newTitle: string) => void;
  updateTodoStatus: (id: number, newStatus: Todo["status"]) => void;
  deleteTodo: (id: number) => void;

  // reset
  resetStore: () => void;
}

export const useTodoStore = create<TodoStoreProps>()(
  persist(
    (set) => ({
      isDark: false,
      users: [],
      categories: [],
      todos: [],
      sort: "new",
      filter: "all",
      selectedCategory: null,
      currentUser: null,

      // users
      addUser: (user: User) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      setCurrentUser: (user: User | null) => set({ currentUser: user }),
      logoutUser: () => {
        sessionStorage.removeItem("token");
        set({ currentUser: null });
      },

      // categories
      setCategories: (categories: Category[]) => set({ categories }),
      addCategory: (newCategory: Category) =>
        set((state) => {
          const newCategories = [...state.categories, newCategory];
          return {
            categories: newCategories,
            selectedCategory: newCategories[0],
          };
        }),
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
      setTodos: (todos: Todo[]) => set({ todos }),
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

      // reset
      resetStore: () => {
        localStorage.removeItem("react-todoapp");
        sessionStorage.removeItem("token");

        set({
          isDark: false,
          users: [],
          categories: [],
          todos: [],
          sort: "new",
          filter: "all",
          selectedCategory: null,
          currentUser: null,
        });
      },
    }),
    {
      name: "react-todoapp",
    }
  )
);
