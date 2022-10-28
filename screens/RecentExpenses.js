import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { fetchExpense } from '../util/http';

function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

const RecentExpenses = () => {

    const expensesCtx = useContext(ExpensesContext);

    // useEffect(()=>{
    //   async function getExpenses(){
    //     const expenses = await fetchExpense()
    //   }

    //   getExpenses();
    // }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense)=> {
        const today = new Date()
        const date7ago = getDateMinusDays(today, 7)

        return expense.date > date7ago;
    })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No expenses yet."/>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})