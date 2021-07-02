import React, { useState, useCallback, useRef, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import * as Yup from 'yup';
import { format, isAfter, parseISO } from 'date-fns';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FiClock, FiCheckCircle } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

import {
  Container,
  TableContainer,
  InfoContainer,
  FormContainer,
  TabSection,
  CardAppointment,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import DropDown from '../../components/Dropdownlist';

import { estados, cidades } from '../../utils/listCombo';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface Items {
  value: string;
  text: string;
}

const optionsCivilState: Items[] = [
  { value: '0', text: '' },
  { value: '1', text: 'Casado' },
  { value: '2', text: 'Solteiro' },
];

const optionsGenre: Items[] = [
  { value: '0', text: '' },
  { value: '1', text: 'Feminino' },
  { value: '2', text: 'Masculino' },
];

interface ClientFormData {
  clientID: number;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
  rg: string;
  civilState: string;
  gender: string;
  occupation: string;
  religion: string;
  education: string;
  phone: string;
  cellPhone: string;
  zipCode: string;
  street: string;
  number: string;
  city: string;
  state: string;
  companyID: number;
}

interface ClientList {
  clientID: number;
  name: string;
}

interface ClientData {
  clientID: number;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
  rg: string;
  civilState: string;
  gender: string;
  occupation: string;
  religion: string;
  education: string;
  phone: string;
  cellPhone: string;
  zipCode: string;
  street: string;
  number: string;
  city: string;
  state: string;
  companyID: number;
}

interface IAppointmentData {
  appointmentid: number;
  userid: number;
  clientid: number;
  appointmentType: number;
  date: string;
  hour: string;
  description: string;
}

const Clientes: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [value, setValue] = useState(0);
  const [clients, setClients] = useState<ClientList[]>([]);
  const history = useHistory();
  const [clientidActual, setClientidActual] = useState<number>();
  const { addToast } = useToast();
  const [clientName, setClientName] = useState('');
  const [appointments, setAppointments] = useState<IAppointmentData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [appointmentUpdate, setAppointmentUpdate] = useState<IAppointmentData>(
    {} as IAppointmentData,
  );
  const [appointmentUpdateID, setAppointmentUpdateID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingClient, setLoadingClient] = useState(false);
  // const [today, setToday] = useState('');

  const handleSubmit = useCallback(
    async (data: ClientFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Informe o nome'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const clientIDUrl = parseInt(
          history.location.pathname.split('/')[2],
          10,
        );
        const cID = localStorage.getItem('@Hypnus:company');
        let CompanyID = 0;

        if (cID) {
          CompanyID = parseInt(cID, 10);
        }

        if (clientIDUrl) {
          const clientData: ClientData = {
            ...data,
            clientID: clientIDUrl,
            companyID: CompanyID,
          };

          await api.put(
            `Client/${history.location.pathname.split('/')[2]}`,
            clientData,
          );

          addToast({
            title: 'Sucesso',
            description: 'Cliente atualizado!',
            type: 'success',
          });
        } else {
          const clientData: ClientData = {
            ...data,
            // motherAlive: data.motherAliveBool ? 1 : 0,
            // fatherAlive: data.fatherAliveBool ? 1 : 0,
            // haveChildren: data.haveChildrenBool ? 1 : 0,
            // haveBrothers: data.haveBrothersBool ? 1 : 0,
            // alcoholProblems: data.alcoholProblemsBool ? 1 : 0,
            // smoke: data.smokeBool ? 1 : 0,
            // alreadyHipnotized: data.alreadyHipnotizedBool ? 1 : 0,
            // believeHipnotized: data.believeHipnotizedBool ? 1 : 0,
            companyID: CompanyID,
          };

          await api.post('Client', clientData);

          addToast({
            title: 'Sucesso',
            description: 'Cliente adicionado!',
            type: 'success',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao atualizar o cliente, verifique as informações',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    },
    [],
  );

  useEffect(() => {
    // const curr = new Date();
    // curr.setDate(curr.getDate() + 3);
    // const date = curr.toISOString().substr(0, 10);
    // if (!today) {
    //   setToday(date);
    // }

    // console.log(date);

    const companyid = localStorage.getItem('@Hypnus:company');
    let id = 0;

    async function getFormData() {
      const response = await api.get(`Client/${clientidActual}`);

      const dataFormClient: ClientFormData = response.data[0];

      const formatDate = format(
        parseISO(dataFormClient.birthDate),
        'yyyy-MM-dd',
      );

      setClientName(dataFormClient.name);

      formRef.current?.setData({ ...dataFormClient, birthDate: formatDate });

      setLoadingClient(false);
    }

    if (history.location.pathname.split('/')[2]) {
      id = parseInt(history.location.pathname.split('/')[2], 10);

      setClientidActual(id);

      getFormData();

      api
        .get<[IAppointmentData]>(`AppointmentsByClient?clientid=${id}`)
        .then(response => {
          setAppointments(response.data);
        });
    }

    api
      .get<[ClientList]>(`Client?companyid=${companyid}&company=true`)
      .then(response => {
        setClients(response.data);
        setLoading(false);
      });
  }, [clientidActual, history, value]);

  const handleChangeClient = useCallback(
    clientid => {
      setLoadingClient(true);
      history.push(`/Clientes/${clientid}`);
      setClientidActual(clientid);
    },
    [setClientidActual],
  );

  function toggleModal(appointmentUpdateId: number): void {
    setAppointmentUpdateID(appointmentUpdateId);
    setModalOpen(!modalOpen);
  }

  function toggleModalSet(): void {
    setModalOpen(!modalOpen);
  }

  const handleAddClient = useCallback(() => {
    setClientName('');
    formRef.current?.reset();
    history.push(`/Clientes`);
  }, []);

  const handleAnamnese = useCallback(() => {
    history.push(`/Anamnese/${history.location.pathname.split('/')[2]}`);
  }, []);

  async function handleUpdate(appointment: IAppointmentData): Promise<void> {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        date: Yup.date().required('Informe a data'),
        hour: Yup.string().required('Informe a hora'),
      });

      await schema.validate(appointment, {
        abortEarly: false,
      });

      appointment.date = `${appointment.date}T${appointment.hour}:00.00`;

      const userID = localStorage.getItem('@Hypnus:userid');
      let UserID = 0;

      if (userID) {
        UserID = parseInt(userID, 10);
      }

      appointment.userid = UserID;

      await api.put(`appointments/${appointment.appointmentid}`, appointment);

      addToast({
        title: 'Sucesso',
        description: 'Agendamento atualizado com sucesso!',
        type: 'success',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        title: 'Erro no agendamento',
        description:
          'Ocorreu um erro ao criar o agendamento, verifique as informações',
        type: 'error',
      });
    }
  }

  return (
    <Container>
      <Header />
      {/* <SideBar /> */}

      <InfoContainer>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Clientes</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <SkeletonTheme color="#FFF" highlightColor="#f0f0f5">
                  <Skeleton count={20} height={50} />
                </SkeletonTheme>
              )}
              {!loading &&
                clients.map(client => (
                  <tr key={client.clientID}>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleChangeClient(client.clientID)}
                      >
                        <span>{client.name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContainer>
            {/* {loadingClient && (
              <SkeletonTheme color="#FFF" highlightColor="#f0f0f5">
                <Skeleton count={20} height={50} />
              </SkeletonTheme>
            )} */}
            <Paper square={false} elevation={5}>
              <div>
                <h1>{clientName}</h1>
                <div>
                  <Button
                    type="button"
                    onClick={handleAnamnese}
                    className="button-c"
                    title="Anamnese"
                  >
                    Anamnese
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAddClient}
                    className="button-c"
                    title="Novo cliente"
                  >
                    Novo
                  </Button>
                  <Button type="submit" title="Salvar cliente">
                    Salvar
                  </Button>
                </div>
              </div>
              <Tabs
                value={value}
                indicatorColor="primary"
                onChange={handleChange}
              >
                <Tab label="Dados Gerais" />
                {/* <Tab label="Anamnese" /> */}
                <Tab label="Sessões" />
                <Tab label="Financeiro" disabled />
              </Tabs>
              <TabPanel value={value} index={0}>
                <TabSection>
                  <Input
                    name="name"
                    placeholder="Nome Completo"
                    sizePX="5px"
                    label="Nome Completo"
                    autoComplete="false"
                  />
                  {/* Data Nasc.: */}
                  <Input
                    type="date"
                    sizePX="5px"
                    name="birthDate"
                    label="Data Nascimento"
                    placeholder="Data Nascimento"
                    autoComplete="false"
                  />
                </TabSection>
                <br />
                <TabSection>
                  <Input
                    name="cpf"
                    placeholder="CPF"
                    label="CPF"
                    autoComplete="false"
                  />
                  <Input
                    name="rg"
                    placeholder="RG"
                    label="RG"
                    autoComplete="false"
                  />
                </TabSection>
                <br />
                <TabSection>
                  <DropDown
                    name="civilState"
                    items={optionsCivilState}
                    label="Estado cívil"
                  />
                  <DropDown name="gender" items={optionsGenre} label="Gênero" />
                </TabSection>
                <br />
                <TabSection>
                  <Input
                    name="occupation"
                    placeholder="Profissao"
                    label="Profissão"
                  />
                  <Input
                    name="education"
                    placeholder="Escolaridade"
                    label="Escolaridade"
                  />
                  <Input
                    name="religion"
                    placeholder="Religião"
                    label="Religião"
                  />
                </TabSection>
                <br />
                <TabSection>
                  <Input name="phone" placeholder="Telefone" label="Telefone" />
                  <Input
                    name="cellPhone"
                    placeholder="Celular"
                    label="Celular"
                  />
                  <Input name="email" placeholder="E-mail" label="E-Mail" />
                </TabSection>
                <br />
                <TabSection>
                  <DropDown name="state" items={estados} label="Estado" />
                  <DropDown name="city" items={cidades} label="Cidade" />
                </TabSection>
                <br />
              </TabPanel>
              <TabPanel value={value} index={1}>
                {appointments.map(appointment => (
                  <CardAppointment
                    key={appointment.appointmentid}
                    isAfter={isAfter(parseISO(appointment.date), new Date())}
                  >
                    <div>
                      {isAfter(parseISO(appointment.date), new Date()) && (
                        <span>
                          <FiCheckCircle size={40} />
                        </span>
                      )}
                      {!isAfter(parseISO(appointment.date), new Date()) && (
                        <span>
                          <FiClock size={40} />
                        </span>
                      )}
                      <strong>
                        Sessão agendada dia {appointment.date}
                        {/* {format(parseISO(appointment.date), 'dd/MM/yyyy')} */}
                      </strong>
                      <div>
                        {/* <HeaderModalEdit
                          openModal={() =>
                            toggleModal(appointment.appointmentid)
                          }
                        /> */}
                      </div>
                    </div>
                  </CardAppointment>
                ))}
                {/* <ModalEdit
                  isOpen={modalOpen}
                  setIsOpen={toggleModalSet}
                  handleUpdate={handleUpdate}
                  editingAppointment={appointmentUpdate}
                  appointmentUpdateID={appointmentUpdateID}
                /> */}
              </TabPanel>
            </Paper>
          </FormContainer>
        </Form>
      </InfoContainer>
    </Container>
  );
};

export default Clientes;
