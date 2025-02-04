<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-lg" style="width: 400px;">
          <q-card-section>
            <div class="text-h5">Registracija</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="name" label="Ime" required />
            <q-input v-model="email" label="Email" type="email" required />
            <q-input v-model="password" label="Lozinka" type="password" required />
            <q-select v-model="role" :options="roles" label="Odaberite ulogu" required />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Registriraj se" color="primary" @click="registerUser" />
          </q-card-actions>

          <q-card-section class="text-center">
            <q-btn flat label="Već imate račun? Prijavite se" to="/login" />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("organizer");
const roles = ["organizer", "user"];
const router = useRouter();

const registerUser = async () => {
  try {
    await api.post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    });
    router.push("/login");
  } catch (error) {
    console.error("Greška prilikom registracije:", error);
  }
};
</script>
