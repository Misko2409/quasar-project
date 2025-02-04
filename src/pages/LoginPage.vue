<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-lg" style="width: 400px;">
          <q-card-section>
            <div class="text-h5">Prijava</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="email" label="Email" type="email" required />
            <q-input v-model="password" label="Lozinka" type="password" required />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn label="Prijavi se" color="primary" @click="loginUser" />
          </q-card-actions>

          <q-card-section class="text-center">
            <q-btn flat label="Nemate račun? Registrirajte se" to="/register" />
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

const email = ref("");
const password = ref("");
const router = useRouter();

const loginUser = async () => {
  try {
    const response = await api.post("/auth/login", { email: email.value, password: password.value });

    // Spremanje tokena u LocalStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Preusmjeravanje na dashboard
    router.push("/dashboard");
  } catch (error) {
    console.error("Greška prilikom prijave:", error);
  }
};
</script>
