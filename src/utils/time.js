
const tow = (n) => {

  return n >= 0 && n < 10 ? '0' + n : '' + n;

}
export const getPoolLeftTime = (time) => {
  if (time) {
    const date = new Date(time * 1000);
    const now = new Date();
    const lefttime = date - now;
    if (lefttime > 0) {
      let leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24));
      let lefth = tow(Math.floor(lefttime / (1000 * 60 * 60) % 24));
      let leftm = tow(Math.floor(lefttime / (1000 * 60) % 60));
      let lefts = tow(Math.floor(lefttime / 1000 % 60));
      const left = {
        days: leftd,
        hours: lefth,
        minutes: leftm,
        seconds: lefts,
      };
      return left
    }
  }
}

export const getTime = (endTime, startTime) => {
  if (!endTime) {
    return
  }
  let time = 0
  const now = Date.now();

  if (startTime) {
    time = parseInt((endTime - startTime) / 1000)
  } else {
    time = parseInt((endTime - now) / 1000)
  }

  return time;
}
