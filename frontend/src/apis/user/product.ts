import { apiInstance, headers } from '..';
import { ApiType } from '@/constants/apiType';
import type { INoContent, IResultType } from '@/types/api';
import type { IDetailProduct, IEditProduct, IProduct } from '@/types/product';
import { AxiosError, type AxiosResponse } from 'axios';

const api = apiInstance();

const productAPI = {
  endPoint: {
    getAll: `api/products/view`,
    postProduct: `api/products`,
    getProduct: `api/products/view/`,
    getEditProduct: `api/products/edit/`,
    editProduct: `api/products/edit/`,
    deleteProduct: `api/products/delete/`
  },
  headers: {},
  getAll: (): Promise<IResultType<Array<IProduct>>> => {
    return api
      .get(productAPI.endPoint.getAll)
      .then((res: AxiosResponse) => {
        const { data } = res;
        return { isSuccess: true, data: data, type: ApiType.PRODUCT };
      })
      .catch((err: AxiosError) => {
        return { isSuccess: false, message: err.message, type: ApiType.PRODUCT };
      });
  },
  postProduct: (token: string, formData: FormData): Promise<INoContent> => {
    return api
      .post(productAPI.endPoint.postProduct, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        return { isSuccess: true, message: '' };
      })
      .catch((error: AxiosError) => {
        return { isSuccess: false, message: error.message };
      });
  },
  getProduct: (productId: string): Promise<IResultType<IDetailProduct>> => {
    return api
      .get(productAPI.endPoint.getProduct + productId)
      .then((res: AxiosResponse) => {
        return { isSuccess: true, data: res.data, type: ApiType.PRODUCT };
      })
      .catch((error: AxiosError) => {
        return { isSuccess: false, message: error.message, type: ApiType.PRODUCT };
      });
  },
  getEditProduct: (token: string, productId: string): Promise<IResultType<IEditProduct>> => {
    return api
      .get(productAPI.endPoint.getEditProduct + productId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        return { isSuccess: true, data: res.data, type: ApiType.PRODUCT };
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return { isSuccess: false, message: error.message, type: ApiType.PRODUCT };
      });
  },
  editProduct: (token: string, productId: string, formData: FormData): Promise<INoContent> => {
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
        return { isSuccess: true, message: '' };
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return { isSuccess: false, message: error.message };
      });
  },
  deleteProduct: (token: string, productId: string): Promise<INoContent> => {
    return api
      .delete(productAPI.endPoint.deleteProduct + productId, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        return { isSuccess: true, message: '' };
      })
      .catch((error: AxiosError) => {
        console.log(error);
        return { isSuccess: false, message: error.message };
      });
  }
};

export default productAPI;