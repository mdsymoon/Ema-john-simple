import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from "./components/Review/Review";
import NotFound from "./components/NotFound/NotFound";
import Inventory from "./components/Inventory/Inventory";
import ProductDeatails from "./components/ProductDetails/ProductDeatails";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setloggedInUser] = useState({});
  return (
    <UserContext.Provider value ={[loggedInUser , setloggedInUser]}>
      <p>Email: {loggedInUser.email}</p>
     
      
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/product/:productKey">
            <ProductDeatails></ProductDeatails>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
