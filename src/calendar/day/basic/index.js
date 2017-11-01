import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import styleConstructor from './style';

class Day extends Component {
  static propTypes = {
    // TODO: selected + disabled props should be removed
    state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marked: PropTypes.any,
    onPress: PropTypes.func,
    markingExists: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    return ['state', 'children', 'marked', 'onPress', 'markingExists'].reduce((prev, next) => {
      if (prev || nextProps[next] !== this.props[next]) {
        return true;
      }
      return prev;
    }, false);
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];
    const priceStyle = [this.style.priceStyle];
    const remarkStyle = [this.style.remark];

    let marked = this.props.marked || {};
    if (marked && marked.constructor === Array && marked.length) {
      marked = {
        marked: true
      };
    }
    let dot, price, remark;
    if (marked.marked) {
      dotStyle.push(this.style.visibleDot);
      dot = (<View style={dotStyle}/>);
    }if(marked.price){
      price = (<Text numberOfLines = {1} style={priceStyle}>{`¥${marked.price}`}</Text>)
    }
    if(marked.remark){
      remark = (<Text numberOfLines = {1} style={remarkStyle}>{`${marked.remark}`}</Text>)
    }
    if (!this.props.markingExists) {
      textStyle.push(this.style.alignedText);
    }

    if (this.props.state === 'selected' || marked.selected) {
      containerStyle.push(this.style.selected);
      dotStyle.push(this.style.selectedDot);
      textStyle.push(this.style.selectedText);
      priceStyle.push(this.style.selectedText);
      remarkStyle.push(this.style.selectedText);
    } else if (this.props.state === 'disabled' || marked.disabled) {
      textStyle.push(this.style.disabledText);
      priceStyle.push(this.style.disabledText);
      remarkStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      textStyle.push(this.style.todayText);
    }
    return (
      <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
        <Text style={textStyle}>{String(this.props.children)}</Text>
        {price}
        {remark}
        {dot}
      </TouchableOpacity>
    );
  }
}

export default Day;
