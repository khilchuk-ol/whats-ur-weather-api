class InvalidUrlException {
  constructor(message, sender) {
    this.message = message;
    this.sender = sender;
  }

  toString = () => `InvalidUrlException: ${this.message}\n
                                Thrown by: ${this.sender}`;
}

export default InvalidUrlException;
