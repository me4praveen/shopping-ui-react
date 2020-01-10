import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Header.scss';
const Header = (props) => {
    const getTabsView = (tabs) => {
        return (tabs.map( (tab, index) => {
            if (!tab.subtabs) {
                return <Nav.Link key = {index} href={tab.path}>{tab.title}</Nav.Link>
            }
            return <NavDropdown key = {index} title={tab.title} id="collasible-nav-dropdown">
                        { 
                            tab.subtabs.map ((subtab, idx) => <NavDropdown.Item key = {idx} href={ subtab.path}>{subtab.title}</NavDropdown.Item>)
                        }
                   </NavDropdown>

        }));
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img className= "product-logo" src={props.logo} /> 
                {props.productFamily} {props.productName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {
                        getTabsView(props.tabs)
                    }
                </Nav>
                <Nav>
                    {
                        getTabsView(props.rightTabs)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
