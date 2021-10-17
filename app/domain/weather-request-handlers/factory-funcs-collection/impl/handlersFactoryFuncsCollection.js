import HandlersFactoryFuncsCollectionAbstr from "../abstr/handlersFactoryFuncsCollection.abstr";

class HandlersFactoryFuncsCollection extends HandlersFactoryFuncsCollectionAbstr {
  constructor() {
    this.funcs = {};
  }

  register = (handlerName, createHandlerFunc) => {
    this.funcs[handlerName] = createHandlerFunc;
  };

  getFunc = (handlerName) => {
    return this.funcs[handlerName];
  };
}

export default HandlersFactoryFuncsCollection;
