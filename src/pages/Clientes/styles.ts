import styled, { css } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 10px 0;
  background: #ffffff;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;

  > img {
    height: 80px;
  }

  button {
    margin-left: 10px;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }
`;

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
          align-items: center;
          justify-content: space-between;

          h1 {
            margin-bottom: 18px;
            margin-left: 20px;
            margin-top: 20px;
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

            /* svg {
              margin-left: -6px;
              margin-top: 2px;
            } */
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

            /* svg {
              margin-left: -9px;
              margin-top: 3px;
            } */
          }
        }
      }
    }
  }
`;

export const TabSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const TableContainer = styled.div`
  margin-top: 20px;
  margin-left: 85px;
  width: 17vw;

  table {
    width: 100%;
    border-spacing: 0 4px;

    tbody {
      overflow-y: hidden;
    }

    thead {
      th {
        background: #4d6c89;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        color: #fff;
        font-size: 22px;
      }
    }

    th {
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      display: flex;
      // padding: 13px 27px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #323232;
      border-radius: 8px;
      transition: background 0.4s, color 0.4s;
      cursor: pointer;

      &:hover {
        background: #8fb1d0;
        color: #fff;
      }

      button {
        flex: 1;
        border: 0;
        background: #fff;
        color: #323232;
        height: 47px;
        text-align: left;
        padding-left: 14px;
        border-radius: 8px;
        transition: background 0.4s, color 0.4s;

        &:hover {
          background: #8fb1d0;
          color: #fff;
        }
      }
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;

  margin-top: 24px;
  margin-left: 20px;

  div {
    h1 {
      color: #4c4b4b;
    }
  }
`;

interface CardAppointmentProps {
  isAfter: boolean;
}

export const CardAppointment = styled.div<CardAppointmentProps>`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    /* margin-left: auto; */
    display: flex;
    align-items: center;
    color: #323232;
    width: 70px;

    svg {
      margin-right: 8px;

      color: #5ab96a;

      ${props =>
        !props.isAfter &&
        css`
          color: #4d6c89;
        `}
    }
  }

  a {
    width: 100%;
    text-decoration: none;
  }

  div {
    flex: 1;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    padding: 14px 24px;
    border-radius: 10px;
    // margin-left: 24px;

    img {
      max-width: 63px;
      height: 22px;
    }

    strong {
      color: #323232;
      width: 90%;

      p {
        color: #323232;
        font-size: 13px;
      }
    }
  }
`;
