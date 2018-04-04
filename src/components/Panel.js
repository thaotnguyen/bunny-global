import React from 'react';

export default class Panel extends React.Component {

  onSelect = () => {
    this.props.handleSelect(this.props.name);
  }

  displayVotes = (props) => {
    if (props.status === 'in') {
      return 'CONFIRMED';
    } else if (props.status === 'out') {
      return 'ELIMINATED';
    } else if (props.status === 'pending') {
      return `${props.votes} vote${props.votes === 1 ? '' : 's'}`;
    } else {
      return `${props.votes} vote${props.votes === 1 ? '' : 's'}`;
    }
  }

  render() {
    return (
      <div 
        onClick={this.onSelect} 
        className={this.props.selected ? 'panel selected' : 'panel'}
        style={{ 
          background: `url('img/${this.props.name}.png')`, 
          backgroundSize: 'contain', 
          WebkitFilter: `grayscale(${this.props.status === 'out' ? '10' : '0'}0%)`,
          filter: `grayscale(${this.props.status === 'out' ? '10' : '0'}0%)`}}>
        <div className={this.props.tagColor}>{this.props.tag}</div>
        <div className='name'>{this.props.name}</div>
        <div className='votes'>
          {this.displayVotes(this.props)}
        </div>
      </div>
    );
  }
}