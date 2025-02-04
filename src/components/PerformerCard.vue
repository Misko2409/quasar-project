<template>
  <q-card class="q-ma-md" bordered>
    <q-img src="https://via.placeholder.com/300x150" height="150px" fit="cover" />

    <q-card-section>
      <div class="text-h6">{{ performer.name }}</div>
      <div class="text-subtitle2 text-grey">{{ performer.genre }}</div>
      <div class="text-caption">{{ performer.contact }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  performer: Object
});
</script>
