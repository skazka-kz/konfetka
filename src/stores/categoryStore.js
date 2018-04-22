import { store } from "react-easy-state";
import axios from "axios/index";

const catStore = store({
  all: [],
  removeFromList(id) {
    catStore.all = catStore.all.filter(cat => cat._id !== id);
  },
  replaceInList(id, newCat) {
    catStore.all = catStore.all.map(cat => {
      if (cat._id !== id) {
        return cat;
      } else {
        return newCat;
      }
    });
  },
  async loadAll() {
    const response = await axios.get("/api/categories");
    if (response.status === 200) {
      catStore.all = response.data;
    }
  },
  async add(name) {
    const response = await axios.post("/api/categories", { title: name });
    if (response.status === 200) {
      catStore.all.push(response.data);
    } else {
      alert("Error adding a new category, check the console");
      console.error(response);
    }
  },
  async delete(id) {
    const response = await axios.delete(`/api/categories/${id}`);
    if (response.status === 200) {
      catStore.removeFromList(id);
    } else {
      alert("Error deleting the category, check the console for details");
      console.error(response);
    }
  },
  async edit(id, newTitle) {
    const response = await axios.put(`/api/categories/${id}`, {
      title: newTitle
    });
    if (response.status === 200) {
      catStore.replaceInList(id, response.data);
    } else {
      alert("Error editing the category, check the console for details");
      console.error(response);
    }
  }
});

export default catStore;
