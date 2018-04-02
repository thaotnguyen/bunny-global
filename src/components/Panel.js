import React from 'react';

export default class Panel extends React.Component {

  onSelect = () => {
    this.props.handleSelect(this.props.name);
  }

  displayVotes = (props) => {
    if (props.status === 'in') {
      return 'CONFIRMED';
    } else if (props.status === 'out') {
      return `${props.votes} vote${props.votes === 1 ? '' : 's'}`;
    } else {
      return `SAFE`;
    }
  }

  render() {
    return (
      <div 
        onClick={this.onSelect} 
        className={this.props.selected ? 'panel selected' : 'panel'}
        style={{ background: `url('img/${this.props.name}.png')`, 'background-size': 'contain' }}>
        <div className={this.props.tagColor}>{this.props.tag}</div>
        <div className='name'>{this.props.name}</div>
        <div className='votes'>
          {this.displayVotes(this.props)}
        </div>
      </div>
    );
  }
}