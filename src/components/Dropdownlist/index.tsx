import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import { ContainerMaster, Container } from './styles';

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  items: Items[];
  name: string;
  label?: string;
  isNotLogin?: boolean;
}

interface Items {
  value: string;
  text: string;
}

const DropDown: React.FC<InputProps> = ({
  name,
  items,
  isNotLogin,
  label,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField } = useField(name);

  const handleSelectBlur = useCallback(() => {
    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ContainerMaster isNotLogin={isNotLogin}>
      {label && <strong>{label}</strong>}
      <Container isFilled={isFilled}>
        <select
          ref={selectRef}
          name={name}
          {...rest}
          onChange={handleSelectBlur}
        >
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </Container>
    </ContainerMaster>
  );
};

export default DropDown;
