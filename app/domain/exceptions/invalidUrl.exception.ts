class InvalidUrlException {
  message: string;
  sender: object;

  constructor(message: string, sender: object) {
    this.message = message;
    this.sender = sender;
  }

  toString = () => `InvalidUrlException: ${this.message}\n
                                Thrown by: ${this.sender}`;
}

export default InvalidUrlException;
