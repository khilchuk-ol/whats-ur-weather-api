import HandlersFactoryFuncsCollectionAbstr from "../abstr/handlersFactoryFuncs.collection.abstr.js";

class HandlersFactoryFuncsCollection extends HandlersFactoryFuncsCollectionAbstr {
  constructor() {
    super();
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
