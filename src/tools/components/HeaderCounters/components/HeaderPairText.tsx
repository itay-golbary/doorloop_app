import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  value: string;
}

const HeaderPairText = ({ name, value }: Props) => {
  return (
    <StyledContainer>
      <a>{name + ":"}</a>
      <a className='HeaderPairText__value'>{value}</a>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  .HeaderPairText__value {
    font-weight: bold;
    color: blue;
    margin-inline-start: 4px;
  }
`;

export default HeaderPairText;
