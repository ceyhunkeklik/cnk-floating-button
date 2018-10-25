import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

const defaultSize = 80;
const transitionTime = 0.4;
const innerButtonDefaultBackgroundColor = "#E91E63";
const innerButtonDefaultHoverColor = "#880E4F";
const innerButtonDefaultColor = "#fafafa";
const mainButtonFontSize = "20px";
const innerButtonFontSize = "18px";

class CK_Floating_Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onHover: false,
      onHover1: false,
      onHover2: false,
      onHover3: false,
      onHover4: false,
      source: [
        props.button1 || {},
        props.button2 || {},
        props.button3 || {},
        props.button4 || {}
      ],
      styles: this.initStyle()
    };

    if (!props.button1 && !props.button2 && !props.button3 && !props.button4) {
      throw new Error("At least one button configuration must be valid.");
    }
  }

  initStyle = () => {
    const width = this.props.size || defaultSize;

    const defaultStyles = {
      wrapper: {
        position: "relative",
        width: `${width}px`,
        height: `${width}px`,
        borderRadius: `${width}px`,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        boxSizing: "border-box",
        transition: `width ${transitionTime}s, height ${transitionTime}s`
      },
      wrapperHover: {
        width: `${width * 2 + 20}px`,
        height: `${width * 2 + 20}px`,
        borderRadius: "0"
      },
      innerButton: {
        backgroundColor: innerButtonDefaultBackgroundColor,
        flexBasis: "50%",
        width: `${width / 2}px`,
        height: `${width / 2}px`,
        transition: `all ${transitionTime}s, opacity ${transitionTime / 2}s`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: innerButtonDefaultColor,
        cursor: "pointer",
        userSelect: "none",
        overflow: "hidden"
      },
      hidden: {
        opacity: 0,
        pointerEvents: "none"
      },
      innerButtonHover: {
        flexBasis: "calc(50% - 20px)",
        margin: "5px",
        width: `${width}px`,
        height: `${width - 10}px`,
        borderRadius: `${width / 2}px`
      },
      innerButton0: {
        borderRadius: `${width / 2}px 0px 0px 0px`
      },
      innerButton1: {
        borderRadius: `0px ${width / 2}px 0px 0px`
      },
      innerButton2: {
        borderRadius: `0px 0px 0px ${width / 2}px`
      },
      innerButton3: {
        borderRadius: `0px 0px ${width / 2}px 0px`
      },
      innerButtonHover0: {
        backgroundColor: innerButtonDefaultHoverColor
      },
      innerButtonHover1: {
        backgroundColor: innerButtonDefaultHoverColor
      },
      innerButtonHover2: {
        backgroundColor: innerButtonDefaultHoverColor
      },
      innerButtonHover3: {
        backgroundColor: innerButtonDefaultHoverColor
      },
      text: {
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        transition: `all ${transitionTime / 2}s`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: innerButtonDefaultColor,
        fontSize: mainButtonFontSize,
        overflow: "hidden"
      },
      textHover: {
        opacity: 0,
        width: 0,
        height: 0
      },
      icon: {
        margin: 0
      },
      innerText: {
        fontSize: innerButtonFontSize
      }
    };

    return defaultStyles;
  };

  render() {
    const { text, iconName, fontSize } = this.props;
    const { onHover, source, styles } = this.state;

    return (
      <div
        style={{
          ...styles.wrapper,
          ...(onHover ? styles.wrapperHover : {})
        }}
        onMouseEnter={() => {
          this.setState({ onHover: true });
        }}
        onMouseLeave={() => {
          this.setState({ onHover: false });
        }}
      >
        <div
          style={{
            ...styles.text,
            ...(onHover ? styles.textHover : {}),
            ...(fontSize ? { fontSize: `${fontSize}px` } : {})
          }}
        >
          {iconName ? (
            <Icon style={styles.icon} name={iconName} />
          ) : text ? (
            text
          ) : (
            " "
          )}
        </div>
        {source.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                ...styles.innerButton,
                ...styles[`innerButton${index}`],
                ...(onHover ? styles.innerButtonHover : {}),
                ...(onHover && !item.onClick ? styles.hidden : {}),
                ...(this.state[`onHover${index}`]
                  ? styles[`innerButtonHover${index}`]
                  : {}),
                ...(onHover && item.backgroundColor
                  ? { backgroundColor: item.backgroundColor }
                  : {}),
                ...(onHover && item.foregroundColor
                  ? { color: item.foregroundColor }
                  : {}),
                ...(this.state[`onHover${index}`] && item.hoverBackgroundColor
                  ? { backgroundColor: item.hoverBackgroundColor }
                  : {})
              }}
              onMouseEnter={() => {
                this.setState({ ["onHover" + index]: true });
              }}
              onMouseLeave={() => {
                this.setState({ ["onHover" + index]: false });
              }}
              onClick={() => {
                item.onClick(item, index);
              }}
            >
              <span
                style={{
                  ...(!onHover ? styles.hidden : {}),
                  ...styles.innerText,
                  ...(onHover && item.fontSize
                    ? { fontSize: item.fontSize }
                    : {})
                }}
              >
                {item.iconName ? (
                  <Icon style={styles.icon} name={item.iconName} />
                ) : item.text ? (
                  item.text
                ) : (
                  " "
                )}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

const buttonDef = PropTypes.shape({
  text: PropTypes.string,
  iconName: PropTypes.string,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  fontSize: PropTypes.number,
  onClick: PropTypes.func
});

CK_Floating_Button.propTypes = {
  text: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  button1: buttonDef,
  button2: buttonDef,
  button3: buttonDef,
  button4: buttonDef
};

export default CK_Floating_Button;
