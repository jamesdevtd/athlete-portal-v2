import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk"
import reducers from "./reducers";

declare global {
    interface Window {
        devToolsExtension?: typeof compose;
    }
}

export const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f : any) => f
    )
)
