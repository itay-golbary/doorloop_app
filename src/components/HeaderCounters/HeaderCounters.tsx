import React, { useMemo } from "react";
import styled from "styled-components";

import HeaderGroupText from "./components/HeaderGroupText";
import HeaderPairText from "./components/HeaderPairText";

import { getStringifyValues, GetStringifyValuesProps } from "./utils";

interface Props extends GetStringifyValuesProps {
  onReset: () => void;
}

const HeaderCounters = ({ countdown, countsState, onReset }: Props) => {
  const values = useMemo(
    () =>
      getStringifyValues({
        countdown,
        countsState,
      }),
    [countdown, countsState],
  );

  return (
    <StyledContainer>
      <HeaderGroupText
        title={"Words"}
        completedPerMinute={values.words.completedPerMinute}
        percentageCorrect={values.words.percentageCorrect}
      />
      <HeaderGroupText
        title={"Chars"}
        completedPerMinute={values.chars?.completedPerMinute}
        percentageCorrect={values.chars?.percentageCorrect}
      />

      <div className='HeaderCounters__countdownContainer'>
        <HeaderPairText name={"Time Left"} value={countdown.toString()} />

        <button onClick={onReset}>Reset</button>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  > div {
    margin-inline: 16px;
  }

  .HeaderCounters__countdownContainer {
    width: 240px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    * {
      margin-inline: 8px;
    }
  }
`;

export default HeaderCounters;
