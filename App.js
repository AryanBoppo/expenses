import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ManageExpenses from './screens/ManageExpenses'
import RecentExpenses from './screens/RecentExpenses'
import AllExpenses from './screens/AllExpenses'
import { GlobalStyles } from './constants/styles'
import IconButton from './components/UI/IconButton'
import ExpensesContextProvider from './store/expenses-context'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpensesOverview(){
  return <BottomTabs.Navigator screenOptions={({navigation})=> ({
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: () => <IconButton onPress={()=>{navigation.navigate('ManageExpense')}}/>

  })}>
    <BottomTabs.Screen 
      name="RecentExpenses"
       component={RecentExpenses} 
       options={{
        title: "Recent Expenses",
        tabBarLabel: 'Recent',
        tabBarIcon: ()=> <Text>'⌛'</Text>
       }}
       />
    <BottomTabs.Screen 
      name="AllExpenses" 
      component={AllExpenses} 
      options={{
        title: "All Expenses",
        tabBarLabel: 'All Expenses',
        tabBarIcon: ()=> <Text>'📅'</Text>
       }}/>
  </BottomTabs.Navigator>
}

const App = () => {
  return (
    <>
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
        }}>
          <Stack.Screen 
          name="ExpensesOverview" 
          component={ExpensesOverview} 
          options={{headerShown: false}}
          />
          <Stack.Screen name="ManageExpense" component = {ManageExpenses} options={{
            presentation: 'modal',
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})