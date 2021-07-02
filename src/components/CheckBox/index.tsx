import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const CheckBox: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <strong>{label}</strong>
      <label>
        <input
          autoComplete="off"
          type="checkbox"
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </label>
    </Container>
  );
};

export default CheckBox;
