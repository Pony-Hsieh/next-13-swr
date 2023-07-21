"use client";

import useSWR from "swr";
import Select from "react-select";
import { cloneDeep } from "lodash-es";
import { fetcher } from "../utilities/tools";

let allData = [];

function filterOptions(candidate, input) {
  if (input) {
    return candidate?.value?.includes(input.replace(/台/g, "臺"));
  }
  return true;
}

function getDistrictsByCounty(selectedCounty) {
  const res = [];
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].name === selectedCounty) {
      allData[i].districts.forEach(({ name }) => {
        res.push({
          name,
          checked: true,
        });
      });
      break;
    }
  }
  return res;
}

export default function SelectCountyAndDistrict(props) {
  const {
    selectedCounty,
    setSelectedDistricts,
    selectedDistricts,
    setSelectedCounty,
    allDistrictsChecked,
    setAllDistrictsChecked,
  } = props;
  const countyOptions = [];

  const { data, isLoading, error } = useSWR(
    "https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json",
    fetcher,
    {
      // 由於行政區的變更沒有那麼快，所以重新聚焦當前視窗時，不需要再重新 load 資料
      revalidateOnFocus: false,
      onSuccess: (data) => {
        allData = data;
      },
    }
  );
  if (!data) {
    return;
  }
  // Step: 製作下拉式選單的資料
  // 如果放在 onSuccess 中的話，會無法渲染 option list
  data.forEach((county) => {
    countyOptions.push({
      value: county.name,
      label: county.name,
    });
    // Step: 手動新增 "臺大公館校區"
    if (county.name === "臺北市") {
      let flag = false;
      county.districts.forEach((district) => {
        if (district.name === "臺大公館校區") {
          flag = true;
        }
      });
      if (flag === false) {
        county.districts.push({ zip: "0", name: "臺大公館校區" });
      }
    }
  });

  return (
    <div>
      <h3>選擇縣市</h3>
      {/* 縣市下拉式選單 */}
      <Select
        placeholder="請選擇縣市"
        defaultValue="臺北市"
        options={countyOptions}
        onChange={({ value }) => {
          setSelectedCounty(value);
          setSelectedDistricts(getDistrictsByCounty(value));
          setAllDistrictsChecked(true);
        }}
        filterOption={filterOptions}
        noOptionsMessage={() => {
          return "查無相對應的縣市";
        }}
      />
      {selectedCounty === "臺北市" ? (
        <>
          <h3>選擇行政區</h3>
          {/* 全選 | 全不選 */}
          {selectedCounty ? (
            <>
              <input
                type="checkbox"
                checked={allDistrictsChecked}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (selectedDistricts.length === 0) {
                    return;
                  }
                  const newDistricts = selectedDistricts.map((district) => {
                    return { ...district, checked };
                  });
                  setSelectedDistricts(newDistricts);
                  setAllDistrictsChecked(checked);
                }}
                id="checkAll"
              />
              <label htmlFor="checkAll">
                {allDistrictsChecked ? "全部取消勾選" : "全部勾選"}
              </label>
            </>
          ) : null}
          <br />
          {/* 對應行政區勾選方框 */}
          {selectedDistricts.map(({ name, checked }) => (
            <div key={name}>
              <input
                type="checkbox"
                id={`districtList${name}`}
                name={name}
                value={name}
                checked={checked}
                onChange={(e) => {
                  const selectedDistrict = e.target.value;
                  const newDistricts = cloneDeep(selectedDistricts);
                  newDistricts.forEach((district) => {
                    if (district.name === selectedDistrict) {
                      district.checked = e.target.checked;
                    }
                  });
                  setSelectedDistricts(newDistricts);
                }}
              />
              <label htmlFor={`districtList${name}`}>{name}</label>
            </div>
          ))}
        </>
      ) : selectedCounty === "" ? null : (
        <p>目前僅提供臺北市的資料</p>
      )}
    </div>
  );
}
