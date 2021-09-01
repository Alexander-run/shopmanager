import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, HashRouter as Router } from 'react-router-dom'
import './index.css';
import 'antd/dist/antd.css'
import reportWebVitals from './reportWebVitals';
import { mainRoutes } from './route/index';
import App from './App'
import {Provider} from 'react-redux'
import rootReducer from './store/index'

ReactDOM.render( 
    <Provider store={rootReducer}>
        <Router>
            <Switch>
                <Route path='/admin' render={routeProps => <App {...routeProps} />} />
                {mainRoutes.map(route =>{
                    return <Route key={route.path} {...route} />;
                })}
                <Redirect to='/admin' from='/' />
                <Redirect to='/404' />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();