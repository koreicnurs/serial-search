import React from 'react';
import Layout from "./UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import SearchSerials from "./containers/SearchSerials/SearchSerials";
import Serial from "./containers/Serial/Serial";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={SearchSerials}/>
                <Route path='/shows/:id' exact component={Serial}/>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
};

export default App;