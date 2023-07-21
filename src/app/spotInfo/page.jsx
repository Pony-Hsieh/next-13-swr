"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender, // 渲染表格內容用
} from "@tanstack/react-table";
import { getYoubikeData } from "../customHooks/fetchData";
import { feedbackMessage } from "../utilities/feedbackMessage";

export default function SpotInfo() {
  const { data, error, isLoading } = getYoubikeData();
  const columns = [
    {
      header: "行政區",
      accessorKey: "sarea",
    },
    {
      header: "站點名稱",
      accessorKey: "ar",
    },
    {
      header: "可借車輛",
      accessorKey: "sbi",
    },
    {
      header: "可還空位",
      accessorKey: "bemp",
    },
  ];
  const table = useReactTable({
    // 最基礎的表格，須引入下方三行(data, columns, getCoreRowModel)
    data, // 輸入表格的資料
    columns, // thead 的欄位
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return <p>{feedbackMessage.error}</p>;
  }

  return (
    <div style={{ height: "100vh" }}>
      {data ? (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : isLoading ? (
        <p>{feedbackMessage.loading}</p>
      ) : null}
    </div>
  );
}
