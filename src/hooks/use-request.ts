//https://github.com/vercel/swr/blob/main/examples/axios-typescript/libs/useRequest.ts
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '@/utils/request';
import { useEffect, useMemo } from 'react';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isLoading' | 'isValidating' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}
// use axiosInstance.request(config) -> config={method:...,url:...,data:...}
// https://axios-http.com/docs/req_config
export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const controller = useMemo(() => new AbortController(), [request?.url]);
  if (request !== null) {
    request = { ...request, controller };
  }
  useEffect(() => {
    return () => {
      if (request?.isAbortWhenUnmount === true) {
        controller.abort();
      }
    };
  }, [controller]);

  const {
    data: response,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request,
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */

    () => axiosInstance.request<Data>(request!),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      fallbackData:
        fallbackData &&
        ({
          status: 200,
          statusText: 'InitialData',
          config: request!,
          headers: {},
          data: fallbackData,
        } as AxiosResponse<Data>),
      ...config,
    }
  );
  return {
    data: response && response.data,
    response,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
