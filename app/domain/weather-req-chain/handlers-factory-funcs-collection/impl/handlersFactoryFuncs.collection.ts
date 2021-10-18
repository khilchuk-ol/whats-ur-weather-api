import { CreateHandlerFunc } from "./../handlersFactoryFuncs.collection.interface.js";
import HandlersFactoryFuncsCollectionAbstr from "../handlersFactoryFuncs.collection.interface.js";

class HandlersFactoryFuncsCollection
  implements HandlersFactoryFuncsCollectionAbstr
{
  funcs: any;

  constructor() {
    this.funcs = {};
  }

  register = (handlerName: string, createHandlerFunc: CreateHandlerFunc) => {
    this.funcs[handlerName] = createHandlerFunc;
  };

  getFunc = (handlerName: string) => {
    return this.funcs[handlerName];
  };
}

export default HandlersFactoryFuncsCollection;
