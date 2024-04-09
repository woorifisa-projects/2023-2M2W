<template>
  <div id="main-page">
    <CommonBannerVue />
    <div class="main">
      <div class="search">
        <div class="search-bar">
          <input
            type="text"
            id="search"
            @keyup.enter="onClickSearch"
            v-model="keyword"
            :placeholder="PLACEHOLDER.SEARCH_INPUT"
          />
          <label @click="onClickSearch">
            <span class="material-icons-outlined"> search </span>
          </label>
        </div>
        <CategoryList :selectedCategory="selectedCategory" @change="changeCategory" />
      </div>
      <div v-if="products.length" class="card-list">
        <ProductCardVue :products="products" @click="onClickProductCard" />
      </div>
      <EmptyProduct v-else />
    </div>
    <div class="add-button">
      <button name="상품 추가하기 버튼" @click="onClickAddProduct">
        <span class="material-icons-outlined"> add </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import router from '@/router';
import ProductCardVue from '@/components/ProductCard.vue';
import CommonBannerVue from '@/components/CommonBanner.vue';
import CategoryList from '@/components/CategoryList.vue';
import productAPI from '@/apis/user/product';
import EmptyProduct from '@/components/EmptyProduct.vue';
import { PLACEHOLDER } from '@/constants/strings/defaultInput';
import type { IAllProduct } from '@/types/product';
import type { IStringToFunction } from '@/types/dynamic';

const selectedCategory = ref('ALL');
const keyword = ref('');
const products = ref<Array<IAllProduct>>([]);
const pageNumber = ref(0);
const currentSearch = ref('ALL');
const isEnd = ref(false);
const preScroll = ref(0);
const CARD_SIZE = 400;

const getProduct: IStringToFunction = {
  SEARCH: (page: number) =>
    productAPI.getSearchTitleProduct(selectedCategory.value, keyword.value, page),
  ALL: (page: number) => productAPI.getAll(page),
  CATEGORY: (page: number) => productAPI.getCategoryProduct(selectedCategory.value, page)
};

const onClickAddProduct = () => {
  router.push('/product/add');
};

const onClickProductCard = (id: number) => {
  router.push(`product/${id}`);
};

const handleNotificationListScroll = async () => {
  if (isEnd.value) return;
  const scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
  if (Math.abs(preScroll.value - scrollLocation) < 10) {
    preScroll.value = scrollLocation;
    return;
  }
  preScroll.value = scrollLocation;
  const windowHeight = window.innerHeight; // 스크린 창
  const fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
  if (scrollLocation + windowHeight + CARD_SIZE > fullHeight) {
    pageNumber.value += 1;
    isEnd.value = true;
    const res = await getProduct[currentSearch.value](pageNumber.value);
    if (!res.isSuccess) {
      window.removeEventListener('scroll', handleNotificationListScroll);
      return;
    }
    if (!res.data || res.data.length === 0) {
      window.removeEventListener('scroll', handleNotificationListScroll);
      return;
    }
    products.value = [...products.value, ...res.data];
    isEnd.value = false;
  }
};
// 상품 검색
const onClickSearch = async () => {
  currentSearch.value = 'SEARCH';
  pageNumber.value = 0;
  window.addEventListener('scroll', handleNotificationListScroll);
  const res = await getProduct[currentSearch.value](pageNumber.value);
  if (res.isSuccess && res.data) {
    products.value = res.data;
  } else {
    products.value = [];
  }
};
// 카테고리 변경
const changeCategory = async (category: string) => {
  selectedCategory.value = category;
  pageNumber.value = 0;
  currentSearch.value = 'CATEGORY';
  window.addEventListener('scroll', handleNotificationListScroll);

  if (selectedCategory.value === 'ALL') {
    currentSearch.value = 'ALL';
  }

  const res = await getProduct[currentSearch.value](pageNumber.value);
  if (res.isSuccess && res.data) {
    products.value = res.data;
  } else {
    products.value = [];
  }
};

onMounted(async () => {
  const res = await getProduct['ALL'](pageNumber.value);
  if (res.isSuccess && res.data) {
    products.value = res.data;
    window.addEventListener('scroll', handleNotificationListScroll);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleNotificationListScroll);
});
</script>

<style scoped>
#main-page {
  width: 100%;
  height: 100%;
  padding: 0;
  padding-bottom: 50px;
}
.main {
  width: 100%;
  height: 100%;
  padding: 10px 200px;
}
.search {
  display: flex;
  flex-direction: column;
}

.search-bar {
  position: relative;
  width: 100%;
  margin-top: 12px;
  margin-right: 24px;
  right: 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
}
.search-bar > input {
  width: 300px;
  padding: 12px;
  font-size: 18px;
  border-radius: 24px;
  border: 1px solid rgb(240, 240, 240);
}
.search-bar > label {
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
  color: #888888;
}
.card-list {
  margin: auto;
  margin-top: 24px;
  padding: 24px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 15px;
  justify-items: center;
  align-content: center;
  gap: 24px;
}
.add-button {
  position: sticky;
  bottom: 32px;
  text-align: end;
  padding-right: 20px;
}
.add-button > button {
  border: 1px solid rgb(240, 240, 240);
  box-shadow: 1px 1px 6px rgba(161, 161, 161, 0.224);
  background-color: white;
  color: #888888;
  border-radius: 50%;
  width: 64px;
  height: 64px;
}
.add-button > button > span {
  line-height: 32px;
  font-size: 32px;
  font-weight: 400;
}

@media screen and (max-width: 1200px) {
  .add-button {
    padding-right: 24px;
  }
}

@media screen and (max-width: 1023px) {
  .search {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* padding: 0 48px; */
  }
  .search-bar {
    width: auto;
    margin-top: 0;
    margin-left: 0;
  }
  .search-bar > input {
    width: 150px;
  }
  .search-bar > label {
    margin-top: 12px;
  }
  .main {
    padding: 0;
  }
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0;
    gap: 1px;
  }
}

@media screen and (max-width: 767px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0;
  }
  .search {
    padding: 0 12px;
  }
}
</style>
