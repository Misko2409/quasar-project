<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 🔹 Sidebar -->
    <q-drawer v-model="drawerOpen" show-if-above bordered>
      <SidebarComponent />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <!-- 🔹 Top Bar -->
        <TopBar @toggle-drawer="toggleDrawer" />

        <q-card>
          <q-card-section>
            <div class="text-h5">Aktualni Nastupi</div>
            <q-btn v-if="isOrganizer" color="primary" @click="openModal(null)" class="q-ml-md">
              Dodaj Nastup
            </q-btn>
          </q-card-section>

          <q-card-section>
            <q-list>
              <q-item v-for="performance in performances" :key="performance.Sifra_nastupa">
                <q-item-section>
                  <q-item-label class="text-bold">
                    {{ performance.UmjetnickoIme_izvodaca || `${performance.Ime_izvodaca} ${performance.Prezime_izvodaca}` }}
                  </q-item-label>
                  <q-item-label caption>Lokacija: {{ performance.Mjesto_nastupa }}</q-item-label>
                  <q-item-label>Datum: {{ formatDate(performance.Datum_nastupa) }}</q-item-label>
                </q-item-section>

                <q-item-section side v-if="isOrganizer">
                  <q-btn flat icon="edit" color="primary" @click="openModal(performance)" />
                  <q-btn flat icon="delete" color="negative" @click="deletePerformance(performance.Sifra_nastupa)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Modal za dodavanje/uređivanje nastupa -->
        <q-dialog v-model="modalOpen">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ editingPerformance ? "Uredi Nastup" : "Dodaj Nastup" }}</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="form.Datum_nastupa" label="Datum" type="date" outlined dense />
              <q-input v-model="form.Mjesto_nastupa" label="Lokacija" outlined dense />
              <q-input v-model="form.Sifra_izvodaca" label="Šifra Izvođača" outlined dense />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Odustani" color="negative" v-close-popup />
              <q-btn flat label="Spremi" color="primary" @click="savePerformance" />
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
import TopBar from "../components/TopBar.vue";
import SidebarComponent from "../components/SidebarComponent.vue";

const drawerOpen = ref(false);
const performances = ref([]);
const modalOpen = ref(false);
const form = ref({ Datum_nastupa: "", Mjesto_nastupa: "", Sifra_izvodaca: "" });
const editingPerformance = ref(null);

const user = computed(() => JSON.parse(localStorage.getItem("user")));
const isOrganizer = computed(() => user.value?.role === "organizer");

// ✅ Ispravljena funkcija za formatiranje datuma
const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("hr-HR", { year: "numeric", month: "2-digit", day: "2-digit" }) : "Nepoznato";
};

const fetchPerformances = async () => {
  try {
    const response = await api.get("/performances");
    console.log("Dohvaćeni nastupi:", response.data);
    performances.value = response.data;
  } catch (error) {
    console.error("Greška pri dohvaćanju nastupa:", error);
  }
};

const openModal = (performance) => {
  modalOpen.value = true;
  editingPerformance.value = performance;
  form.value = performance ? { ...performance } : { Datum_nastupa: "", Mjesto_nastupa: "", Sifra_izvodaca: "" };
};

const savePerformance = async () => {
  try {
    if (editingPerformance.value) {
      await api.put(`/performances/${editingPerformance.value.Sifra_nastupa}`, form.value);
    } else {
      await api.post("/performances", form.value);
    }
    modalOpen.value = false;
    fetchPerformances();
  } catch (error) {
    console.error("Greška pri spremanju nastupa:", error);
  }
};

const deletePerformance = async (id) => {
  try {
    await api.delete(`/performances/${id}`);
    fetchPerformances();
  } catch (error) {
    console.error("Greška pri brisanju nastupa:", error);
  }
};

// ✅ Ispravljena funkcija za otvaranje/zatvaranje sidebar-a
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

onMounted(fetchPerformances);
</script>
