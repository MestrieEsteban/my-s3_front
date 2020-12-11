<template>
  <div class="container">
    {{ $store.state.user.user.nickname }}
    <br />
    {{ $store.state.user.user.email }}
  </div>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    if (!store.state.user) {
      redirect('/auth/login')
    }
  },
}
</script>

<style></style>
