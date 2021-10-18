import WeatherRequestHandler from "../handlers/weatherRequest.handler.interface.js";
import HandlerReqData from "../handlers/handlerReqData.interface.js";

export type CreateHandlerFunc = (
  data: HandlerReqData,
  handler: WeatherRequestHandler
) => WeatherRequestHandler;

interface HandlersFactoryFuncsCollectionAbstr {
  register(handlerName: string, createHandlerFunc: CreateHandlerFunc): void;

  getFunc(handlerName: string): CreateHandlerFunc;
}

export default HandlersFactoryFuncsCollectionAbstr;
