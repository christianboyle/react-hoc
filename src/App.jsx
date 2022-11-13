import * as React from 'react'
import './App.css'

const TODOS = [
  { id: '1', task: 'Do this', completed: true },
  { id: '2', task: 'Do that', completed: false }
]

const fetchData = () => {
  // return { data: null, isLoading: true }
  // return { data: [] }
  // return { data: null }
  return { data: TODOS }
}

const withConditionalFeedback = (Component) => (props) => {
  if (props.isLoading) return <div>Loading data.</div>
  if (!props.data) return <div>No data loaded yet.</div>
  if (!props.data.length) return <div>Data is empty.</div>

  return <Component {...props} />
}

const App = () => {
  const { data, isLoading } = fetchData()

  return <TodoList data={data} isLoading={isLoading} />
}

const BaseTodoList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

const TodoItem = ({ item }) => {
  return (
    <li>
      {item.task} {item.completed.toString()}
    </li>
  )
}

const TodoList = withConditionalFeedback(BaseTodoList)

export default App
