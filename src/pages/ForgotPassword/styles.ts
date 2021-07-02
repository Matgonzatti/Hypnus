import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 80vh;

  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  place-content: center;
  align-items: center;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #535353;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#535353')};
      }
    }
  }
`;
