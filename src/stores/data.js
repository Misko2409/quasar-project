import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    performers: [],
    events: []
  }),

  actions: {
    async fetchPerformers() {
      const response = await api.get("/performers");
      this.performers = response.data;
    },

    async fetchEvents() {
      const response = await api.get("/events");
      this.events = response.data;
    }
  }
});
