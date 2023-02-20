import moment from 'moment';

enum FastState {
  NotStarted,
  Started,
  Finished,
}

export class Fast {
  start: Nullable<moment.Moment> = null;
  end: Nullable<moment.Moment> = null;

  // Get the next Fast in the state machine
  next() {
    let newFast = new Fast();
    newFast.start = this.start;
    newFast.end = this.end;
    switch (this.state()) {
      case FastState.NotStarted: {
        newFast.start = moment();
        break;
      }
      case FastState.Started: {
        newFast.end = moment();
        break;
      }
      case FastState.Finished: {
        newFast.start = moment();
        newFast.end = null;
        break;
      }
    }

    return newFast;
  }

  state() {
    if (this.start == null && this.end == null) {
      return FastState.NotStarted;
    } else if (this.start != null && this.end == null) {
      return FastState.Started;
    } else {
      return FastState.Finished;
    }
  }

  buttonText() {
    return this.state() === FastState.Started
      ? 'Stop Fasting'
      : 'Start Fasting';
  }

  timeText() {
    if (this.state() === FastState.NotStarted) {
      return null;
    }

    const endDateToUse = this.end ?? moment();
    const duration = endDateToUse.from(this.start, true);

    if (this.state() === FastState.Started) {
      return `Fasted for ${duration} ⏳`;
    }
    return `Fast of ${duration} finished 🥣`;
  }
}
