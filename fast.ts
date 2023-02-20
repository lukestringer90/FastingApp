import moment from 'moment';

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

  buttonText() {
    const getText = () => {
      // First launch
      if (this.start == null && this.end == null) {
        return 'Start Fasting';
      }
      // Current fasting
      else if (this.start != null && this.end == null) {
        return 'Stop Fasting';
      }

      // startDate != null && endDate != null
      // Finished
      return 'Start Fasting';
    };
    const text = getText();
    console.log(`Button Text: ${text}`);
    return text;
  }

  timeText() {
    const getText = () => {
      // No time started, ever
      if (this.start == null && this.end == null) {
        return null;
      }

      const endDateToUse = this.end ?? moment();
      const duration = endDateToUse.from(this.start, true);

      // Currently fasting
      if (this.start != null && this.end == null) {
        return `Fasted for ${duration} ⏳`;
      }
      // Finished fasting
      else if (this.start != null && this.end != null) {
        return `Fast of ${duration} finished 🥣`;
      }

      return '';
    };

    const text = getText();
    console.log(`Time Text: ${text}`);
    return text;
  }
}
