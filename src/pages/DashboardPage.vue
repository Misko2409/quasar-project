<template>
  <q-layout view="lHh Lpr lFf">
    <!--Top Bar -->
    <TopBar @toggle-drawer="toggleDrawer" />

    <!-- Sidebar -->
    <q-drawer v-model="drawerOpen" show-if-above bordered>
      <SidebarComponent />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Korisnički profil</div>
          </q-card-section>

          <q-card-section>
            <p><strong>Ime:</strong> {{ user.name }}</p>
            <p><strong>Uloga:</strong> {{ user.role }}</p>
          </q-card-section>

          <q-card-section>
            <q-input v-model="newName" label="Novo ime" outlined dense />
            <q-input v-model="newPassword" label="Nova lozinka" type="password" outlined dense />

            <q-btn label="SPREMI PROMJENE" color="primary" class="q-mt-md" @click="updateProfile" />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import TopBar from "components/TopBar.vue";
import SidebarComponent from "components/SidebarComponent.vue";

const $q = useQuasar();
const drawerOpen = ref(false);

// Dohvati korisnika iz LocalStorage-a
const user = computed(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

const newName = ref("");
const newPassword = ref("");

// Funkcija za otvaranje/zatvaranje sidebar-a
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

// Funkcija za ažuriranje profila
const updateProfile = async () => {
  try {
    const payload = {};
    if (newName.value) payload.name = newName.value;
    if (newPassword.value) payload.password = newPassword.value;

    if (!payload.name && !payload.password) {
      $q.notify({ type: "negative", message: "Unesite novo ime ili lozinku!" });
      return;
    }

    await api.put("/user", payload);
    $q.notify({ type: "positive", message: "Profil uspješno ažuriran!" });

    const updatedUser = { ...user.value, name: newName.value || user.value.name };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    newName.value = "";
    newPassword.value = "";
  } catch (error) {
    console.error("Greška kod ažuriranja profila:", error);
    $q.notify({ type: "negative", message: "Došlo je do greške pri ažuriranju!" });
  }
};
</script>
