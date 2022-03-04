export function secToMin(sec: number) {
  return (sec / 60).toFixed(2);
}

export function formatSec(sec: number) {
  const _min = Math.floor(sec / 60);
  const _sec = sec % 60;

  if (_sec == 0) {
    return `${_min} dakika`;
  } else if (_min == 0) {
    return `${_sec} saniye`;
  } else if (_min == 0 && _sec == 0) {
    return 0;
  } else {
    return `${_min} dakika ve  ${_sec} saniye`;
  }
}
