<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <!--Dugme za sidebar sada emitira event -->
      <q-btn flat dense round icon="menu" @click="$emit('toggle-drawer')" class="q-mr-md" />

      <!--Naslov aplikacije -->
      <q-toolbar-title class="text-weight-bold">
        Event Up!
      </q-toolbar-title>

      <q-space />

      <!--Ikona profila -->
      <q-btn v-if="user" flat round dense icon="account_circle">
        <q-menu fit anchor="bottom right" self="top right">
          <q-list style="min-width: 180px">
            <q-item>
              <q-item-section>
                <div class="text-bold">👋 Pozdrav, {{ user.name }}!</div>
                <div class="text-caption">Uloga: {{ user.role }}</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" color="negative" />
              </q-item-section>
              <q-item-section>Odjava</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn v-else color="white" flat dense to="/login">Prijava</q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Dohvati korisnika iz localStorage-a
const user = computed(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

// Logout funkcija
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>
