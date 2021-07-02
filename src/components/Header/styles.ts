import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderComponent = styled.header`
  padding: 10px 0;
  background: #4d6c89;
`;

export const HeaderContent = styled.div`
  //max-width: 1120px;
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
      color: #fff;
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
