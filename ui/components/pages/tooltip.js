import React, { Component } from 'react';

class YourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: null,
      tooltip: {
        show: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        prefer: 'AutoTooltip.preferRight',
      },
    };
  }

  componentDidMount() {
    this.setState({
      container: document.querySelector('#tooltip-container'),
    });
  }

  onMouseOver = (evt) => {
    const { top, left, width, height } = evt.target.getBoundingClientRect();

    this.setState({
      tooltip: {
        show: true,
        x: top,
        y: left,
        width,
        height,
        prefer: 'AutoTooltip.preferRight',
      },
    });
  };

  onMouseLeave = () => {
    this.setState({
      tooltip: {
        show: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        prefer: 'AutoTooltip.preferRight',
      },
    });
  };

  render() {
    const { tooltip, container } = this.state;

    return (
      <div>
        <button onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}></button>
        <AutoTooltip show={tooltip.show} container={container} />
      </div>
    );
  }
}

export default YourComponent;
