import React, {useState} from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login.js";
import { useStateValue } from "./StateProvider";


function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        {
        //  {!user ? (
        }
        {!user  ? (
          <Login />
        ) : (
       <>
       <Header />
       <div className="app__body">
        <Sidebar />
        <Switch>
          <Route path="/room/:roomId">
            <Chat />
          </Route>\\
          <Route path="/">
            <h1 class="first">初期画面</h1>
          </Route>
        </Switch>
       </div>
          </>
       )}
      </Router>
    </div>
  );
}

export default App;
