<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 🔹 TopBar -->
    <q-header elevated>
      <TopBar @toggle-drawer="toggleLeftDrawer" />
    </q-header>

    <!-- 🔹 Sidebar -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <SidebarComponent />
    </q-drawer>

    <!-- 🔹 Glavni sadržaj -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import TopBar from "components/TopBar.vue";
import SidebarComponent from "components/SidebarComponent.vue";

const leftDrawerOpen = ref(false);

// ✅ Osiguravamo pravilno otvaranje i zatvaranje sidebar-a
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
