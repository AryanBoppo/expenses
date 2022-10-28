import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Shoes',
        amount: 60,
        date: new Date('2022-12-10')
    },
    {
        id: 'e2',
        description: 'fruits',
        amount: 10,
        date: new Date('2022-12-11')
    },
    {
        id: 'e3',
        description: 'more shoes',
        amount: 80,
        date: new Date('2022-09-10')
    },
    {
        id: 'e4',
        description: 'books',
        amount: 50,
        date: new Date('2022-05-02')
    },
    {
        id: 'e5',
        description: 'Shoes',
        amount: 60,
        date: new Date('2022-12-10')
    },
    {
        id: 'e6',
        description: 'fruits',
        amount: 10,
        date: new Date('2022-12-11')
    },
    {
        id: 'e7',
        description: 'more shoes',
        amount: 80,
        date: new Date('2022-09-10')
    },
    {
        id: 'e8',
        description: 'books',
        amount: 50,
        date: new Date('2022-05-02')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date})=> {},
    deleteExpense: (id)=> {},
    updateExpense: (id, {description, amount, date})=> {}
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state]
        case 'UPDATE':
            const updatableExpenseindex = state.findIndex(
                (expense)=> expense.id === action.payload.id
                );
            const updatableExpense = state[updatableExpenseindex];
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseindex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(expense => expense.id!== action.payload);
            default:
                return state;
    }
}

function ExpensesContextProvider({children}){

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({ type: 'ADD', payload: expenseData })
    }

    function deleteExpense(id){
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateExpense(id, expenseData){
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData} })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
};

export default ExpensesContextProvider;