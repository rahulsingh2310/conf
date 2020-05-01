import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <Navbar className="w-100 sticky-top" type="dark" theme="primary" expand="md">
        <NavbarBrand href="#">KonfHub Technologies </NavbarBrand>
      </Navbar>
    );
  }
}
