<template>
  <q-card class="q-ma-md" bordered>
    <!-- 🔹 Dinamičko učitavanje slike -->
    <q-img
      :src="getImage(event.Ime_izvodaca)"
      height="200px"
      fit="cover"
    />

    <q-card-section>
      <div class="text-h6">{{ event.Ime_izvodaca || "Nepoznati izvođač" }}</div>
      <div class="text-subtitle2 text-grey">
        {{ event.Mjesto_nastupa || "Nepoznata lokacija" }} - {{ formatDate(event.Datum_nastupa) }}
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Detalji" color="primary" @click="openDetails" />
    </q-card-actions>

    <!-- 🔹 Modal za prikaz dodatnih informacija o izvođaču -->
    <q-dialog v-model="showDetails">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">{{ event.Ime_izvodaca }}</div>
          <q-img
            :src="getImage(event.Ime_izvodaca)"
            height="200px"
            fit="cover"
            class="q-mb-md"
          />
          <div class="text-body1">{{ getDescription(event.Ime_izvodaca) }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Zatvori" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

// ✅ Ispravan način deklaracije props-a bez varijable props
defineProps({
  event: Object
});

const showDetails = ref(false);

const openDetails = () => {
  showDetails.value = true;
};

// ✅ Funkcija za dohvaćanje slike izvođača
const getImage = (name) => {
  const imageMap = {
    "Josipa": "/src/assets/images/image1.jpg",
    "Petar": "/src/assets/images/image2.jpg",
    "Nina": "/src/assets/images/image3.jpg",
    "Damir": "/src/assets/images/image4.jpg"
  };

  return imageMap[name] || "/src/assets/images/image0.jpg"; // 🔹 Default slika za ostale izvođače
};

// ✅ Funkcija za dohvaćanje opisa izvođača
const getDescription = (name) => {
  const descriptionMap = {
    "Josipa": "Josipa Lisac je legendarna pjevačica poznata po jedinstvenom stilu i glasu.",
    "Petar": "Petar Grašo je popularni pop izvođač s bogatom glazbenom karijerom.",
    "Nina": "Nina Badrić je poznata hrvatska pjevačica s dugogodišnjom karijerom u pop glazbi.",
    "Damir": "Damir Urban je rock glazbenik poznat po svojoj inovativnoj glazbi i snažnim nastupima."
  };

  return descriptionMap[name] || "Ovaj izvođač još nema opisan profil.";
};

// ✅ Formatiranje datuma
const formatDate = (date) => {
  if (!date) return "Nepoznat datum";
  const d = new Date(date);
  return d.toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit", year: "numeric" });
};
</script>
