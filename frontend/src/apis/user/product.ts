import { apiInstance, headers } from '..';
import type { INoContent, IResultType } from '@/types/api';
import type { IAllProduct, IDetailEditProduct, IDetailProduct } from '@/types/product';
import { type AxiosResponse } from 'axios';

const api = apiInstance();

const productAPI = {
  endPoint: {
    getAll: `api/products/view`,
    postProduct: `api/products/new`,
    getProduct: `api/products/view/`,
    getEditProduct: `api/products/edit/`,
    editProduct: `api/products/edit/`,
    deleteProduct: `api/products/remove/`
  },
  headers: {},
  getAll: (): Promise<IResultType<Array<IAllProduct>>> => {
    // 전체 조회
    return api
      .get(productAPI.endPoint.getAll)
      .then((res: AxiosResponse) => {
        const { data } = res;
        return { isSuccess: true, data: data.responses, code: res.status };
      })
      .catch((error) => {
        if (error.response) {
          return {
            isSuccess: false,
            message: error.response.data.message,
            code: error.response.status
          };
        }
        return { isSuccess: false, message: error.message, code: error.response.status };
      });
  },
  postProduct: (token: string, formData: FormData): Promise<INoContent> => {
    // 상품 등록
    return api
      .post(productAPI.endPoint.postProduct, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        return { isSuccess: true, message: '', code: res.status };
      })
      .catch((error) => {
        if (error.response) {
          return {
            isSuccess: false,
            message: error.response.data.message,
            code: error.response.status
          };
        }
        return { isSuccess: false, message: error.message, code: error.response.status };
      });
  },
  getProduct: (token: string, productId: string): Promise<IResultType<IDetailProduct>> => {
    // 상품 상세 조회
    return api
      .get(productAPI.endPoint.getProduct + productId, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        return { isSuccess: true, data: res.data, code: res.status };
      })
      .catch((error) => {
        if (error.response) {
          return {
            isSuccess: false,
            message: error.response.data.message,
            code: error.response.status
          };
        }
        return { isSuccess: false, message: error.message, code: error.response.status };
      });
  },
  getEditProduct: (token: string, productId: string): Promise<IResultType<IDetailEditProduct>> => {
    // 수정할 상품 조회
    return api
      .get(productAPI.endPoint.getEditProduct + productId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        return { isSuccess: true, data: res.data, code: res.status };
      })
      .catch((error) => {
        if (error.response) {
          return {
            isSuccess: false,
            message: error.response.data.message,
            code: error.response.status
          };
        }
        return { isSuccess: false, message: error.message, code: error.response.status };
      });
  },
  editProduct: (token: string, productId: string, formData: FormData): Promise<INoContent> => {
    // 상품 수정
    return api
      .put(productAPI.endPoint.editProduct + productId, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        return { isSuccess: true, message: '', code: res.status };
      })
      .catch((error) => {
        if (error.response) {
          return {
            isSuccess: false,
            message: error.response.data.message,
            code: error.response.status
          };
        }
        return { isSuccess: false, message: error.message, code: error.response.status };
      });
  },
  deleteProduct: (token: string, productId: string): Promise<INoContent> => {
    // 상품 삭제
    return api
      .delete(productAPI.endPoint.deleteProduct + productId, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        return { isSuccess: true, message: '', code: res.status };
      })
      .catch((error) => {
        if (error.response) {
          return {
            isSuccess: false,
            message: error.response.data.message,
            code: error.response.status
          };
        }
        return { isSuccess: false, message: error.message, code: error.response.status };
      });
  }
};

export default productAPI;
