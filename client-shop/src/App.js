import { Switch,Route,Redirect } from 'react-router-dom';
import './App.css';
import { adminRoutes } from './route';
import Frame from './components/Frame/index'
import { isLogined } from './utils/auth'

function App() {
  return isLogined() ? ( 
    <Frame>
      <Switch>
        {adminRoutes.map(route=>{
          return <Route 
            key={route.path} 
            path={route.path} 
            exact={route.exact} 
            render={routeProps=>{
              return <route.component {...routeProps} />
            }} 
          />
        })}
        <Redirect from='/admin' to={adminRoutes[0].path} />
        <Redirect to='/404' />
      </Switch>
    </Frame>
  ): (
    <Redirect to='/login' />
  )
}

export default App;
