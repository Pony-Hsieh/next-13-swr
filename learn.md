# 透過 scaffold(腳手架) 迅速 run 起一個專案
- Nextjs 13  
  `$ npx create-next-app@latest next-13-swr`

# SWR
## 教學文章
- [You won't BELIEVE what I just did with TanStack's React Tables!](https://www.youtube.com/watch?v=AuLg79Th3xE)
- [React, HTML, Headless UI and Tanstack Tables. Part-I](https://medium.com/@it_it_ayush/react-html-headless-ui-and-tanstack-tables-part-i-1f6fa2358082)
- [Tanstack Table: Some API’s. Part-2](https://medium.com/@it_it_ayush/tanstack-table-some-apis-part-2-a8a5d713062d)

# react-table
- `onSortingChange`
  - If provided, this function will be called with an `updaterFn` when `state.sorting` changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.
  - [官方文檔連結](https://tanstack.com/table/v8/docs/api/features/sorting#onsortingchange)
- `onColumnFiltersChange`
  - If provided, this function will be called with an `updaterFn` when `state.columnFilters` changes. This overrides the default internal state management, so you will need to persist the state change either fully or partially outside of the table.
  - [官方文檔連結](https://tanstack.com/table/v8/docs/api/features/filters#oncolumnfilterschange)

# 遇到的問題
- 頁面的 meta data 無法正確顯示
  - 參考文章
    - [Not able to change the title with metadata when using 'use client' in Next.js](https://stackoverflow.com/questions/76445050/not-able-to-change-the-title-with-metadata-when-using-use-client-in-next-js)
    - [Metadata not showing in tab Next.js 13.4.1](https://stackoverflow.com/questions/76327674/metadata-not-showing-in-tab-next-js-13-4-1)

# 參考文章
- [#09 No-code 之旅 — 怎麼在 Client-side 抓取資料？SWR 簡介](https://ithelp.ithome.com.tw/articles/10271427)
