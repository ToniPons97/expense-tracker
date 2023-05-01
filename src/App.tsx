import Form from './components/Form'
import './App.css'
import { useState } from 'react'
import { Expense } from './entities';



function App() {

  const [expenses, setExpenses] = useState<Expense[]>([]);



  return (
    <div className="App">
      <h1>Expense tracker</h1>
      <Form />
    </div>
  )
}

export default App
