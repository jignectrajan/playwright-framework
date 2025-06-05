// stepLogger.ts
export function createStepLogger() {
  let step = 0;
  return (message: string) => {
    step++;
    console.log(`Step ${step}: ${message}`);
  };
}
