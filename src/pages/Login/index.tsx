import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface LoginFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, company, login } = useAuth();
  const { addToast, removeToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Informe o e-mail')
            .email('Digite um e-mail válido'),
          senha: Yup.string().required('Informe a senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await login({
          email: data.email,
          senha: data.senha,
        });

        history.push('/Schedule');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer o login, cheque as credenciais',
          type: 'error',
        });
      }
    },
    [login, addToast, history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Hypnus</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" isNotLogin />
          <Input
            name="senha"
            icon={FiLock}
            placeholder="Senha"
            type="password"
            isNotLogin
          />

          <Button type="submit">Acessar</Button>

          <Link to="/forgot-password">Esqueci minha senha</Link>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
