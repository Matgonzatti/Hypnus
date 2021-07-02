import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { ContainerMaster, Container, Error } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  sizePX?: string;
  label?: string;
  isNotLogin?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<InputProps> = ({
  name,
  icon: Icon,
  label,
  isNotLogin,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ContainerMaster isNotLogin={isNotLogin}>
      {label && <strong>{label}</strong>}
      <Container
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        isNotLogin={isNotLogin}
      >
        {Icon && <Icon size={20} />}
        <textarea
          rows={5}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" />
          </Error>
        )}
      </Container>
    </ContainerMaster>
  );
};

export default TextArea;
