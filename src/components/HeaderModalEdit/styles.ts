import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #4d6c89;
  padding: 30px 0;
  header {
    margin: 0 auto;
    /* padding: 0 0 160px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          color: #fff;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 10vw;
          padding: 16px 16px;
          div {
            background: #4d6c89;
          }
          .text {
            padding: 7px 19px;
          }
          .icon {
            display: flex;
            padding: 16px 16px;
            background: #4d6c89;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
        }
      }
    }
  }
`;
