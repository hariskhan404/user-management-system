
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Login from './components/Login'; 

import Login from './componenets/Login';
import Signup from './componenets/Signup';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/signup" component={<Signup/>} />
                    <Route path="/login" component={<Login/>} />
                    <Route path="/" exact>
                        <h1>Welcome to User Management System</h1>
                        <p>Please <a href="/signup">Sign Up</a> or <a href="/login">Login</a></p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
