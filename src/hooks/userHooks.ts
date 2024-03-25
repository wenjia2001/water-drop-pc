import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useAppContext, connectFactory } from "@/utils/contextFactory";
import { GET_USER } from "@/graphql/user";
import { IUser } from "@/utils/types";


const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY)

export const connect = connectFactory(KEY, DEFAULT_VALUE)

export const useGetUser = () => {
  const { setStore } = useUserContext()
  const location = useLocation()
  const nav = useNavigate()
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, tel, name, desc, avatar } = data.getUserInfo
        setStore({
          id,
          tel,
          name,
          desc,
          avatar,
          refetchHandler: refetch
        })
        // 当前在登录页面，且已经登录，那就直接跳到首页
        if (location.pathname.startsWith('/login')) {
          nav('/')
        }
        return
      }
      setStore({ refetchHandler: refetch })
      // 如果当前不在登录页面，而且没有登录，那就跳到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`)
      }

    },
    onError: () => {
      setStore({ refetchHandler: refetch })
      // 如果当前不在登录页面，而且登录异常，那就跳到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`)
      }
    }
  })


  return { loading };
};


