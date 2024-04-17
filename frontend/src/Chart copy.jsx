
import React from 'react';
import HistogramChart from './HistogramChart3';
import { useState, useEffect } from 'react';
//import data from './sample-data.json';
import axios from 'axios';
import './App.css';


const Chart = () => {

  var [charts, setCharts] = useState([]);
  var [slicedData, setSlicedData]= useState([]);
  useEffect(() => {
      fetchData();
  }, [charts])
  useEffect(()=>{
    setSlicedData(charts);
  },[charts])

  //console.log(data);
    var fetchData = () => {
      axios.get(`http://localhost:4000/machine/2024-01-21%2014%3A59%3A59/2024-01-21%2015%3A01%3A38`, {}).then((response) => {
          // Assuming `setCharts` is a function to set the data for your charts
          setCharts(response.data.data);
          console.log(response.data); // Logging the data to console
          // Further processing of the data can be done here
      }).catch((error) => {
          console.error('Error fetching data:', error);
      });
  }

  //const slicedData = charts;
  const histogramData = {
    
    labels: slicedData?slicedData.map((point,index) => point.ts):[],
    datasets: [
      {
        label: 'Machine Status',
         data: slicedData.map(() => 1),
        // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        backgroundColor: (context) => {
          const value = slicedData[context.dataIndex].machine_status;
          return value === 0
            ? 'yellow'
            : value === 1
              ? 'green'
              : 'red';
        },
        borderColor: 'black',
      },
    ],

  };
  console.log({ histogramData });
  return (
    <div className='graphdiv'>
      <h1>Histogram Chart Example</h1>
      <HistogramChart data={histogramData} />
    </div>
  );
};

export default Chart;