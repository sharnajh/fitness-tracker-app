import React, { Component } from "react";
import { View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import Slider from "./Slider";
import Stepper from "./Stepper";
import DateHeader from "./DateHeader"

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };
  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };
  deccrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      };
    });
  };
  slide = (metric, newValue) => {
    this.setState(() => ({
      [metric]: newValue
    }));
  };
  render() {
    const metainfo = getMetricMetaInfo();
    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {Object.keys(metainfo).map(key => {
          const { getIcon, type, ...rest } = metainfo[key];
          const value = this.state[key];
          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <Slider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                value={value}
                onIncrement={(key) => this.increment(key)}
                onDecrement={(key) => this.deccrement(key)}
                {...rest} />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
