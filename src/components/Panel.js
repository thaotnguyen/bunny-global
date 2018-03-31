import React from 'react';

export default class Panel extends React.Component {

  onSelect = () => {
    this.props.handleSelect(this.props.name);
  }

  render() {
    return (
      <div 
        onClick={this.onSelect} 
        className={this.props.selected ? 'panel selected' : 'panel'}
        style={{ background: `url('img/${this.props.name}.png')`, 'background-size': 'contain' }}>
        <div className='tag'>{this.props.tag}</div>
        <div className='name'>{this.props.name}</div>
        <div className='votes'>{this.props.votes} vote{this.props.votes === 1 ? '' : 's'}</div>
      </div>
    );
  }
}