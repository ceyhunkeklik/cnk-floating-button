import React from "react";
import { render } from "react-dom";
import CNKFloatingButton from "../../src";

const buttonConfigurations = {
  button1: {
    iconName: "home",
    onClick: () => {
      console.log("Button1: Clicked");
    }
  },
  button2: {
    iconName: "phone",
    onClick: () => {
      console.log("Button2: Clicked");
    }
  },
  button3: {
    iconName: "envelope",
    onClick: () => {
      console.log("Button3: Clicked");
    }
  },
  button4: {
    iconName: "star",
    onClick: () => {
      console.log("Button4: Clicked");
    }
  }
};

const App = () => (
  <CNKFloatingButton
    iconName="sidebar"
    button1={buttonConfigurations.button1}
    button2={buttonConfigurations.button2}
    button3={buttonConfigurations.button3}
    button4={buttonConfigurations.button4}
  />
);
render(<App />, document.getElementById("root"));
