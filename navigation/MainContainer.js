import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SearchScreen from './screens/SearchScreen';
import { COLORS } from '../styles/constants';
import CategoriesScreen from './screens/CategoriesScreen';
import DefaultHeader from '../components/headers/DefaultHeader';
import CategoryBookListScreen from './screens/CategoryBooksListScreen';
import ProductScreen from './screens/ProductScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecoverPasswordScreen from './screens/RecoverPasswordScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import SplashScreen from './screens/SplashScreen';
import MainTabNavigator from './MainTabNavigator';
import Message from './screens/Message';
import { useMessageStore } from '../store/messageStore';
import UserDataScreen from './screens/profileScreens/UserDataScreen';
import EditUserDataScreen from './screens/profileScreens/EditUserDataScreen';
import PasswordScreen from './screens/profileScreens/PasswordScreen';
import { useAuthStore } from '../store/userStore';
import RentScreen from './screens/RentScreen';
import NewsDetailsScreen from './screens/NewsDetailsScreen';
import NewsScreen from './screens/NewsScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Stack = createStackNavigator();

function MainContainer() {
  const message = useMessageStore((state) => state.message)
  const token = useAuthStore((state) => state.token)
  const restoring = useAuthStore((state) => state.restoring)
  const restoreToken = useAuthStore((state) => state.restoreToken)

  React.useEffect(() => {
    restoreToken()
  },[])

  return (
    restoring ? <SplashScreen /> :
    <NavigationContainer theme={{colors: {background: '#181826'}}}>
      {message.bool && <Message />}
      <Stack.Navigator>
        {token === null ? (
          <>
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{headerShown: false}} name="RecoverPassword" component={RecoverPasswordScreen} />
          </>
        ) : (
          <>
        <Stack.Screen options={{headerShown: false}} name="Main" component={MainTabNavigator} />
        <Stack.Screen options={{headerShown: false}} name="Product" component={ProductScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Kasa' />, headerLeft: null}} name="Checkout" component={CheckoutScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Wiadomości' />, headerLeft: null}} name="News" component={NewsScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Wiadomość' />, headerLeft: null}} name="NewsDetails" component={NewsDetailsScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Wypożycz' />, headerLeft: null}} name="Rent" component={RentScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Wszystkie recenzje' />, headerLeft: null}} name="Reviews" component={ReviewsScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Zmień hasło' />, headerLeft: null}} name="ChangePassword" component={PasswordScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Edytuj dane użytkownika' />, headerLeft: null}} name="EditUserData" component={EditUserDataScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Dane użytkownika' />, headerLeft: null}} name="UserData" component={UserDataScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Szukaj' />, headerLeft: null}} name="Search" component={SearchScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Kategorie' />, headerLeft: null}} name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Category" component={CategoryBookListScreen} options={({ route }) => ({ headerTitle: () => <DefaultHeader title={route.params.title} />, headerLeft: null, headerStyle: { backgroundColor: COLORS.primary }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' })} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainContainer;