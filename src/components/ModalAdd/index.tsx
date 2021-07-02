import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import Modal from '../Modal';
import Input from '../Input';

import DropDownList from '../Dropdownlist';
import TextArea from '../TextArea';
import { Container } from './styles';

interface CreateAppointment {
  userid: number;
  clientid: number;
  appointmentType: number;
  date: string;
  hour: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAdd: (appointment: CreateAppointment) => void;
}

interface ClientList {
  value: string;
  text: string;
}

interface ClientListAPI {
  clientID: string;
  name: string;
}

interface Items {
  value: string;
  text: string;
}

const optionsAppointmentType: Items[] = [
  { value: '0', text: 'PreTalk' },
  { value: '1', text: 'Sessao' },
];

const ModalAdd: React.FC<IModalProps> = ({ isOpen, setIsOpen, handleAdd }) => {
  const formRef = useRef<FormHandles>(null);
  const [clientList, setClientList] = useState<ClientList[]>([]);

  const handleSubmit = useCallback(
    async (data: CreateAppointment) => {
      handleAdd(data);
    },
    [handleAdd, setIsOpen],
  );

  useEffect(() => {
    const companyid = localStorage.getItem('@Hypnus:company');

    async function getListClients() {
      const response = await api.get<[ClientListAPI]>(
        `Client?companyid=${companyid}&company=true`,
      );

      response.data.push({
        clientID: '0',
        name: '',
      });

      const dataClientAPI: ClientListAPI[] = response.data;

      const dataClientList = dataClientAPI.map(client => {
        const c: ClientList = {
          value: client.clientID,
          text: client.name,
        };

        return c;
      });

      dataClientList.sort((a, b) => {
        if (a.text > b.text) {
          return 1;
        }
        if (a.text < b.text) {
          return -1;
        }
        return 0;
      });

      setClientList(dataClientList);
    }

    getListClients();
  }, []);

  const handleKeyUpHour = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.currentTarget.maxLength = 5;
      let value = e.currentTarget.value;
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/, '$1:$2');
      e.currentTarget.value = value;
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h1>Novo Agendamento</h1>
          <div>
            <DropDownList
              name="clientID"
              items={clientList}
              placeholder="Cliente"
              label="Cliente"
              isNotLogin
            />
          </div>
          <div id="time">
            <Input
              type="date"
              name="date"
              label="Data do agendamento"
              placeholder="Data do agendamento"
              isNotLogin
            />
            <Input
              type="hour"
              name="hour"
              isNotLogin
              label="Hora"
              onKeyUp={handleKeyUpHour}
            />
          </div>
          <div>
            <DropDownList
              name="appointmentType"
              items={optionsAppointmentType}
              placeholder="Tipo Agendamento"
              label="Tipo Agendamento"
              isNotLogin
            />
          </div>
          <div>
            <TextArea
              name="description"
              placeholder="Descrição"
              label="Descrição"
            />
          </div>
          <button type="submit">
            <p className="text">Adicionar Agendamento</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Container>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
