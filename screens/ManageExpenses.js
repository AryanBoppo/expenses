import { Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { GlobalStyles } from '../constants/styles'
// import Buttons from '../components/UI/Buttons'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { storeExpense } from '../util/http'

const ManageExpenses = ({route, navigation}) => {

  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense)=> expense.id === editedExpenseId
  )

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler(){
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
  }

  function cancelHandler(){
    navigation.goBack()
  }

  function confirmHandler(expenseData){
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId, expenseData)
    } else{
      // storeExpense(expenseData)
      expensesCtx.addExpense(expenseData)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update':'Add'} 
        onSubmit = {confirmHandler}
        onCancel={cancelHandler} 
        defaultValues = {selectedExpense}
      />
      {isEditing && (
      <View style={styles.deleteContainer}>
        <Button
         color={GlobalStyles.colors.primary500} 
         title="Delete" onPress={deleteExpenseHandler}
         />
      </View>
      )}
    </View>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})