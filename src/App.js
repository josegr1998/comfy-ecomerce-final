import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  HomePage,
  ProductsPage,
  SingleProductPage,
  AboutPage,
  CartPage,
  ErrorPage,
  CheckoutPage,
  PrivateRoute,
} from "./pages/index";
import AuthWrapper from "./pages/AuthWrapper";

function App() {
  return (
    <>
      <AuthWrapper>
        <Router>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/about'>
              <AboutPage />
            </Route>
            <Route exact path='/cart'>
              <CartPage />
            </Route>
            <Route exact path='/products'>
              <ProductsPage />
            </Route>
            <Route
              exact
              path='/products/:id'
              children={<SingleProductPage />}
            ></Route>
            {/*lo del private route hacerlo al final del proyecto, al principio poner un route normal para poder ver la pagina */}
            <PrivateRoute exact path='/checkout'>
              <CheckoutPage />
            </PrivateRoute>
            <Route exact path='/*'>
              <ErrorPage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthWrapper>
    </>
  );
}

export default App;
