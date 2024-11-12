import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErros';
import LogoImg from '../../assets/1587470753970-attachment/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().min(6, 'No minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="GoBarber" />
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
