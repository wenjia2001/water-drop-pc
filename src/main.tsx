import ReactDOM from 'react-dom/client'
import {ApolloProvider} from '@apollo/client'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { client } from './utils/apollo.ts'
import { ROUTE_CONFIG } from './routes/index.ts'
import Page404 from './containeres/Page404/index.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        {ROUTE_CONFIG.map((item)=>(
          <Route path={item.path}
          key={item.key}
          element={<item.element/>}
          />
        ))}
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
