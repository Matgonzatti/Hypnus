import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import { Form } from './styles';

import Modal from '../Modal';
import Input from '../Input';
import DropDownList from '../Dropdownlist';
import TextArea from '../TextArea';

interface IAppointmentData {
  appointmentid: number;
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
  handleUpdate: (appointment: IAppointmentData) => Promise<void>;
  editingAppointment: IAppointmentData;
  appointmentUpdateID: number;
}

interface IEditData {
  userid: number;
  clientid: number;
  appointmentType: number;
  date: string;
  hour: string;
  description: string;
}

interface ClientList {
  value: string;
  text: string;
}

interface ClientListAPI {
  clientID: string;
  name: string;
}

const optionsAppointmentType: Items[] = [
  { value: '0', text: 'PreTalk' },
  { value: '1', text: 'Sessao' },
];

interface Items {
  value: string;
  text: string;
}

const ModalEdit: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingAppointment,
  handleUpdate,
  appointmentUpdateID,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [clientList, setClientList] = useState<ClientList[]>([]);
  // const [appointmentId, setAppointmentId] = useState();
  // const [appointment, setAppointment] = useState<IAppointmentData>();

  // useEffect(() => {
  //   console.log(appointmentUpdateID);
  //   const companyid = localStorage.getItem('@Hypnus:company');

  //   async function getListClients() {
  //     const response = await api.get<[ClientList]>(
  //       `Client?companyid=${companyid}&company=true`,
  //     );

  //     setClientList(response.data);
  //   }

  //   api
  //     .get<[IAppointmentData]>(`appointments/${appointmentUpdateID}`)
  //     .then(response => {
  //       setAppointment(response.data[0]);

  //       console.log(appointment);
  //     });

  //   getListClients();
  // }, []);

  const handleLoadClient = useCallback(
    async (data: IEditData) => {
      console.log(data);
    },
    [setIsOpen],
  );

  const handleSubmit = useCallback(
    async (data: IEditData) => {
      console.log(data);
    },
    [handleUpdate, setIsOpen],
  );

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
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingAppointment}
      >
        <h1>Editar Agendamento</h1>
        <div>
          <DropDownList
            name="clientID"
            items={clientList}
            placeholder="Cliente"
            label="Cliente"
            isNotLogin
            disabled
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
          <p className="text">Editar Agendamento</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
