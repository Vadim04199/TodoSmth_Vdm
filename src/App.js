import React, {useEffect, useState} from 'react'
import TodoList from './TodoList'

export default function App () {
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')
    const handleClick = () => console.log('click')
// подключение проверки энтера
    useEffect(() => {
        const raw = localStorage.getItem('todos') || JSON.stringify([])
            setTodos(JSON.parse(raw))
        },
        [])
    useEffect(() => {
        document.addEventListener('click', handleClick)
        localStorage.setItem('todos', JSON.stringify(todos))
        return() => {
            document.removeEventListener('click', handleClick)
        }
    }, [todoTitle])
const addTodo = event => {
     // активация возможности использовать энтер
       if (event.key === 'Enter') {
           setTodos([
               ...todos,
               {
                   id: Date.now(),
                   title: todoTitle,
                   completed: false
               }
           ])
               //для очистки интупа от стейт
           setTodoTitle('')
    }
}
    return (
      <div className="container">
        <h1><em>Список задач</em></h1>

          <div className="input-field">
            <input type="text"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onKeyPress={addTodo} //после нажатия на ентер добавить тудушку
            />
            <label>Ваши задачи введите здесь...</label>

          </div>

          <TodoList todos={todos} />
          <p>
              <h6>
                  Create by tvs
              </h6>
          </p>
          <p>
              Контакты:
              <li>
                 Телефон: 8(800) 555 35 35
              </li>
              <li>
                  <a href="https://t.me/Vadim_0411" target="_blank">Телеграм</a>
              </li>
          </p>
      </div>
    );
}
