export const logger = {
  info: (message: string, ...args: any[]) => {
    const formatted = `\x1b[34m[INFO]\x1b[0m ${message} ` + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
    process.stdout.write(formatted);
  },
  success: (message: string, ...args: any[]) => {
    const formatted = `\x1b[32m[SUCCESS]\x1b[0m ${message} ` + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
    process.stdout.write(formatted);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`, ...args);
  }
};
