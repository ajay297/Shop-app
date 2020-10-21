import React from "react";
import {Button, Platform, SafeAreaView, View} from "react-native";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import {useDispatch} from "react-redux";
import * as authActions from '../store/actions/auth';
const defaultNavOptions={
    headerStyle:{
        backgroundColor: Platform.OS==='android'? Colors.primary:''
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans'
    },
    headerTintColor:Platform.OS==='android'? 'white':Colors.primary
}

const ProductsNavigator=createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons
            name={Platform.OS==='android'?'md-cart':'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions:defaultNavOptions
});
const AdminNavigator=createStackNavigator({
    UserProducts:UserProductScreen,
    EditProduct: EditProductScreen


},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons
    name={Platform.OS==='android'?'md-create':'ios-create'}
    size={23}
    color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions:defaultNavOptions
})
const OrdersNavigator=createStackNavigator({
    Orders:OrdersScreen,

},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons
            name={Platform.OS==='android'?'md-list':'ios-list'}
            size={23}
            color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions:defaultNavOptions
})
const ShopNavigator=createDrawerNavigator({
    Products: ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.primary
    },
    contentComponent:props => {
        const dispatch=useDispatch();
        return(
            <View style={{flex:1,padding:20}}>
                <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                    <DrawerItems {...props}/>
                    <Button title='Logout' color={Colors.primary} onPress={()=>{
                        dispatch(authActions.logout());
                        // props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
        )
    }
});
const AuthNavigator=createStackNavigator({
     Auth: AuthScreen
},{
    defaultNavigationOptions:defaultNavOptions
})
const MainNavigator=createSwitchNavigator({
    Startup:StartupScreen,
    Auth:AuthNavigator,
    Shop:ShopNavigator
})
export default createAppContainer(MainNavigator);