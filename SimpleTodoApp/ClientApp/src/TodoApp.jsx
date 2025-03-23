import { useState, useEffect } from 'react'
import axios from 'axios'

function TodoApp() {
  const [todoItems, setTodoItems] = useState([])
  const [inputText, setInputText] = useState('')

  // Fetch todo items on component mount
  useEffect(() => {
    getData()
  }, [])

  // Get all todo items from API
  const getData = async () => {
    const response = await axios.get('/todo')
    setTodoItems(response.data)
  }

  // Create a new todo item
  const createTodoItem = async () => {
    if (!inputText) return
    
    const todoItem = { text: inputText }
    await axios.post('/todo', todoItem)
    setInputText('')
    await getData()
  }

  // Mark a todo item as done
  const registerDone = async (id) => {
    await axios.put(`/todo/${id}`)
    await getData()
  }

  // Delete a todo item
  const deleteTodoItem = async (id) => {
    await axios.delete(`/todo/${id}`)
    await getData()
  }

  return (
    <div>
      <h1>Todo App</h1>
      
      <ul>
        {todoItems.map((todoItem) => (
          <li key={todoItem.id}>
            {todoItem.text}
            {todoItem.done == null ? (
              <button onClick={() => registerDone(todoItem.id)}>
                registrer gjort
              </button>
            ) : (
              <span>
                gjort {new Date(todoItem.done).toLocaleDateString()}
              </span>
            )}
            <button onClick={() => deleteTodoItem(todoItem.id)}>x</button>
          </li>
        ))}
      </ul>
      
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={createTodoItem}>Lag ny</button>
      </div>
    </div>
  )
}

export default TodoApp