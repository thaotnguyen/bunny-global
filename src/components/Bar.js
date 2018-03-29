import React from 'react';

export default class Bar extends React.Component {

  setDimensions = (props, colorArray) => {
    if (window.matchMedia("(max-width: 1000px").matches || window.matchMedia("max-device-width: 1000px").matches) {
      return {
        background: colorArray[props.id % colorArray.length],
        width: `${props.votes*100 / props.maxSize}vw`
      }
    } else {
      return {
        background: colorArray[props.id % colorArray.length],
        height: `${props.votes*100 / props.maxSize}vh`
      }
    }
    
  }

  render() {
    const colorArray = [
      '#a487ba',
      '#dc4b89',
      '#c9342f',
      '#bd5c14',
      '#1a858e',
      '#0077b5',
      '#b98d27',
      '#c73774',
      '#5b912d',
    ];
    console.log(this.setDimensions(this.props, colorArray));
    return (
      <div className='bar'>
        <div className='bar__details'>
          <span className='tag'>{ this.props.tag } </span>
          <span className='votes_count'>{ this.props.votes } votes</span>
        </div>
        <div className='votes' style={this.setDimensions(this.props, colorArray)}></div>
      </div>
    );
  }
}