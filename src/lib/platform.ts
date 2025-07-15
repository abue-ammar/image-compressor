export function isTauri(): boolean {
  return "isTauri" in window && !!window.isTauri;
}

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

export function isTauriAndroid(): boolean {
  return isTauri() && isAndroid();
}
