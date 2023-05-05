import { ChangeEvent, useEffect, useState } from 'react';
import { Expense, Category } from '../entities';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    onSubmit: (expense: Expense) => void
}

const formSchema = z.object({
    description: z.string({invalid_type_error: 'Item description is required.'})
        .min(3, { message: 'Description must be at least 3 characters long.' }),
    amount: z.number().min(1, { message: 'The minimum amount required is 1.' }),
    category: z.string().nonempty('Category is required.')

});

type FormData = z.infer<typeof formSchema>;

const Form = ({ onSubmit }: Props) => {
    const [expense, setExpense] = useState<Expense>({
        description: '',
        amount: 0,
        price: 1,
        category: '',
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
            amount: 0,
            category: '',
        }
    });

    // dummy prices.
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

    useEffect(() => {
        // It's recommended to reset in useEffect as execution order matters
        if (isSubmitSuccessful) {
            reset({
                description: '',
                amount: 0,
                category: '',
            });
        }

    }, [isSubmitSuccessful]);

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
            } else if (id === 'amount' && typeof Number(value) === 'number') {
                setExpense({
                    ...expense,
                    [id]: Number(value),
                    price: Number(value) * setPrice(expense.category)
                });
            } else {
                setExpense({
                    ...expense,
                    [id]: id === 'amount' || id === 'price' ? Number(value) : value
                });
            }
        }
    }

    const onSubmitHandle = () => onSubmit(expense);

    return (
        <div className='d-flex flex-column'>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='mt-5' >
                <div className="form-floating mb-3">
                    <input
                        {...register('description', { required: true, minLength: 1 })}
                        onChange={handleInput}
                        id='description'
                        type="text"
                        className="form-control"
                        placeholder='description'
                        autoComplete='off'
                    />
                    <label htmlFor="description">Description</label>
                    {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type='number'
                        {...register('amount', { required: true, valueAsNumber: true })}
                        onChange={handleInput}
                        id='amount'
                        className="form-control"
                        placeholder='amount'
                        autoComplete='off'
                    />
                    <label htmlFor="description">Amount</label>
                    {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
                </div>

                <select
                    id='category'
                    className="form-select"
                    aria-label="Category selection."
                    {...register('category', { required: true })}
                    onChange={handleInput}
                >
                    <option></option>
                    <option>Groceries</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                </select>
                {errors.category && <p className='text-danger'>{errors.category.message}</p>}
                <button className='btn btn-primary mt-3' type='submit' role='button'>Submit</button>
            </form>
        </div>
    )
}

export default Form