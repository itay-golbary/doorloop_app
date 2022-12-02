import React from "react";
import styled from "styled-components";

import HeaderPairText from "./HeaderPairText";

interface HeaderGroupTextProps {
  completedPerMinute: string;
  percentageCorrect: string;
}

interface Props extends HeaderGroupTextProps {
  title: string;
}

const HeaderGroupText = ({ title, completedPerMinute, percentageCorrect }: Props) => {
  return (
    <StyledContainer>
      <h3>{title}</h3>

      <HeaderPairText name={`${title} Per Minutes`} value={completedPerMinute} />
      <HeaderPairText name={`Correct ${title} Percentage`} value={percentageCorrect} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: calc((100vw - 240px) / 2);
`;

export { HeaderGroupTextProps };
export default HeaderGroupText;
