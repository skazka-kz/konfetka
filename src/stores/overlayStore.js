import { store } from "react-easy-state";

const ovStore = store({
  isActive: false,
  toggle() {
    ovStore.isActive = !ovStore.isActive;
  }
});

export default ovStore;
