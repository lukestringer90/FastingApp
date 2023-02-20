import moment from 'moment';

export enum FastState {
  NotStarted,
  Started,
  Finished,
}

export class Fast {
  start: Nullable<moment.Moment>;
  end: Nullable<moment.Moment>;

  clone() {
    return new Fast(this.start, this.end);
  }

  constructor(start: Nullable<moment.Moment>, end: Nullable<moment.Moment>) {
    this.start = start;
    this.end = end;
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
