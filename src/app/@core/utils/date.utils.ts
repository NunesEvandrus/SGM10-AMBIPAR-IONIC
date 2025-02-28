export const CurrentIsoDate = (daysMovement?: number) => {
  const date = new Date();

  if (daysMovement) {
    date.setDate(date.getDate() + daysMovement);
  }

  const year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${year}-${month}-${day}`;
};

export const FormatSecondsToDuration = (totalSeconds: number) => {
  if (!totalSeconds) {
    return '';
  }

  let seconds: string | number = totalSeconds % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  let minutes: string | number = Math.floor(totalSeconds / 60);
  minutes = minutes < 10 ? '0' + minutes : seconds;
  let hours: string | number = Math.floor(totalSeconds / 3600);
  hours = hours < 10 ? '0' + hours : seconds;

  return `${hours}:${minutes}:${seconds}`;
};
