import { store } from "react-easy-state";
import axios from "axios/index";

export default store({
  all: [],
  removeFromList(id) {
    this.all = this.all.filter(cat => cat._id !== id);
  },
  replaceInList(id, newCat) {
    this.all = this.all.map(cat => {
      if (cat._id !== id) {
        return cat;
      } else {
        return newCat;
      }
    });
  },
  async loadAll() {
    const response = await axios.get("/api/category");
    if (response.status === 200) {
      this.all = response.data;
    }
  },
  async add(name) {
    const response = await axios.post("/api/category", { title: name });
    if (response.status === 200) {
      this.all.push(response.data);
    } else {
      alert("Error adding a new category, check the console");
      console.error(response);
    }
  },
  async delete(id) {
    const response = await axios.delete(`/api/category/${id}`);
    if (response.status === 200) {
      this.removeFromList(id);
    } else {
      alert("Error deleting the category, check the console for details");
      console.error(response);
    }
  },
  async edit(id, newTitle) {
    const response = await axios.put(`/api/category/${id}`, {
      title: newTitle
    });
    if (response.status === 200) {
      this.replaceInList(id, response.data);
    } else {
      alert("Error editing the category, check the console for details");
      console.error(response);
    }
  }
});
