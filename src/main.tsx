import ReactDOM from 'react-dom/client'
import {ApolloProvider} from '@apollo/client'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { client } from './utils/apollo.ts'
import { ROUTE_CONFIG } from './routes/index.tsx'
import './index.css'
import UserInfo from './components/UserInfo/index.tsx'
import Layout from './containers/Layout/index.tsx'
import Login from './containers/Login/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Layout/>}>
              {ROUTE_CONFIG.map((item)=>(
                <Route path={item.path}
                key={item.key}
                element={<item.element/>}
                />
              ))}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
  </ApolloProvider>
)
