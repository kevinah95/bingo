import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ParticipantsTable from './ParticipantsTable';
import { Loading } from './Loading';
import helpers from './helpers';
import { Animated } from 'react-animated-css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      positions: [],
      winner: '',
      loading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    helpers.getParticipants().then(data => {
      this.setState({
        ...data,
        loading: false,
      });
    });
  }

  handleClick() {
    var rand012 = helpers.weightedRand(this.state.positions);

    this.setState({
      winner: rand012(),
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <div className="pure-g">
          <div className="pure-u-1 l-box">
            <button className="pure-button" onClick={() => this.handleClick()}>
              Let The Games Begin
            </button>

            <div>
              <h1>
                Winner:{' '}
                <Animated
                  animationIn="bounceInLeft"
                  animationInDelay={2}
                  animationOut="fadeOut"
                  isVisible={this.state.winner !== ''}
                >
                  {this.state.winner}
                </Animated>
              </h1>
            </div>
          </div>
          <div className="pure-u-1-2 l-box">
            <ParticipantsTable participants={this.state.participants} />
          </div>
          <div className="pure-u-1-2 l-box">
            <ParticipantsTable participants={this.state.positions} />
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
