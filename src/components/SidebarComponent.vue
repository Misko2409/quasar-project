<template>
  <q-list bordered separator>
    <q-item to="/" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>Početna</q-item-section>
    </q-item>

    <q-item to="/performances" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="event" />
      </q-item-section>
      <q-item-section>Nastupi</q-item-section>
    </q-item>

    <q-item to="/performers" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="mic" />
      </q-item-section>
      <q-item-section>Izvođači</q-item-section>
    </q-item>

    <q-item to="/dashboard" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="account_circle" />
      </q-item-section>
      <q-item-section>Moj profil</q-item-section>
    </q-item>
  </q-list>
</template>
