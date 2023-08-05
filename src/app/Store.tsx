import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "../features/counter/counterSlice";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PropsWithChildren } from "react";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* We need to specify the type of persistedReducer as any because persistedReducer is a different type than the configureStoreOptions interface defines.

PersistedReducer has type Reducer<EmptyObject & {counter: CounterState;} & PersistPartial, AnyAction>

rootReducer has type Reducer<CombinedState<{counter: CounterState;}>, AnyAction>

Though both are of type reducer, the state types are different. persistedReducer has a state type of EmptyObject & {counter: CounterState;} & PersistPartial, while rootReducer has a state type of CombinedState<{counter: CounterState;}>.

PersistPartial represents the _persist property that is added to the state by redux-persist. 

The configureStoreOptions interface defines the type of the reducer property to be of type reducer: Reducer<S, A> | ReducersMapObject<S, A>; 

In this interface, the generic variables S and A represent state and action.

When we pass the reducers to ConfigureStore, TypeScript tries to infer what S and A are based on the reducers that are passed in and it expects all reducers to operate on the same types, but since rootReducer and persistedReducer have different state types, TypeScript throws an error.
*/
export const store = configureStore({
  reducer:
    process.env.NODE_ENV === "development"
      ? rootReducer
      : (persistedReducer as any),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

console.log("Current environment:", process.env.NODE_ENV);

let persistor: Persistor | null = null;

if (process.env.NODE_ENV === "production") {
  persistor = persistStore(store);
}

export const Store: React.FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>
    {persistor ? (
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    ) : (
      <>{children}</>
    )}
  </Provider>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
