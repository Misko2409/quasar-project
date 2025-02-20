<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="drawerOpen" show-if-above bordered>
      <SidebarComponent />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <TopBar @toggle-drawer="toggleDrawer" />

        <q-card>
          <q-card-section>
            <div class="text-h5">Popis Izvođača</div>
            <q-btn v-if="isOrganizer" color="primary" @click="openModal(null)" class="q-ml-md">
              Dodaj Izvođača
            </q-btn>
          </q-card-section>

          <q-card-section>
            <q-list>
              <q-item v-for="performer in performers" :key="performer.id">
                <q-item-section>
                  <q-item-label class="text-bold">{{ performer.name }} {{ performer.surname }}</q-item-label>
                  <q-item-label caption>🎤 Umjetničko ime: {{ performer.stageName || "Nema podataka" }}</q-item-label>
                  <q-item-label>📞 Kontakt: <strong>{{ performer.contact || "Nema podataka" }}</strong></q-item-label>
                </q-item-section>

                <q-item-section side v-if="isOrganizer">
                  <q-btn flat icon="edit" color="primary" @click="openModal(performer)" />
                  <q-btn flat icon="delete" color="negative" @click="deletePerformer(performer.id)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-dialog v-model="modalOpen">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ editingPerformer ? "Uredi izvođača" : "Dodaj izvođača" }}</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="form.name" label="Ime" outlined dense />
              <q-input v-model="form.surname" label="Prezime" outlined dense />
              <q-input v-model="form.stageName" label="Umjetničko ime" outlined dense />
              <q-input v-model="form.contact" label="Kontakt" outlined dense />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Odustani" color="negative" v-close-popup />
              <q-btn flat label="Spremi" color="primary" @click="savePerformer" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { api } from "../boot/axios";
import { useQuasar } from "quasar";
import SidebarComponent from "components/SidebarComponent.vue";
import TopBar from "components/TopBar.vue";

const $q = useQuasar();
const drawerOpen = ref(false);
const performers = ref([]);
const modalOpen = ref(false);
const form = ref({ name: "", surname: "", stageName: "", contact: "" });
const editingPerformer = ref(null);

const user = computed(() => JSON.parse(localStorage.getItem("user")));
const isOrganizer = computed(() => user.value?.role === "organizer");

const fetchPerformers = async () => {
  try {
    const response = await api.get("/performers");
    performers.value = response.data;
  } catch (error) {
    console.error("❌ Greška pri dohvaćanju izvođača:", error);
  }
};

const openModal = (performer) => {
  modalOpen.value = true;
  editingPerformer.value = performer;
  form.value = performer ? { ...performer } : { name: "", surname: "", stageName: "", contact: "" };
};

const savePerformer = async () => {
  try {
    if (editingPerformer.value) {
      await api.put(`/performers/${editingPerformer.value.id}`, form.value);
    } else {
      await api.post("/performers", form.value);
    }
    modalOpen.value = false;
    fetchPerformers();
  } catch (error) {
    console.error("❌ Greška pri spremanju izvođača:", error);
    $q.notify({ type: "negative", message: "Neuspješno spremanje izvođača!" });
  }
};

const deletePerformer = async (id) => {
  try {
    await api.delete(`/performers/${id}`);
    fetchPerformers();
  } catch (error) {
    console.error("❌ Greška pri brisanju izvođača:", error);
    $q.notify({ type: "negative", message: "Neuspješno brisanje izvođača!" });
  }
};

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

onMounted(fetchPerformers);
</script>
