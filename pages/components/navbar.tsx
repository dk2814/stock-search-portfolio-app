import React, { useState } from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'react-bootstrap';
import styles from '../../styles/styles.module.css';

interface NavigationBarProps {
  onTabClick: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState<string>('summary');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabClick(tab); // Notify parent component about tab click
  };

  return (
    <Navbar className="custom-navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav className="w-100 d-flex justify-content-between">
          <NavItem>
            <NavLink
              href="#summary"
              className={activeTab === 'summary' ? 'active' : ''}
              onClick={() => handleTabClick('summary')}
              style={activeTab === 'summary' ? { borderBottom: '2px solid blue' } : {}}
            >
              Summary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#topnews"
              className={activeTab === 'topnews' ? 'active' : ''}
              onClick={() => handleTabClick('topnews')}
              style={activeTab === 'topnews' ? { borderBottom: '2px solid blue' } : {}}
            >
              Top News
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#charts"
              className={activeTab === 'charts' ? 'active' : ''}
              onClick={() => handleTabClick('charts')}
              style={activeTab === 'charts' ? { borderBottom: '2px solid blue' } : {}}
            >
              Charts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#insights"
              className={activeTab === 'insights' ? 'active' : ''}
              onClick={() => handleTabClick('insights')}
              style={activeTab === 'insights' ? { borderBottom: '2px solid blue' } : {}}
            >
              Insights
            </NavLink>
          </NavItem>
        </Nav>
        <div className="underline"></div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
