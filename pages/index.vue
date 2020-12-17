<template>
  <b-container fluid>
    <b-row>
     
    </b-row>
  </b-container>
</template>

<script>
export default {
  el: '#banksy',
  data() {
    return {
      shredding: null,
      dropping: null,
    }
  },
  methods: {
    shred() {
      const anime = this.$anime
      this.shredding = anime({
        targets: '#original',
        height: 0,
        duration: 10000,
        easing: 'linear',
      })

      this.dropping = anime({
        targets: '#painting',
        translateY: '101%',
        duration: 10000,
        easing: 'linear',
      })
    },
    artSelected(e) {
      this.shredding.pause()
      this.dropping.pause()

      loadImage(
        e.target.files[0],
        (canvas) => {
          let url = canvas.toDataURL('image/jpeg')

          document.getElementById(
            'original'
          ).style.backgroundImage = `url(${url})`

          let elements = Array.from(document.getElementsByClassName('shred'))

          elements.forEach((element) => {
            element.style.backgroundImage = `url(${url})`
          })

          document.getElementById('original').style.height = '100%'
          document.getElementById('painting').style.transform = 'translateY(0)'

          this.shred()
        },
        {
          canvas: true,
          crop: true,
          maxHeight: 566,
          maxWidth: 392,
          orientation: true,
        }
      )
    },
  },
  mounted() {
    this.shred()
  },
}
</script>

<style>
body {
  overflow: hidden;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
input {
  display: none;
}

header {
  position: absolute;
  top: 2em;
}

header a {
  color: black;
}
</style>
