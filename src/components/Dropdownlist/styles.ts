import styled, { css } from 'styled-components';

interface ContainerProps {
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  color: #757575;
  height: 50px;
  border-radius: 10px;
  background: #fff;
  border: 2px solid #f6f6f6;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;
  margin-top: 8px;

  transition: border-color 0.3s;

  border-color: #c2cfdc;

  & + div {
    margin-left: 10px;
  }

  /* ${props =>
    props.isFilled &&
    css`
      color: #3b70a2;
      border-color: #3b70a2;
    `} */

  select {
    cursor: pointer;
    background: transparent; /* importante para exibir o novo ícone */
    width: 268px;
    padding: 5px;
    font-size: 16px;
    line-height: 1;
    border: 0;
    border-radius: 0;
    height: 34px;
    -webkit-appearance: none;

    .select-items {
      background: transparent;
      width: 268px;
      padding: 5px;
      font-size: 16px;
      line-height: 1;
      border: 0;
      border-radius: 0;
      height: 34px;
      -webkit-appearance: none;
    }

    &:after {
      border-color: transparent transparent #fff transparent;
      top: 7px;
    }
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
