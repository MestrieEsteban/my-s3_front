<template>
  <b-container fluid>
    <b-row>
      <b-col><span class="title">Your data is precius</span></b-col>
      <b-col style="justify-content: center; align-items: center;">
        <div id="piece" >
          <div id="window">
            <div id="painting">
              <div id="shredded">
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
                <div class="shred"></div>
              </div>
              <div id="original"></div>
            </div>
          </div>
          <div id="frame"></div>
        </div>
      </b-col>
      <b-col></b-col>
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

#piece {
  cursor: pointer;
  height: 40vh;
  max-height: 800px;
  position: relative;
  width: calc(40vh * 0.774);
  margin: 0 auto;
}

#frame {
  background: url('https://m.framedit.com/wp-content/uploads/2017/01/Urbane_Modern_Black_Rounded_Frame8x10.png');
  background-size: cover;
  height: 90%;
  position: absolute;
  width: 100%;
}

#holder {
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141041/banksy-back.jpg');
  background-size: cover;
  height: calc(50vh * 0.69);
  left: 18.9%;
  position: absolute;
  top: 15.4%;
  width: calc(50vh * 0.774 * 0.617);
}

#painting {
  height: 90%;
  position: absolute;
  transform: translateY(0%);
  width: 100%;
}

#original,
.shred {
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141041/anne-painting.jpg');
  background-size: cover;
}

#original {
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
}

#shredded {
  bottom: 0;
  display: grid;
  grid-column-gap: 3px;
  grid-template-columns: repeat(11, 1fr);
  height: 100%;
  position: absolute;
  width: 100%;
}

#shredded .shred {
  background-position: top center;
}

#shredded .shred:nth-child(1) {
  background-position: 0% 0%;
}

#shredded .shred:nth-child(2) {
  background-position: 10% 0%;
}

#shredded .shred:nth-child(3) {
  background-position: 20% 0%;
}

#shredded .shred:nth-child(4) {
  background-position: 30% 0%;
}

#shredded .shred:nth-child(5) {
  background-position: 40% 0%;
}

#shredded .shred:nth-child(6) {
  background-position: 50% 0%;
}

#shredded .shred:nth-child(7) {
  background-position: 60% 0%;
}

#shredded .shred:nth-child(8) {
  background-position: 70% 0%;
}

#shredded .shred:nth-child(9) {
  background-position: 80% 0%;
}

#shredded .shred:nth-child(10) {
  background-position: 90% 0%;
}

#shredded .shred:nth-child(11) {
  background-position: 100% 0%;
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
