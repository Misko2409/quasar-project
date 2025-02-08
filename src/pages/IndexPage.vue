<template>
  <q-layout view="lHh Lpr lFf">
    <!--Sidebar -->
    <q-drawer v-model="drawerOpen" show-if-above bordered>
      <SidebarComponent />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md scrollable">
        <!--Top Bar -->
        <TopBar @toggle-drawer="toggleDrawer" />

        <!--Novi naslov -->
        <div class="text-h5 q-mb-md text-weight-bold">Događaji u Vašoj blizini</div>

        <!--Prikaz događaja -->
        <q-list>
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import EventCard from "components/EventCard.vue";
import SidebarComponent from "components/SidebarComponent.vue";
import TopBar from "components/TopBar.vue";

const events = ref([]);
const drawerOpen = ref(false);

const fetchData = async () => {
  try {
    const eventResponse = await api.get("/performances");
    events.value = eventResponse.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka:", error);
  }
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

onMounted(fetchData);
</script>

<style scoped>
/*Omogućava scroll samo ako je potreban */
.scrollable {
  overflow-y: auto;
  max-height: 100vh;
}
</style>
