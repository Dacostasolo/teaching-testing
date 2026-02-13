import './App.css'
import { Counter } from './components/Counter/Counter'
import { SearchForm } from './components/SearchForm'
import { UserList } from './components/UserList'

function App() {
  const handleSearch = (query: string, filters: { category: string; includeArchived: boolean }) => {
    console.log('Search submitted:', query, filters)
  }

  const handleCountChange = (count: number) => {
    console.log('Count changed to:', count)
  }

  return (
    <div className="App center">
      <h1>React Testing 101</h1>
      <p>A comprehensive testing playground with various components</p>

      <div >
        <Counter initialCount={0} step={1} onCountChange={handleCountChange} />

        <SearchForm onSearch={handleSearch} minLength={3} />

        <UserList />
      </div>
    </div>
  )
}

export default App
