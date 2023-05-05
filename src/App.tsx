import Form from './components/Form'
import './App.css'
import { useEffect, useState } from 'react'
import { Expense } from './entities';
import ExpenseDisplay from './components/ExpenseDisplay';

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesCopy, setExpensesCopy] = useState<Expense[]>([]);
  
  const handleSubmit = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    setExpensesCopy([...expenses, expense]);
  };
  
  const onDelete = (id: number) => {
    setExpenses(expenses.filter(e => e != expenses[id]));
    setExpensesCopy(expenses.filter(e => e != expenses[id]));
  }
  
  const onFilterCategory = (category: string) => {
    if (expensesCopy.length < expenses.length)
      setExpensesCopy(prev => [...expenses, ...prev]);

    if (category !== '')
      setExpensesCopy(prev => prev.filter(e => e.category === category));
    else
      setExpensesCopy([...expenses]);
  }

  return (
    <div className="App">
      <h1>Expense tracker</h1>
      <Form onSubmit={handleSubmit}/>
      <ExpenseDisplay 
        expenses={expensesCopy} 
        onDelete={onDelete}
        onFilter={onFilterCategory}
      />
    </div>
  )
}

export default App;