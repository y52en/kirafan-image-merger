<template lang="pug">
span
  canvas#out(width="128", height="128")
  v-text-field(
    label="icon url",
    v-model="item_url",
    :rules="[itemUrl_vaild || '画像を取得できませんでした']"
  )
  v-progress-circular(indeterminate, color="primary", :style="loading_style")
  v-btn(@click="item_url = ''") url reset
  | <br>
  span star
  v-slider(min=0, max=6, v-model="star_num")
  v-checkbox(label="金フレーム", v-model="goldframe")
  v-btn(@click="downloadImg()") 画像をダウンロード
  | <br>
  | <br>
  v-btn(
    @click="$window.open('https://asset.kirafan.moe/#/texture/itemicon'), '_blank'"
  ) アイテム一覧
  v-btn(
    @click="$window.open('https://asset.kirafan.moe/#/texture/weaponicon'), '_blank'"
  ) 武器一覧
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  // props: {
  //   msg: String
  // },
  data: () => ({
    image_elm: {
      frame: new Image(),
      bg: new Image(),
      item: new Image(),
      star: new Image(),
    },
    star_num: 4,
    goldframe: false,
    // frame_url:
    //   ,
    bg_url: "https://others-asset.kirafan.cn/uiatlas/commonuiatlas/IconBG.png",
    item_url: "https://texture-asset.kirafan.cn/itemicon/itemicon_10111.png",

    itemUrl_vaild: true,
    loading: false,
  }),
  computed: {
    loading_style() {
      if (this.loading) {
        return "position:absolute;left:40%;top:147px;";
      } else {
        return "display:none";
      }
    },
    frame_url() {
      if (this.goldframe) {
        return "https://others-asset.kirafan.cn/uiatlas/commonuiatlas/IconFrameGold.png";
      } else {
        return "https://others-asset.kirafan.cn/uiatlas/commonuiatlas/IconFrame.png";
      }
    },
  },
  methods: {
    ImgOnload(img_elm, url) {
      const CORS = false;
      return new Promise((resolve, reject) => {
        const img = img_elm;
        img.onload = () => resolve();
        img.onerror = (e) => reject(e);
        if (CORS) {
          img.src = url;
        } else {
          axios
            .get(url, { responseType: "blob" })
            .then((axios_got) => {
              const blob = axios_got.data;
              const url = URL.createObjectURL(blob);
              img.src = url;
            })
            .catch((e) => reject(e));
        }
      });
    },
    async drawCanvas() {
      this.itemUrl_vaild = true;
      const canvas = document.getElementById("out");
      const ctx = canvas.getContext("2d");

      const frame = this.image_elm.frame;
      const bg = this.image_elm.bg;
      const item = this.image_elm.item;
      const star = this.image_elm.star;

      await Promise.all([
        this.ImgOnload(frame, this.frame_url),
        this.ImgOnload(bg, this.bg_url),
        this.ImgOnload(item, this.item_url).catch((e) => {
          throw e;
        }),
        this.ImgOnload(
          star,
          "https://others-asset.kirafan.cn/uiatlas/commonuiatlas/RareIconSmall.png"
        ),
      ]);

      // {
      //   gold:"https://others-asset.kirafan.cn/uiatlas/commonuiatlas/IconFrameGold.png",
      // item:https://asset.kirafan.moe/#/texture/itemiconv

      // };
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(frame, 0, 0);
      ctx.drawImage(item, 0, 0,canvas.width,canvas.height);
      // 19x19
      // console.log(this.star_num);
      this.star_num = this.star_num ?? 0;
      for (let i = 0; i <= this.star_num - 1; i++) {
        ctx.drawImage(star, 2 + i * 20, 106);
      }
    },
    async downloadImg() {
      const canvas = document.getElementById("out");
      const blob = await this.toBlob(canvas);
      const fileName = "merged_" + this.item_url.match(/[^/]+$/) || Number(new Date());
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
    this.drawCanvas();
  },
  watch: {
    frame_url() {
      this.drawCanvas().catch(() => {
        this.itemUrl_vaild = false;
      });
    },
    bg_url() {
      this.drawCanvas().catch(() => {
        this.itemUrl_vaild = false;
      });
    },
    async item_url() {
      this.loading = true;

      // try {
      await this.drawCanvas().catch(() => {
        this.itemUrl_vaild = false;
      });
      // } catch {
      // alert(6);
      // }
      this.loading = false;
    },
    star_num() {
      this.drawCanvas().catch(() => {
        this.itemUrl_vaild = false;
      });
    },
    goldframe() {
      this.drawCanvas().catch(() => {
        this.itemUrl_vaild = false;
      });
    },
  },
};
</script>
