import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/Toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const transations = useTransition(messages, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
    keys: (message) => message.id,
  });

  return (
    <Container>
      {transations((style, item) => (
        <Toast key={item.id} style={style} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
