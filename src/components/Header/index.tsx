import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/Auth';

import { Container, HeaderComponent, HeaderContent, Profile } from './styles';

import SideBar from '../SideBar';

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <HeaderComponent>
        <HeaderContent>
          <Profile>
            <img
              src="https://avatars.githubusercontent.com/u/13902844?s=460&u=e01b1ac7ec7f36711f72ff3f1a4a0995e4a8ac6c&v=4"
              alt="logo"
            />
          </Profile>

          <button type="button" onClick={logout}>
            <FiPower />
          </button>
        </HeaderContent>
      </HeaderComponent>
      <SideBar />
    </Container>
  );
};

export default Header;
