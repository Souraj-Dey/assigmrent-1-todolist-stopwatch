import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const addTodo = () => {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), title: task, completed: false }
    ]);
    setTask("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            My Tasks
          </h2>
          <p className="text-sm text-gray-500">
            Stay organized and productive
          </p>
        </div>

        {/* Input */}
        <div className="p-6 flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                       hover:bg-blue-700 active:scale-95 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="px-6 pb-6 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between 
                         bg-gray-50 border border-gray-200 
                         rounded-lg px-4 py-3 
                         hover:shadow-sm transition"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer select-none ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>

              <button
                onClick={() => removeTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
