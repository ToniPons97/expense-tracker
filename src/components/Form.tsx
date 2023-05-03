import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { Expense, Category } from '../entities';

interface Props {
    onSubmit: (expense: Expense) => void
}

const Form = ({ onSubmit }: Props) => {
    const [expense, setExpense] = useState<Expense>({
        description: '',
        amount: 1,
        price: 1,
        category: '',
    });

    useEffect(() => {
        console.log(expense);
    }, [expense]);

    
    const setPrice = (category: string) => {
        switch (category) {
            case 'Groceries':
                return 2;
            case 'Utilities':
                return 3;
            case 'Entertainment':
                return 4;
            default:
                return 1;
        }
    }

    const handleInput = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (ev.target) {
            const { id, value } = ev.target;

            if (id === 'category') {
                let category = id as Category;
                setExpense({
                    ...expense,
                    [category]: value,
                    price: setPrice(value) * expense.amount
                });
            } else if (id === 'amount') {
                setExpense({
                    ...expense,
                    [id]: Number(value),
                    price: Number(value) * setPrice(expense.category)
                });
            } 
            
            else  {
                setExpense({
                    ...expense,
                    [id]: id === 'amount' || id === 'price' ?  Number(value) : value
                });
            }



        }
    }

    useEffect(() => {console.log(expense)}, [expense]);


    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit(expense);
        setExpense({ description: '', amount: 1, category: '', price: 0 });
    }

    return (
        <div className='d-flex flex-column'>
            <form onSubmit={handleSubmit} className='mt-5' >
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInput}
                        id='description'
                        type="text"
                        className="form-control"
                        placeholder='description'
                        value={expense.description}
                    />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleInput}
                        id='amount'
                        type="number"
                        className="form-control"
                        placeholder='amount'
                        value={expense.amount}
                    />
                    <label htmlFor="description">Amount</label>
                </div>
                <select
                    onChange={handleInput}
                    value={expense.category}
                    id='category'
                    className="form-select"
                    aria-label="Category selection."
                >
                    <option></option>
                    <option>Groceries</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                </select>
                {/* Align self and other flex properties not working as intended? */}
                <button className='btn btn-primary mt-3 align-self-start' type='submit' role='button'>Submit</button>
            </form>
        </div>
    )
}

export default Form