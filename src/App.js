import React from 'react';
import Layout from "./UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Serial from "./containers/Serial/Serial";
import './App.css';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact render={() => <h1 className='main-serial'>Which serial are u searching?</h1>}/>
                <Route path='/shows/:id' exact component={Serial}/>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
};

export default App;