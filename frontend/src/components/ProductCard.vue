<template>
  <div
    @click="emits('click', product.id)"
    class="card"
    v-for="product in props.products"
    :key="product.id"
  >
    <div class="img">
      <img :src="product.imageUrl || image" alt="임시 이미지" loading="lazy" />
    </div>
    <div class="detail">
      <p class="title">{{ product.title }}</p>
      <div class="line"></div>
      <p class="address">{{ product.address }}</p>
      <div class="in_detail">
        <span class="product_status"> {{ PRODUCT_STATUS[product.status] }} </span>
        <span>
          <p class="price">{{ product.sellPrice.toLocaleString() }}원</p>
        </span>
      </div>
      <!-- <p class="price">{{ product.sellPrice.toLocaleString() }}원</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAllProduct, IAllProductAdmin } from '@/types/product';
import image from '@/assets/tmp/images/image.png';
import { PRODUCT_STATUS } from '@/constants/strings/product';

const props = defineProps({
  products: {
    type: Array<IAllProduct | IAllProductAdmin>,
    required: true
  }
});
const emits = defineEmits(['click']);
</script>

<style scoped>
.in_detail {
  display: flex;
  flex-direction: row;
  padding-right: 15px;
  padding-left: 15px;
  justify-content: space-between;
  /*   */
}
.product_status {
  width: 70px;
  border: 1px solid lightgray;
  border-radius: 12px;
  border-color: black;
}
.card {
  box-sizing: content-box;
  background-color: white;
  overflow: hidden;
  width: 300px;
  height: 410px;

  box-shadow: 1px 1px 3px rgba(218, 218, 218, 0.446);
  border: 1px solid lightgray;
  border-radius: 12px;

  cursor: pointer;

  transition: all 0.5s ease;
}
.card:hover {
  transform: scale(1.02);
}
.card > .img {
  padding: 10px;
  width: 300px;
  height: 300px;
  overflow: hidden;

  display: flex;
  align-content: center;
  justify-content: center;

  background-color: white;
}
.card > .img > img {
  width: 100%;
  height: 280px;
  object-fit: contain;
}
.detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
  text-align: center;
}
.detail > p {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.detail > .title {
  font-size: 24px;
  margin: auto;
  font-weight: 600;
  width: 252px;
}
.line {
  width: 252px;
  text-align: center;
  margin: auto;
  border: 0.7px solid lightgray;
}
.detail > .address {
  padding-right: 14px;
  font-size: 16px;
  text-align: right;
}
.detail > .price {
  padding-right: 14px;

  text-align: right;
}

img {
  object-fit: cover;
}
@media screen and (max-width: 1023px) {
}

@media screen and (max-width: 767px) {
  .card {
    width: 200px;
    height: 300px;
  }
  .card > .img {
    width: 180px;
    height: 200px;
  }
  .card > .img > img {
    width: 180px;
    height: 200px;
  }
  .detail {
    font-size: 10px;
  }
  .detail .title {
    font-size: 16px;
    width: 100%;
  }
  .detail > .address {
    font-size: 14px;
  }
}
</style>
