import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom'
import './Header.css'

const Header = () =>{
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/'){
      setActiveTab('Home');
    } else if(location.pathname === '/add'){
      setActiveTab('AddContact');
    } else if(location.pathname === '/about'){
      setActiveTab('About');
    }
  }, [location])

   

  return(
    <div className='header'>
      <span className='logo'>Lista de contato</span>
      <div className='header-right'>
        <Link to='/'>
          <p className={`${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>
            <i>Home</i>
          </p>
        </Link>
        <Link to='/add'>
          <p className={`${activeTab === 'AddContact' ? 'active' : ''}`} onClick={() => setActiveTab('AddContact')}>
            <i>Adicionar</i>
          </p>
        </Link>
        <Link to='/about'>
          <p className={`${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab('About')}>
            <i>Sobre</i>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;