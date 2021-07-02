import styled from 'styled-components';

export const Container = styled.div`
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  background: white;
  padding: 50px;
  padding-bottom: 80px;
  width: 70%;
  height: 250px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  min-width: 240px;

  input[name='tab-control'] {
    display: none;
  }

  ul li {
    // font-family: "Montserrat";
    font-weight: bold;
    font-size: 18px;
    color: #4d6c89;

    box-sizing: border-box;
    flex: 1;
    width: 25%;
    padding: 0 10px;
    text-align: center;

    button {
      transition: all 0.3s ease-in-out;
      color: #929daf;
      padding: 5px auto;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      white-space: nowrap;
      -webkit-touch-callout: none;

      &:hover {
        outline: 0;
        color: #bec5cf;
      }

      &:focus {
        outline: 0;
        color: #bec5cf;
      }

      &:active {
        outline: 0;
        color: #bec5cf;
      }
    }
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
  }
`;

export const Slider = styled.div`
  position: relative;
  width: 25%;
  transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
`;

export const Indicator = styled.div`
  position: relative;
  width: 10px;
  max-width: 100%;
  margin: 0 auto;
  height: 4px;
  background: #4d6c89 !important;
  border-radius: 3px;
`;
