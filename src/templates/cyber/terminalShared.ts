import { createContext, useCallback, useState } from 'react';

export const TERMINAL_BOOT_KEY = 'asbrnn:terminal-boot';

/** False while the boot log covers the page, so commands don't type unseen. */
export const TerminalLiveContext = createContext(true);

/** Tracks which sections have finished typing their command. */
export function useCommandSteps() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const finish = useCallback((key: string) => setDone((d) => (d[key] ? d : { ...d, [key]: true })), []);
  return { done, finish };
}
