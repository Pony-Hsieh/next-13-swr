"use client";

import { useState, useMemo, useEffect } from "react";
import {
  useReactTable, // 掌管整個 table 的重要 hook
  getCoreRowModel, // 表格 row 的核心模型
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender, // 用來渲染 flex box
} from "@tanstack/react-table";

import mData from "./MOCK_DATA.json";

export default function User() {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const data = useMemo(() => mData, []);
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    // {
    //   header: "First Name",
    //   accessorKey: "first_name",
    //   footer: "First Name",
    // },
    // {
    //   header: "Last Name",
    //   accessorKey: "last_name",
    //   footer: "Last Name",
    // },
    {
      header: "Name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      accessorKey: "last_name",
      footer: "Name",
    },
    {
      header: "Email",
      accessorKey: "email",
      footer: "Email",
    },
    {
      header: "Gender",
      accessorKey: "gender",
      footer: "Gender",
    },
    {
      header: "Date Of Birth",
      accessorKey: "dob",
      footer: "Date Of Birth",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
  ];

  const table = useReactTable({
    data, // 輸入表格的資料
    columns, // thead 的欄位
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), // 一旦引入這行，將自動把資料每 10 筆分一頁
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onFilteringChange: setFiltering,
  });
  const testFn = () => {
    console.log("testFn");
  };

  return (
    <>
      <div>Hi!</div>
      DebouncedInput
      <DebouncedInput />
      <DebouncedInput
        type="text"
        value="testValue"
        list="1"
        onChange={testFn}
        // onChange={(value) => column.setFilterValue(value)}
        // placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        // className="w-36 border shadow rounded"
        // list={column.id + 'list'}
      />
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
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
                  {
                    { asc: "🔼", desc: "🔽" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
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
        {/* <tfoot>
          {table.getHeaderGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      {/* 這邊的按鈕功能有點問題
      <div>
        <button
          onClick={() => {
            console.log("第一頁");
            return table.setPageIndex(0);
          }}
        >
          First page
        </button>
        <button
          // disabled={!table.getCanPreviousPage()}
          // onClick={() => table.previousPage()}
          onClick={() => {
            console.log("上一頁");
            return table.previousPage();
          }}
        >
          Previous page
        </button>
        <button
          // disabled={!table.getCanNextPage()}
          // onClick={() => table.nextPage()}
          onClick={() => {
            console.log("下一頁");
            return table.nextPage();
          }}
        >
          Next page
        </button>
        <button
          type="button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last page
        </button>
      </div> */}
    </>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
