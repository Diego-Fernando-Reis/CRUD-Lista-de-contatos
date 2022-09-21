import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/' component={AddEdit} />
          <Route path='/' component={AddEdit} />
          <Route path='/' component={View} />
          <Route path='/' component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
