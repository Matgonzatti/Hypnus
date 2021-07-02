import styled from 'styled-components';
import { shade } from 'polished';
import { ButtonHTMLAttributes } from 'react';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 50px 100px;
  display: flex;
`;

export const ScheduleComponent = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
    color: #484848;
  }

  p {
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: #3b70a2;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #3b70a2;
      margin: 0 8px;
    }
  }
`;

export const NextAppointments = styled.div`
  margin-top: 64px;

  strong {
    font-size: 20px;
    font-weight: 400;
    color: #484848;
  }

  a {
    text-decoration: none;
    transition: margin-right 0.2s;

    &:hover {
      margin-right: 20px;
    }
  }

  div {
    background: #4d6c89;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    /* &::before {
      position: absolute;
      border-radius: 10px;
      height: 60%;
      width: 2px;
      left: 0;
      top: 20%;
      content: '';
      background: #3b70a2;
    } */

    img {
      max-width: 63px;
      height: 22px;
      margin-right: 20px;
    }

    strong {
      color: #fff;

      p {
        color: #fff;
        font-size: 14px;
      }
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #fff;

      svg {
        margin-right: 8px;
        color: #fff;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #484848;
    font-size: 16px;
    line-height: 26px;
    border-bottom: 1px solid #3e3c47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
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
      color: #4d6c89;
    }
  }

  a {
    width: 100%;
    text-decoration: none;
  }

  div {
    flex: 1;
    background: #4d6c89;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      max-width: 63px;
      height: 22px;
    }

    strong {
      color: #fcfffd;
      width: 90%;

      p {
        color: #fff;
        font-size: 13px;
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #f0f0f5;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #323232 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
    color: #323232;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #f0f0f5;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #323232;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #f0f0f5;
    border-radius: 10px;
    color: #323232;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: #4d6c89;
    color: #fff !important;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #93abbb !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #4d6c89 !important;
    border-radius: 10px;
    color: #fff !important;
  }
`;
