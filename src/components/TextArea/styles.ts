import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isNotLogin?: boolean;
}

export const Container = styled.div<ContainerProps>`
  color: #757575;
  border-radius: 10px;
  background: #f6f6f6;
  border: 2px solid #f6f6f6;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;
  margin-top: 8px;

  border-color: #c2cfdc;

  ${props =>
    !props.isNotLogin &&
    css`
      & + div {
        margin-left: 10px;
      }
    `}

  transition: border-color 0.3s;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${shade(0.2, '#84a4c3')};
      border-color: ${shade(0.2, '#84a4c3')};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #84a4c3;
      border-color: #84a4c3;
    `}

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
  }

  > svg {
    margin-right: 16px;
  }
`;

interface ContainerMasterProps {
  isNotLogin?: boolean;
}

export const ContainerMaster = styled.div<ContainerMasterProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  strong {
    color: #4c4b4b;
  }

  ${props =>
    !props.isNotLogin &&
    css`
      & + div {
        margin-left: 10px;
      }
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin-right: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
