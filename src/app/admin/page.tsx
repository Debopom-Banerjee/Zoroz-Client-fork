"use client";
import React from 'react'
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
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

const InfoCard = ({ title, value, color,icon }: { 
  title: string, 
  value: string,
  color: string,
  icon?: React.ReactNode
}) => {
  return (
    <div className={`bg-${color}-400 p-3  w-[300px] h-[150px] justify-between  text-white flex flex-row items-start rounded-md shadow-md `}>
      <div className='flex  flex-col items-start gap-5'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <p className='text-xl font-bold'>{value}</p>
      </div>
      {icon}
    </div>
  )
}

const adminCards = [
  { title: 'Total Users', value: '100', icon: <FaUser size={40} />, color: 'orange' },
  { title: 'Total Orders', value: '100', icon: <FaShoppingCart size={40} />, color: 'green' },
  { title: 'Total Products', value: '100', icon: <RiProductHuntFill size={40} />, color: 'yellow' },
  { title: 'Total Categories', value: '100', icon: <MdOutlineCategory size={40} />, color: 'indigo' },
  { title: 'Total Brands', value: '100', icon: <MdBrandingWatermark size={40} />, color: 'red' },
  { title: 'Total Vendors', value: '100', icon: <FaBusinessTime size={40} />, color: 'violet' },
]

const salesData = [
  { month: "January", sales: 100 },
  { month: "February", sales: 150 },
  { month: "March", sales: 200 },
  { month: "April", sales: 120 },
  { month: "May", sales: 180 },
  { month: "June", sales: 250 },
];


const page = () => {
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
  return (
    <div className='flex flex-col items-start gap-10 px-10'>
<div className='my-5 flex flex-row flex-wrap w-full items-start gap-12 '>
      {
        adminCards.map((card, index) => (
          <InfoCard key={index} title={card.title} value={card.value} color={card.color} icon={card.icon} />
        ))
      }
    </div>
    
    <h1 className='font-semibold text-lg'>Analytics</h1>
      <div className='flex flex-col items-start h-full w-full lg:w-[50%]'>
      <Line data={data}
      // @ts-ignore
      options={options}></Line>
      </div>
  
     
      
    </div>
    
  )
}

export default page
