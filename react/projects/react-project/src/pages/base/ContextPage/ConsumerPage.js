import React, { useContext } from "react";
import { UserContext, UserConsumer, ThemeConsumer } from "./Context";

const ConsumerPage = (props) => {
  const { name } = useContext(UserContext);
  console.log("consumer====", props, UserConsumer, ThemeConsumer);

  return <div><ThemeConsumer>
    {
      themeContext => {
        console.log(themeContext)
        return <div style={{color: themeContext.themeColor}}>
          <UserConsumer>
            {
              userContext => {
                return <span>{userContext.name}</span>
              }
            }
          </UserConsumer>
        </div>
      }
    }</ThemeConsumer></div>;
};

export default ConsumerPage;
