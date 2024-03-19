import Home from "../containeres/Home";
import Login from "../containeres/Login";

export const ROUTE_CONFIG=[
    {
        key:'login',
        path:'/login',
        element:Login,
        title:'登录'
    },
    {
        key:'home',
        path:'/',
        element:Home,
        title:'首页'
    }
]