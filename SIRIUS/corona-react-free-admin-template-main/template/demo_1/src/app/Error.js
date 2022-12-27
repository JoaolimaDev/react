import React, { Component,Suspense, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';


const Error404 = lazy(() => import('./error-pages/Error404'));

class Error extends Component {


 
  render () {

    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
        
        <Route exact path="/error-pages/error-404" component={ Error404 } />
          
        <Redirect to="/error-pages/error-404" component={ Error404 } />
          
        </Switch>
      </Suspense>
    );
  }
}

export default Error;