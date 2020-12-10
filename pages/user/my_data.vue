<template>
  <div class="container">
    my data
  </div>
</template>

<script >
export default {
  fetch({ store, redirect }) {
    if (!store.state.user) {
      redirect('/auth/login')
    }
  },
}
</script>

<style>
</style>
