import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import AuthScreen from '../screens/AuthScreen';
import AllProducts from '../screens/AllProducts';
import Product from '../screens/Product';
import CategoryList from '../screens/CategoryList';
import Category from '../screens/Category';
import Cart from '../screens/Cart';
import User from '../screens/User';
import Order from '../screens/Order';
import OrderHistory from '../screens/OrderHistory';

const AllProductStack = createStackNavigator({ All: AllProducts, Product: Product });
const CategoryStack = createStackNavigator({ Categories: CategoryList, Category: Category, CategoryProduct: Product });
const CartStack = createStackNavigator({ Cart: Cart, Order: Order });
const OrderStack = createStackNavigator({ Order: OrderHistory }); 

const AppTabs = createBottomTabNavigator({
    Home: AllProductStack,
    Categories: CategoryStack,
    Order: OrderStack,
    Cart: CartStack
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                iconName = `ios-home${focused ? '' : '-outline'}`;
              } else if (routeName === 'Categories') {
                // iconName = `ios-options${focused ? '' : '-outline'}`;
                iconName = `ios-grid${focused ? '' : '-outline'}`;
              } else if (routeName === 'Cart') {
                iconName = `ios-cart${focused ? '' : '-outline'}`;
              } else if (routeName === 'Order') {
                  iconName = `user`;
                  return <EvilIcons name={iconName} size={25} color={tintColor} />;
              }
      
              // You can return any component that you like here! We usually use an
              // icon component from react-native-vector-icons
              return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
    }),
    tabBarOptions: {
        activeTintColor: '#8c67ef',
        inactiveTintColor: 'gray',
    }
});
const AuthStack = createStackNavigator({ Auth: AuthScreen }, { headerMode: 'none' });

export default createSwitchNavigator({
    Auth: AuthStack,
    App: AppTabs
}, {
    initialRouteName: 'Auth'
});