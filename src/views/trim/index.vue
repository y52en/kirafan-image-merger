<template lang="pug">
span
  v-btn(@click="$window.document.getElementById('imgFile').click()")
    v-icon mdi-image
    span 読み込み
    input#imgFile(
      type="file",
      style="visibility: visible; width: 0; height: 0"
    )
  |<br>
  v-checkbox(label="施設", v-model="isPrefab")
  img#o.d
  canvas#o2 
  |<br>
  v-btn(@click="downloadImg()") 画像をダウンロード
</template>

<style scoped>
.d {
  display: none;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    // a: 0,
    isPrefab: true,
  }),
  computed: {
    elm: () => ({
      img: document.getElementById("o"),
    }),
  },

  methods: {
    ImgOnload(img_elm, url) {
      return new Promise((resolve, reject) => {
        const img = img_elm;
        img.onload = resolve;
        img.onerror = (e) => reject(e);
        img.src = url;
      });
    },
    canvasInit(canvas, img) {
      canvas.width = img.width;
      canvas.height = img.height;
      return canvas.getContext("2d");
    },
    main() {
      let coordinate_x, coordinate_y, icon_w;
      if (this.isPrefab) {
        coordinate_x = 211;
        coordinate_y = 274;
        icon_w = 192;
      } else {
        coordinate_x = 285;
        coordinate_y = 319;
        icon_w = 123;
      }

      const canvas = document.getElementById("o2");
      const ctx = this.canvasInit(canvas, { width: icon_w, height: icon_w });
      //   ctx.drawImage(this.elm.img, 0, 0);

      ctx.drawImage(
        this.elm.img,
        coordinate_x,
        coordinate_y,
        icon_w,
        icon_w,
        0,
        0,
        icon_w,
        icon_w
      );
      ctx.fillStyle = "#00FFFF";
      ctx.globalAlpha = 0.5;
      ctx.fillRect(285, 319, 123, 123);
      ctx.globalAlpha = 1;

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";

      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          ctx.beginPath();
          const start_x = icon_w * x;
          const start_y = icon_w * y;
          const len = this.isPrefab ? 9 : 6;

          ctx.lineTo(start_x, start_y);
          ctx.arc(
            start_x + len * (1 - 2 * x),
            start_y + len * (1 - 2 * y),
            len,
            (1 - x) * Math.PI,
            (1.5 - y) * Math.PI,
            x ^ y
          );
          ctx.closePath();
          ctx.fill();
        }
      }
    },
    async downloadImg() {
      const canvas = document.getElementById("o2");
      const blob = await this.toBlob(canvas);
      const fileName =
        "merged_" +  Number(new Date());
      this.fileDownload_fromBlob(blob, fileName);
    },
    fileDownload_fromBlob(blob, fileName = "img.png") {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    },
    toBlob(CanvasElement) {
      return new Promise((resolve, reject) => {
        try {
          CanvasElement.toBlob(resolve);
        } catch (e) {
          reject(e);
        }
      });
    },
  },

  async mounted() {
    // if (location.hostname === "localhost") {
    //   window.v = this;
    //   window.p = process;
    //   // this.loadImg();
    // }

    document.getElementById("imgFile").addEventListener("change", (e) => {
      const file_reader = new FileReader();
      file_reader.addEventListener("load", async (e) => {
        await this.ImgOnload(this.elm.img, e.target.result);
        this.main();
        this.downloadImg();
      });
      file_reader.readAsDataURL(e.target.files[0]);
    });

    // await this.ImgOnload(this.elm.img, require("../../debug/s.jpg"));
    // await this.ImgOnload(this.elm.img, require("../../debug/item.jpg"));
    // this.main();
  },
  watch:{
      isPrefab(){
          this.main()
      }
  }
});
</script>