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

const withConditionalFeedback =
  ({ loadingFeedback, noDataFeedback, dataEmptyFeedback }) =>
  (Component) =>
  (props) => {
    if (props.isLoading) return <div>{loadingFeedback || 'Loading data.'}</div>
    if (!props.data) return <div>{noDataFeedback || 'No data loaded yet.'}</div>
    if (!props.data.length)
      return <div>{dataEmptyFeedback || 'Data is empty.'}</div>

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

const TodoList = withConditionalFeedback({
  loadingFeedback: 'Loading Todos.',
  noDataFeedback: 'No Todos loaded yet.',
  dataEmptyFeedback: 'Todos are empty.'
})(BaseTodoList)

export default App
