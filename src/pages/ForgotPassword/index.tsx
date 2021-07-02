import React, { useCallback, useRef } from 'react';
import { FiMail, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Informe o e-mail')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar recuperar sua senha',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Button type="submit">Recuperar</Button>

          <Link to="/">Voltar ao login</Link>
        </Form>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
