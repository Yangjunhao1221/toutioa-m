<template>
  <van-cell
    class="articleFather"
    :to="{
      name: 'articleIndex',
      params: {
        articleId: article.art_id,
      },
    }"
  >
    <div slot="title" class="text van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="default" class="article-i" v-if="article.cover.type === 1">
      <van-image
        class="article-img"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </div>
    <div slot="label">
      <div class="label-imgthree" v-if="article.cover.type === 3">
        <van-image
          v-for="(img, index) in article.cover.images"
          :key="index"
          :src="img"
          fit="cover"
          class="labelimg"
        />
      </div>

      <div>
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "atricleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
    
  },
};
</script>

<style scoped lang='less'>
.articleFather {
  .van-cell__title {
    .text {
      font-size: 32px;
    }
  }
  .van-cell__value {
    margin-left: 20px;
  }
  .van-cell__value {
    flex: unset; //不参与布局
    width: 232px;
    height: 146px;
    .article-img {
      width: 232px;
      height: 146px;
    }
  }
  .label-imgthree {
    display: flex;
    padding: 30px 0;
    .labelimg {
      width: 232px;
      height: 146px;
      flex: 1;
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }

  .van-cell__label {
    span:not(:last-child) {
      font-size: 22px;
      margin-right: 12px;
    }
  }
}
</style>