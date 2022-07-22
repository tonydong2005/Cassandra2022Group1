import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <img width="40" height=" 30" alt="JPMC Logo PLaceholder"
          src="https://th.bing.com/th/id/OIP.42US39t41lKv7d-hqR7ImQHaE8?pid=ImgDet&rs=1"></img>
        <h2>JP Morgan Chase & Co</h2>
        <h4>Keyspaces</h4>
        <div className='header__nav'>
            <NavLink to='/keyspaces' activeClassName='activeNav' exact={true}>Dashboard</NavLink>
            <NavLink to='/add' activeClassName='activeNav'>Add Book</NavLink>
        </div>
    </header>
);

export default Header;