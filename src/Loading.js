import React from 'react';

export class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading',
    };
  }
  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = setInterval(() => {
      this.state.text === stopper
        ? this.setState({ text: 'Loading' })
        : this.setState(currentState => ({
            text: currentState.text + '.',
          }));
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
}
