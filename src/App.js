import React from 'react';
import Layout from "./UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import SearchSerials from "./containers/SearchSerials/SearchSerials";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={SearchSerials}/>

            </Switch>
        </Layout>
    );
};

export default App;