import { Text } from 'components';
import { FormTodos } from '../components/FormTodos/FormTodos';
import { useEffect, useState } from 'react';
import { TodoList } from 'components';

export const Todos = () => {
  const getTodosStorage = () => {
    const todosStorage = window.localStorage.getItem('todos');
    return todosStorage !== null ? JSON.parse(todosStorage) : [];
  };

  const [todos, setTodos] = useState(getTodosStorage);

  const onSubmit = newTodo => {
    setTodos(prevTodo => [...prevTodo, newTodo]);
  };

  const updateTodos = updatedTodo => {
    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );
    });
  };

  const deleteTodo = todoId => {
    setTodos(prevTodo => {
      return prevTodo.filter(todo => todo.id != todoId);
    });
  };

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <FormTodos onSubmit={onSubmit} />
      {todos.length === 0 && (
        <Text textAlign="center">There are no any todos ...</Text>
      )}

      {todos.length > 0 && (
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          updateTodos={updateTodos}
        />
      )}
    </>
  );
};
