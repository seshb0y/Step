import React from "react";

interface CountdownTimerProps {
  initialTime: number;
}

interface CountdownTimerState {
  timeLeft: number;
  timerId: number | null; 
}

class CountdownTimer extends React.Component<CountdownTimerProps, CountdownTimerState> {
  constructor(props: CountdownTimerProps) {
    super(props);
    this.state = {
      timeLeft: props.initialTime || 0,
      timerId: null,
    };
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentDidUpdate(prevProps: CountdownTimerProps, prevState: CountdownTimerState) {
    if (prevProps.initialTime !== this.props.initialTime) {
      this.setState({ timeLeft: this.props.initialTime }, () => {
        this.startCountdown();
      });
    }
    if (prevState.timeLeft !== this.state.timeLeft && this.state.timeLeft === 0) {
      this.stopCountdown();
      alert("Time is up!");
    }
  }

  componentWillUnmount() {
    this.stopCountdown();
  }

  startCountdown = () => {
    this.stopCountdown();
    const timerId = window.setInterval(() => {
      this.setState((prevState) => ({
        timeLeft: Math.max(prevState.timeLeft - 1, 0),
      }));
    }, 1000);
    this.setState({ timerId });
  };

  stopCountdown = () => {
    if (this.state.timerId !== null) {
      window.clearInterval(this.state.timerId);  // Используем clearInterval с window
      this.setState({ timerId: null });
    }
  };

  render() {
    const { timeLeft } = this.state;

    return (
      <div>
        <h1>Countdown Timer</h1>
        <h2>Time Left: {timeLeft} seconds</h2>
      </div>
    );
  }
}

export default CountdownTimer;
