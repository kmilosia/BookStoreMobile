import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../styles/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

//Screens
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import LibraryScreen from './screens/LibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeHeader from '../components/headers/HomeHeader';
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';


export default function MainTabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.triary,
          tabBarStyle: {
            height: 80,
            backgroundColor: COLORS.primary,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Library') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Products') {
              iconName = focused ? 'list' : 'list-outline';
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
              display: 'none'
          }
        })}
        >
        <Tab.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: (props) => <HomeHeader {...props} />}} name="Home" component={HomeScreen} />
        {/* <Tab.Screen options={{ headerStyle: {backgroundColor: COLORS.primary}, headerTitleStyle: {color: 'white'},headerTintColor: 'white', headerTitle: (props) => <DefaultHeader title="Książki" {...props} />}} name="Products" component={ProductListScreen} /> */}
        <Tab.Screen options={{ title: 'Książki', headerStyle: {backgroundColor: COLORS.primary},headerTitleStyle: {color: 'white'}}} name="Products" component={ProductListScreen} />
        <Tab.Screen options={{ title: 'Lista życzeń', headerStyle: {backgroundColor: COLORS.primary},headerTitleStyle: {color: 'white'}}} name="Wishlist" component={WishlistScreen} />
        <Tab.Screen options={{ title: 'Biblioteka', headerStyle: {backgroundColor: COLORS.primary},headerTitleStyle: {color: 'white'}}} name="Library" component={LibraryScreen} />
        <Tab.Screen options={{ title: 'Koszyk', headerStyle: {backgroundColor: COLORS.primary},headerTitleStyle: {color: 'white'}}} name="Cart" component={CartScreen} />
        <Tab.Screen options={{ title: 'Profil', headerStyle: {backgroundColor: COLORS.primary},headerTitleStyle: {color: 'white'}}} name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }