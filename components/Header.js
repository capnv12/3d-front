import { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';
import styled from 'styled-components';

const Header = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Wrapper>
			<div className="container">
				<Navbar dark expand="lg" style={{ backgroundColor: '#333333' }}>
					<NavbarBrand href="/">reactstrap</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar className="justify-content-center">
						<Nav className="mr-auto " navbar>
							<StyledNavItem>
								<NavLink href="/servicii">Servicii</NavLink>
							</StyledNavItem>
							<StyledNavItem>
								<NavLink href="/proiecte">Proiecte</NavLink>
							</StyledNavItem>
							<StyledNavItem>
								<NavLink href="/articole">Articole</NavLink>
							</StyledNavItem>
							<StyledNavItem>
								<NavLink href="/despre-noi">Despre Noi</NavLink>
							</StyledNavItem>
							<StyledNavItem>
								<NavLink href="/contact">Contact</NavLink>
							</StyledNavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: #333333;
`;
const StyledNavItem = styled(NavItem)`
	padding: 0 3px;
	margin: 0 1em 0 1em;
`;

export default Header;
