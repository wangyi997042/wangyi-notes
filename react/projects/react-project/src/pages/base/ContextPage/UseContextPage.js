import React, { useContext } from "react";
import { ThemeContext } from "./Context";

const UseContextPage = () => {
  const { themeColor } = useContext(ThemeContext);

  return <div style={{ color: themeColor }}>UseContextPage</div>;
};

export default UseContextPage;
