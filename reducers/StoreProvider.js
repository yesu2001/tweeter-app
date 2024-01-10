import store from "./store";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
