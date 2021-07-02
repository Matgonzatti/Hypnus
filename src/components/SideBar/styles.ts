import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 73px;
  background: #4d6c89;

  div {
    margin: 18px 11px;

    border-radius: 10%;
    height: 50px;
    width: 50px;

    svg {
      margin: 5px;
      color: #fff;
    }

    transition: background 0.2;

    &:hover {
      background: #fff;

      svg {
        color: #4d6c89;
      }
    }
  }
`;
