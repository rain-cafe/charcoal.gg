export type Context<T extends Record<string, string> = Record<string, string>> = {
  params: T;
};
