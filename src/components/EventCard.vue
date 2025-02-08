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
    "Josipa": "Josipa Lisac je legendarna hrvatska pjevačica prepoznatljiva po jedinstvenom vokalu i umjetničkom pristupu glazbi. Karijeru je započela u 70-ima, a njezin album Dnevnik jedne ljubavi smatra se jednim od najvažnijih u regionalnoj glazbenoj povijesti.",
    "Petar": "Petar Grašo je poznati hrvatski pjevač i kantautor pop glazbe, prepoznatljiv po emotivnim baladama i hitovima poput Moje zlato i Ako te pitaju. Karijeru je započeo 90-ih, a njegove pjesme često obilježavaju ljubavne teme i mediteranski zvuk.",
    "Nina": "Nina Badrić je jedna od najpoznatijih hrvatskih pop pjevačica, s dugogodišnjom karijerom i brojnim hitovima poput Čarobno jutro i Rekao si. Njezina glazba kombinira pop, soul i R&B, a poznata je i po sudjelovanju na Eurosongu 2012.",
    "Damir": "Damir Urban je hrvatski rock glazbenik i frontmen grupe Urban & 4, poznat po specifičnom vokalu i eksperimentalnom pristupu glazbi. Njegove pjesme, poput Black Tattoo i Mjesto za mene, spajaju alternativni rock s dubokim emocijama i poetičnim tekstovima."
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
