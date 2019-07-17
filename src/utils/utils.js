export const millisecondsToTimeString = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  const units = [['year', 31536000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];

  const timeChunks = units.map(([unit, value]) => {
    const q = Math.floor(seconds / value);
    if (q) {
      seconds %= value;
      return `${q} ${unit}${(q > 1 ? 's' : '')}`;
    } else return null;
  }).filter(e => e);

  //return timeChunks.reduce((timeStr, chunk, index) => {
    //if (index === timeChunks.length - 1) return timeStr + chunk;
    //if (index === timeChunks.length - 2) return timeStr + chunk + ' and ';
    //return timeStr + chunk + ', ';
  //}, '');
  return timeChunks[0];
};
