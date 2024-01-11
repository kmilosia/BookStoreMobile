import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../utils/axiosClient';

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

const Stack = createStackNavigator();
const AuthContext = React.createContext();

function MainContainer() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
      const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log("error useeffect token");
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [checkingToken, setCheckingToken] = React.useState(false)

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let userToken
        try{
          setLoading(true)
          setError(null)
          const response = await axiosClient.post('/Account/login', data)
          if (response.status === 200) {
            userToken = response.data;
            dispatch({ type: 'SIGN_IN', token: userToken });
            await AsyncStorage.setItem('token', userToken)
            setLoading(false)
          }else{
            setError("Error podczas logowania")
            setLoading(false)
          }
        }catch(error){
            setError("Nieudane logowanie")
            setLoading(false)
        }

      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
        } catch (error) {
          console.log("error signout");
          console.error(error);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
      checkToken: async () => {
        let userToken
        try {
          setCheckingToken(true)
          userToken = await AsyncStorage.getItem('token')
          setCheckingToken(false)
        } catch (e) {
          console.log("error checktoken");
          console.log(e);
          setCheckingToken(false)
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      },
      checkingToken,
      loading,
      error,
    }),
    [loading,error,checkingToken]
  );
  if(checkingToken){
    return <SplashScreen />
  }
  return (
    <NavigationContainer theme={{colors: {background: '#181826'}}}>
          <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.userToken === null ? (
          <>
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{headerShown: false}} name="RecoverPassword" component={RecoverPasswordScreen} />
          </>
        ) : (
          <>
        <Stack.Screen options={{headerShown: false}} name="Main" component={MainTabNavigator} />
        <Stack.Screen options={{headerShown: false}} name="Product" component={ProductScreen} />
        <Stack.Screen options={{headerShown: false}} name="Reviews" component={ReviewsScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Szukaj' />, headerLeft: null}} name="Search" component={SearchScreen} />
        <Stack.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: () => <DefaultHeader title='Kategorie' />, headerLeft: null}} name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Category" component={CategoryBookListScreen} options={({ route }) => ({ headerTitle: () => <DefaultHeader title={route.params.title} />, headerLeft: null, headerStyle: { backgroundColor: COLORS.primary }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' })} />

          </>
        )}
      </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
export { AuthContext };
export default MainContainer;

        {/* <Stack.Screen options={{headerTitle: () => <ProductHeader />, headerLeft: null}} name="Product" component={ProductScreen} /> */}