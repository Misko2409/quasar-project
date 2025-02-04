import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useEventStore = defineStore("event", {
  actions: {
    async createEvent(eventData) {
      await api.post("/events/new", eventData);
    }
  }
});
