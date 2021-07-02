import React from 'react';

import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';

interface IHeaderProps {
  openModal: () => void;
}

const HeaderModal: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <nav>
        <div>
          <button type="button" onClick={openModal}>
            <div className="text">Novo Agendamento</div>
            <div className="icon">
              <FiPlusSquare size={24} />
            </div>
          </button>
        </div>
      </nav>
    </header>
  </Container>
);

export default HeaderModal;
