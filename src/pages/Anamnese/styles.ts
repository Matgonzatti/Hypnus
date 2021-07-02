import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;

  > form {
    flex: 1;
    width: 73vw;
    color: #4d6c89;
    max-height: 85vh;
    overflow-y: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    button {
      width: 200px;
    }

    div {
      > div {
        /* width: 73vw; */

        > p {
          width: 69vw;
        }

        > div {
          display: flex;
          align-items: flex-start;
          /* justify-content: space-between; */

          h1 {
            margin-bottom: 18px;
            margin-left: 20px;
            margin-top: 20px;
            width: 350vw;
          }

          button[type='submit'] {
            margin-bottom: 18px;
            margin-right: 58px;
            border-radius: 5%;
            width: 100px;
            height: 40px;

            &:hover {
              background: ${shade(0.2, '#3b70a2')};
            }
          }

          .button-c {
            margin-bottom: 18px;
            margin-right: 14px;
            border-radius: 5%;
            width: 100px;
            height: 40px;

            &:hover {
              background: ${shade(0.2, '#3b70a2')};
            }
          }
        }
      }
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;

  margin-top: 24px;
  margin-left: 95px;

  div {
    h1 {
      color: #4c4b4b;
    }
  }

  > div {
    width: 73vw;
  }
`;

export const TabSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center !important;
  width: 95%;
  margin-left: 22px;
`;
