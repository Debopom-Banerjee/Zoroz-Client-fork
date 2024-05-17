"use client";
import React, { useEffect, useState } from 'react'
import { Doughnut, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);
import { FaBusinessTime, FaShoppingCart, FaUser } from 'react-icons/fa'
import { MdBrandingWatermark, MdOutlineCategory } from 'react-icons/md'
import { RiProductHuntFill } from 'react-icons/ri'
import { getCounts } from '@/utils/functions/getCounts';

const InfoCard = ({ title, value, color,icon }: { 
  title: string, 
  value: string,
  color: string,
  icon?: React.ReactNode
}) => {
  return (
    <div className={`bg-${color} p-3  w-[300px] h-[150px] justify-between  text-white flex flex-row items-start rounded-md shadow-md `}>
      <div className='flex  flex-col items-start gap-5'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <p className='text-xl font-bold'>{value}</p>
      </div>
      {icon}
    </div>
  )
}



const adminCards = [
  { title: 'Total Users', value: 'userCount', icon: <FaUser size={40} />, color: 'yellow-400' },
  { title: 'Total Orders', value: 'orderCount', icon: <FaShoppingCart size={40} />, color: 'green-400' },
  { title: 'Total Products', value: 'productCount', icon: <RiProductHuntFill size={40} />, color: 'yellow-600' },
  { title: 'Total Categories', value: 'categoriesCount', icon: <MdOutlineCategory size={40} />, color: 'indigo-400' },
  { title: 'Total Brands', value: 'brandsCount', icon: <MdBrandingWatermark size={40} />, color: 'red-400' },
  { title: 'Total Vendors', value: 'vendorsCount', icon: <FaBusinessTime size={40} />, color: 'indigo-600' },
];

const salesData = [
  { month: "January", sales: 100 },
  { month: "February", sales: 150 },
  { month: "March", sales: 200 },
  { month: "April", sales: 120 },
  { month: "May", sales: 180 },
  { month: "June", sales: 250 },
];


const page = () => {
  const [counts, setCounts] = useState<any>({})
  useEffect(() => {
    const fetchCounts = async()=>{
     const data = await getCounts()
     setCounts(data)
    }
     fetchCounts()
 }, []);
  const data = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: "Count",
        data: salesData.map((data) => data.sales),
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context:any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Orders",
          padding: {
            bottom: 5,
          },
          font: {
            size: 12,
            style: "italic",
            family: "Arial",
          },
        },
        min: 50,
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Month",
          padding: {
            top: 10,
          },
          font: {
            size: 10,
            style: "italic",
            family: "Arial",
          },
        },
      },
    },
  };
  let data2= [
    {
      label: "Users",
      value: 55,
      color: "rgba(0, 43, 73, 1)",
      cutout: "50%",
    },
    {
      label: "Vendors",
      value:15,
      color: "rgba(0, 103, 160, 1)",
      cutout: "50%",
    },
    
  ]
  
    const pieOptions: any = {
      plugins: {
        responsive: true,
      },
      cutout: data2.map((item) => item.cutout),
    };
  
    const finalData = {
      labels: data2.map((item) => item.label),
      datasets: [
        {
          data: data2.map((item) => Math.round(item.value)),
          backgroundColor: data2.map((item) => item.color),
          borderColor: data2.map((item) => item.color),
          borderWidth: 1,
          dataVisibility: new Array(data2.length).fill(true),
        },
      ],
    };
  return (
    <div className='flex flex-col items-start gap-10 px-10'>
<div className='my-5 flex flex-row flex-wrap w-full items-start gap-12 '>
{adminCards.map((card, index) => (
          <InfoCard key={index} title={card.title} value={counts[card.value]} color={card.color} icon={card.icon} />
        ))}
    </div>
    
    <h1 className='font-semibold text-xl'>Analytics</h1>
    <div className='flex flex-row flex-wrap items-center gap-5 w-full justify-evenly'>
    <div className='flex flex-col items-start h-full w-full lg:w-[40%]'>
      <Line data={data}
      // @ts-ignore
      options={options}></Line>
      </div>
      <div className='flex flex-col items-start h-full w-full lg:w-[30%]'>
      <Doughnut data={finalData} options={pieOptions} />
      </div>
    </div>
    
     
      
    </div>
    
  )
}

export default page
