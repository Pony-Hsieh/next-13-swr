import useSWR from 'swr';

import { fetcher } from "../utilities/tools";

// 格式
// const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher, options)

export function getTaiwanCountiesAndDistricts() {
  const { data, isLoading, error } = useSWR(
    "https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json",
    fetcher,
    {
      // 由於行政區的變更沒有那麼快，所以重新聚焦當前視窗時，不需要再重新 load 資料
      revalidateOnFocus: false,
    }
  );
  return {
    data,
    isLoading,
    error
  };
}

export function getYoubikeData() {
  const { data, error, isLoading } = useSWR("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json", fetcher);
  return {
    data,
    isLoading,
    error
  };
}

export function getUser(id) {
  const { data, error, isLoading } = useSWR(`https://api.github.com/users/${id}`, fetcher);
  return {
    user: data,
    isLoading: isLoading,
    error: error
  };
}
