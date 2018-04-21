import { store } from "react-easy-state";

export default store({
  isActive: false,
  toggle() {
    this.isActive = !this.isActive;
  }
});
