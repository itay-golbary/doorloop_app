import React from "react";

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
    <div>
      <h3>{title}</h3>

      <HeaderPairText name={`${title} Per Minutes`} value={completedPerMinute} />
      <HeaderPairText name={`Correct ${title} Percentage`} value={percentageCorrect} />
    </div>
  );
};

export { HeaderGroupTextProps };
export default HeaderGroupText;
