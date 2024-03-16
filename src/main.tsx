import ReactDOM from 'react-dom/client'
import {ApolloProvider} from '@apollo/client'
import App from './App.tsx'
import { client } from './utils/apollo.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
