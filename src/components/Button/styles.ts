import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border-radius: 10px;
  height: 56px;
  background: #3b70a2;
  border: 0;
  /* padding: 0 16px; */
  color: #ffffff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#3b70a2')};
  }
`;
