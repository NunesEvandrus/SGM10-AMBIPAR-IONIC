export function Sleep(timeout: number = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
