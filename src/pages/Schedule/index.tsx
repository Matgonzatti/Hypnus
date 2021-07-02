import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock } from 'react-icons/fi';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import ModalAdd from '../../components/ModalAdd';
import HeaderModal from '../../components/HeaderModal';

import api from '../../services/api';
import {
  Container,
  Content,
  ScheduleComponent,
  NextAppointments,
  Section,
  Appointment,
  Calendar,
} from './styles';

import { useAuth } from '../../hooks/Auth';

import badgePreTalk from '../../assets/badge-pre-talk.png';
import badgeSessao from '../../assets/badge-sessao.png';

interface AppointmentData {
  AppointmentID: string;
  ClientID: string;
  AppointmentType: string;
  Date: string;
  Description: string;
  UserID: string;
  Name: string;
  HourFormatted: string;
}

interface Appointment {
  id: number;
  userid: number;
  appointmentType: number;
  date: string;
  description: string;
}

interface CreateAppointment {
  userid: number;
  clientid: number;
  appointmentType: number;
  date: string;
  hour: string;
  description: string;
}

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [openCard, setOpenCard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast, removeToast } = useToast();

  const { user } = useAuth();

  const handleDayChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    // console.log(selectedDate, handleAdd);
    api
      .get<AppointmentData[]>('/AppointmentsOnDay', {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
          userid: user,
        },
      })
      .then(response => {
        const appointmentsData = response.data;

        const appointmentsFormatted = appointmentsData.map(appointment => {
          return {
            ...appointment,
            HourFormatted: format(parseISO(appointment.Date), 'HH:mm'),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.Date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return (
        parseISO(appointment.Date).getHours() >= 12 &&
        parseISO(appointment.Date).getHours() < 18
      );
    });
  }, [appointments]);

  const nightAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.Date).getHours() >= 18;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(
      appointment =>
        isAfter(parseISO(appointment.Date), new Date()) &&
        (morningAppointments.length > 0 ||
          afternoonAppointments.length > 0 ||
          nightAppointments.length > 0),
    );
  }, [appointments]);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  // const handleAddCall = useCallback(() => {
  //   handleAdd(CreateAppointment);
  // }, []);

  async function handleAdd(appointment: CreateAppointment): Promise<void> {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        clientID: Yup.string()
          .notOneOf([''], 'teste')
          .required('Informe o cliente'),
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

      await api.post(`appointments`, appointment);

      toggleModal();

      addToast({
        title: 'Sucesso',
        description: 'Agendamento realizado!',
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

      <Content>
        <ScheduleComponent>
          <h1>Atendimentos agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointments>
              <strong>Atendimento a seguir</strong>
              <Link to={`/Clientes/${nextAppointment.ClientID}`}>
                <div>
                  {nextAppointment.AppointmentType === '0' && (
                    <img src={badgePreTalk} alt="PreTalk" />
                  )}
                  {nextAppointment.AppointmentType === '1' && (
                    <img src={badgeSessao} alt="Sessao" />
                  )}

                  <strong>
                    {nextAppointment.Name} <p>{nextAppointment.Description}</p>
                  </strong>

                  <span>
                    <FiClock />
                    {nextAppointment.HourFormatted}
                  </span>
                </div>
              </Link>
            </NextAppointments>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.AppointmentID}>
                <span>
                  <FiClock />
                  {appointment.HourFormatted}
                </span>
                <Link to={`/Clientes/${appointment.ClientID}`}>
                  <div>
                    <strong>
                      {appointment.Name} <p>{appointment.Description}</p>
                    </strong>

                    {appointment.AppointmentType === '0' && (
                      <img src={badgePreTalk} alt="PreTalk" />
                    )}
                    {appointment.AppointmentType === '1' && (
                      <img src={badgeSessao} alt="Sessao" />
                    )}
                  </div>
                </Link>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.AppointmentID}>
                <span>
                  <FiClock />
                  {appointment.HourFormatted}
                </span>
                <Link to={`/Clientes/${appointment.ClientID}`}>
                  <div>
                    <strong>
                      {appointment.Name} <p>{appointment.Description}</p>
                    </strong>

                    {appointment.AppointmentType === '0' && (
                      <img src={badgePreTalk} alt="PreTalk" />
                    )}
                    {appointment.AppointmentType === '1' && (
                      <img src={badgeSessao} alt="Sessao" />
                    )}
                  </div>
                </Link>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Noite</strong>

            {nightAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {nightAppointments.map(appointment => (
              <Appointment key={appointment.AppointmentID}>
                <span>
                  <FiClock />
                  {appointment.HourFormatted}
                </span>

                <Link to={`/Clientes/${appointment.ClientID}`}>
                  <div>
                    <strong>
                      {appointment.Name} <p>{appointment.Description}</p>
                    </strong>

                    {appointment.AppointmentType === '0' && (
                      <img src={badgePreTalk} alt="PreTalk" />
                    )}
                    {appointment.AppointmentType === '1' && (
                      <img src={badgeSessao} alt="Sessao" />
                    )}
                  </div>
                </Link>
              </Appointment>
            ))}
          </Section>
        </ScheduleComponent>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            modifiers={{
              available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDayChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
          <HeaderModal openModal={toggleModal} />
          <ModalAdd
            isOpen={modalOpen}
            setIsOpen={toggleModal}
            handleAdd={handleAdd}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Schedule;
