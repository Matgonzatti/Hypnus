import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaRegCalendarCheck } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

import { Container } from './styles';

const SideBar: React.FC = () => (
  <Container>
    <Link to="/Clientes">
      <div>
        <FaUserFriends size={40} />
      </div>
    </Link>
    <Link to="/Schedule">
      <div>
        <FaRegCalendarCheck size={40} />
      </div>
    </Link>
    <Link to="/Schedule">
      <div>
        <MdAttachMoney size={40} />
      </div>
    </Link>
  </Container>
);

export default SideBar;
