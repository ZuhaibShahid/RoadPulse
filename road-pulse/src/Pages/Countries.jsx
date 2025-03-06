import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Table} from 'antd';

const CountriesData = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/countries");
      const formattedData = response.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatLargeNumber = (value) => {
    if (value >= 1_000_000_000_000) return (value / 1_000_000_000_000).toFixed(0) + "T"; 
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(0) + "B"; 
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(0) + "M"; 
    return new Intl.NumberFormat("en-US").format(value); 
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },  
    { title: "Name", dataIndex: "name", key: "name" },  
    { title: "ISO Code", dataIndex: "iso_code", key: "iso_code" },  
    { title: "Phone Code", dataIndex: "phone_code", key: "phone_code" },  
    { title: "Currency", dataIndex: "currency", key: "currency" },  
    { title: "GDP", dataIndex: "gdp", key: "gdp" ,render: (value) => "$" + formatLargeNumber(value)},  
    { title: "Population", dataIndex: "population", key: "population" , render: (value) => formatLargeNumber(value)},  
    { title: "Continent", dataIndex: "continent", key: "continent"},  
    { title: "Road Length (km)", dataIndex: "road_length_km", key: "road_length_km" ,render: (value) => new Intl.NumberFormat("en-US").format(value)}, 
    { title: "Total Vehicles", dataIndex: "vehicle_count", key: "vehicle_count" ,render: (value) => new Intl.NumberFormat("en-US").format(value)},  
    { title: "Created At", dataIndex: "createdAt", key: "createdAt",render: (date) => dayjs(date).format("YYYY-MM-DD") }
  ];
  
  return (
    <>
        <h5 className="mb-3">Countries</h5>
          <Table
            columns={columns}
            dataSource={data}
            size="small"
            scroll={{ x: true }}
            style={{
            overflowX: "auto",
              padding: "8px",
              borderRadius: "5px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxHeight: "38em"
            }}
          />
  </>
  
  );
};

export default CountriesData;
