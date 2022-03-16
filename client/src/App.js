// import ApolloProvider component, ApolloClient to initialize GraphQL connection
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// middleware function to retrieve token from localStorage
import { setContext } from '@apollo/client/link/context';

import './App.css';
import SiteContainer from './Components/SiteContainer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// retrieve token from localStorage and set header of every request to include it
// excluding first request paramater because this runs after request is already made
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// combined link objects make sure every request retrieves the token
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (

    <ApolloProvider client={client}>

      <SiteContainer/>

    </ApolloProvider>
    

  );
}

export default App;
