class LibErr extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StringValidator";
  }
}

export default LibErr;
