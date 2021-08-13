export const shortString = (str: string, length: number) =>
  str.length >= length ? `${str.substring(0, length)}........` : str
