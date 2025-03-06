import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import Chart from 'react-apexcharts';

const DashboardData = () => {
  const [data, setData] = useState([]);
  const [baseUrl, setBaseUrl] = useState("http://localhost:9000/dashboard");
  const [vehiclefueltype, setVehicleFueltype] = useState([]);
  const [toptiles, setTopTiles] = useState([]);
  const [topfour, setTopFour] = useState([]);
  const [stats, setStats] = useState({});

  const [chartCategories, setChartCategories] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [vehiclesResponse, fuelTypeResponse, TopTiles, TopFour, Stats] = await Promise.all([
        axios.get(`${baseUrl}/getVehiclesByCountries`),
        axios.get(`${baseUrl}/getVehiclesByFuelType`),
        axios.get(`${baseUrl}/getTopTiles`),
        axios.get(`${baseUrl}/getTopFourCountriesByCount`),
        axios.get(`${baseUrl}/getStatistics`)
      ]);
      const formattedData = vehiclesResponse.data.map((item) => ({
        ...item,
        key: item.country_id,
      }));

      setData(formattedData);
      setTopFour(TopFour.data);
      setStats(Stats.data);
      setChartCategories(formattedData.map((item) => item.country_name));
      setChartSeries([{ name: "Vehicle Count", data: formattedData.map((item) => item.vehicle_count) }]);
      setVehicleFueltype(fuelTypeResponse.data);
      setTopTiles(TopTiles.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cardColors = ["#40A0FC", "brown", "cornflowerblue", "teal"];
  const lineChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: chartCategories },
    stroke: { curve: "smooth" },
  };

  const pieChartOptions = {
    chart: { type: "donut", toolbar: { show: false } },
    labels: topfour.map(item => item.country_name),
    colors: cardColors, 
    dataLabels: {
      enabled: true,
      formatter: (val, { seriesIndex }) => `${topfour[seriesIndex].vehicle_count}`,
    },
    legend: { position: "bottom" },
  };
  
  const pieChartSeries = topfour.map(item => item.vehicle_count);


  const years = [...new Set(vehiclefueltype.map((item) => item.registration_year))].sort();
  const groupedData = vehiclefueltype.reduce((acc, { fuel_type, registration_year, total_vehicles }) => {
    if (!acc[fuel_type]) acc[fuel_type] = { name: fuel_type, data: Array(years.length).fill(0) };
    const index = years.indexOf(registration_year);
    acc[fuel_type].data[index] = Number(total_vehicles);
    return acc;
  }, {});

  const StackedChartOptions = {
    series: Object.values(groupedData),
    chart: { type: "area", height: 300, toolbar: { show: false } },
    colors: ["#008FFB", "#00E396", "#CED4DC"],
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
    fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.8 } },
    legend: { position: "top", horizontalAlign: "left" },
    xaxis: { categories: years }
  };

  
  return (
    <>
          <h5>Dashboard</h5>
          <div className="row mt-3 justify-content-center">
            {toptiles.map((item, index) => (
              <div className="col-md-3 col-sm-6 col-12 mb-2" key={index}> 
                <div className="card shadow border-0">
                  <div className="card-body text-center text-white" style={{background: cardColors[index]}}>
                    <h5 className="card-title fw-bold">{item.vehicle_type}</h5>
                    <p className="card-text">{Number(item.total_vehicles).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="row mt-1 justify-content-center">
          <div className="col-md-6 col-sm-12 mb-2">
            <div className="card shadow border-0">
              <div className="card-header text-black text-start">
                <h6 className="mt-2">Vehicle Count by Country</h6>
              </div>
              <div className="card-body text-center chart-container">
                <Chart options={lineChartOptions} series={chartSeries} type="bar" height={300} width={500} />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mb-2">
            <div className="card shadow border-0">
              <div className="card-header text-black text-start">
              <h6 className="mt-2">Vehicle Count by Fuel Type</h6>
              </div>
              <div className="card-body text-center chart-container">
              <Chart options={StackedChartOptions} series={StackedChartOptions.series} type="line" height={300} width={500} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-1 justify-content-center">
          <div className="col-md-6 col-sm-12 mb-2">
            <div className="card shadow border-0">
              <div className="card-header text-black text-start">
              <h6 className="mt-2">Top 4 Countries By Vehicle Count</h6>
              </div>
              <div className="card-body text-center chart-container">
              <Chart options={pieChartOptions} series={pieChartSeries} type="donut" height={250} width={470}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mb-2">
            <div className="card shadow border-0">
              <div className="card-header text-black text-start">
              <h6 className="mt-2">Statistics</h6>
              </div>
              <div className="card-body text-center chart-container">
                <div className="row w-100">
                <div className="col-12 mb-2">
                  <div className="card border-0" style={{background: "teal"}}>
                    <div className="card-body text-white text-center">
                    <h6 className="mt-2">Total Countires</h6> <span className="fw-bold">{stats.country_count}</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-2">
                  <div className="card border-0" style={{background: "#40A0FC"}}>
                    <div className="card-body text-white text-center">
                    <h6 className="mt-2">Total Vehicles</h6> <span className="fw-bold">{stats.vehicle_count}</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </>
  );
};

export default DashboardData;
