export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600); //convert seconds to hours
  const minutes = Math.floor((duration % 3600) / 60); // convert the remaining to minutes
  const seconds = duration % 60; // convert
  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')

  return timeString;
}