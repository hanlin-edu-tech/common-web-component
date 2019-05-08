<template>
  <div class="container">
    <router-view :key="$route.fullPath"/>
  </div>
</template>