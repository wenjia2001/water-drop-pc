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
  const { loading } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, tel, name } = data.getUserInfo
        setStore({
          id,
          tel,
          name
        })
        if (location.pathname.startsWith('/login')) {
          nav('/')
        }
        return
      }
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`)
      }

    },
    onError: () => {
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`)
      }
    }
  })


  return { loading };
};


