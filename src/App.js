import React from 'react';
import Rates from './Rates';
import Charts from './Charts';

import { Navbar, Nav, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

export default function App() {
    return (
        <Router>
    <div>
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/rates">Rates</Nav.Link>
        <Nav.Link href="/charts">Charts</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        
        <Switch>
            <Route exact path = '/'>
                <Home />
            </Route>
            <Route exact path = '/rates'>
                <Rates />
            </Route>
            <Route exact path = '/charts'>
                <Charts />
            </Route>
        </Switch>   
    </div>
</Router>
    )
}

function Home() {
    return (
      <div>
        <h2 className="m-4">This is a test task. Done by Andrii Tusha</h2>
      </div>
    );
  }

