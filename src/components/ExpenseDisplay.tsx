import { ChangeEvent, ReactNode } from "react";
import { Expense } from "../entities";

interface Props {
    expenses: Expense[];
    onDelete: (id: number) => void;
    onFilter: (category: string) => void;
}

const ExpenseDisplay = ({ expenses, onDelete, onFilter }: Props) => {

    const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        if (ev.target)
            onFilter(ev.target.value);
    }

    return (
        <div className='mt-3'>
            <select
                onChange={handleChange}
                id='category'
                className="form-select mb-3"
                aria-label="Category filter"
            >
                <option></option>
                <option>Groceries</option>
                <option>Utilities</option>
                <option>Entertainment</option>
            </select>
            {
                expenses.length > 0 &&
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{e.description}</td>
                                        <td>{e.amount}</td>
                                        <td>${e.price}</td>
                                        <td>{e.category}</td>
                                        <td>
                                            <button onClick={() => onDelete(i)} className="btn btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <td></td>
                            <td>${400}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            }
            {!expenses.length && <p className="text-danger">No expenses</p>}
        </div>
    );
}

export default ExpenseDisplay;