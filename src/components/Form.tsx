import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { Expense } from '../entities';


const Form = () => {
    const [expense, setExpense] = useState<Expense>({
        description: '',
        amount: 0,
        category: 'Groceries'
    });

    const handleInput = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (ev.target) {
            const { id } = ev.target;
            console.log(ev.target?.value);

            setExpense({...expense, [id]: ev.target.value});

        }
    }


    const handleSubmit = (ev: MouseEvent) => {
        ev.preventDefault();
        console.log(expense);
    }
    return (
        <div className='d-flex flex-column'>
            <form className='mt-5' >
                <div className="form-floating mb-3">
                    <input onChange={handleInput} id='description' type="text" className="form-control" placeholder='description' />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleInput} id='amount' type="number" className="form-control" placeholder='amount' />
                    <label htmlFor="description">Amount</label>
                </div>
                <select onChange={handleInput} defaultValue='' id='category' className="form-select" aria-label="Category selection.">
                    <option>Groceries</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                </select>
                {/* Align self and other flex properties not working as intended? */}
                <button onClick={handleSubmit} className='btn btn-primary mt-3 align-self-start' type='submit' role='button'>Submit</button>
            </form>
        </div>
    )
}

export default Form