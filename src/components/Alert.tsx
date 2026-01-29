import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AlertWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 16%;
  z-index: 9999;
  transform: translateX(-50%);
  background: #fff8e6;
  color: #7c5c36;
  border: 2px solid #e0c9a6;
  border-radius: 12px;
  box-shadow: 0 4px 18px 0 rgba(224,201,166,0.13);
  padding: 18px 32px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  min-width: 180px;
  text-align: center;
  animation: ${fadeIn} 0.2s;
`;

export interface AlertProps {
  open: boolean;
  message: string;
  onClose?: () => void;
  duration?: number; // ms
}

const Alert: React.FC<AlertProps> = ({ open, message, onClose, duration = 1800 }) => {
  React.useEffect(() => {
    if (open && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration]);

  if (!open) return null;
  return <AlertWrapper>{message}</AlertWrapper>;
};

export default Alert;
