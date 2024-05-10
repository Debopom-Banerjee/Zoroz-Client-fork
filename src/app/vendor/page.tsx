"use client"
import React from 'react'
import { FaBusinessTime, FaShoppingCart, FaUser } from 'react-icons/fa'
import { MdBrandingWatermark, MdOutlineCategory } from 'react-icons/md'
import { RiProductHuntFill } from 'react-icons/ri'
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
const InfoCard = ({ title, value, color,icon }: { 
  title: string, 
  value: string,
  color: string,
  icon?: React.ReactNode
}) => {
  return (
    <div className={`bg-${color}-400 p-3 mx-auto w-[300px] h-[150px] justify-between  text-white flex flex-row items-start rounded-md shadow-md `}>
      <div className='flex  flex-col items-start gap-5'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <p className='text-xl font-bold'>{value}</p>
      </div>
      {icon}
    </div>
  )
}

const adminCards = [
 
  { title: 'Total Orders', value: '100', icon: <FaShoppingCart size={40} />, color: 'green' },
  { title: 'Total Products', value: '100', icon: <RiProductHuntFill size={40} />, color: 'yellow' },
  { title: 'Total Categories', value: '100', icon: <MdOutlineCategory size={40} />, color: 'indigo' },
  { title: 'Total Brands', value: '100', icon: <MdBrandingWatermark size={40} />, color: 'red' },
]

const page = () => {
  const salesData = [
    { month: "January", sales: 100 },
    { month: "February", sales: 150 },
    { month: "March", sales: 200 },
    { month: "April", sales: 120 },
    { month: "May", sales: 180 },
    { month: "June", sales: 250 },
  ];
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
    <div className='my-5 flex flex-row flex-wrap w-full items-center gap-20 px-10'>
      {
        adminCards.map((card, index) => (
          <InfoCard key={index} title={card.title} value={card.value} color={card.color} icon={card.icon} />
        ))
      }
      <h1 className='font-semibold text-xl'>Analytics</h1>
    <div className='flex flex-row flex-wrap items-center gap-5 w-full justify-evenly'>
    <div className='flex flex-col items-start h-full w-full lg:w-[40%]'>
      <Line data={data}
      // @ts-ignore
      options={options}></Line>
      </div>
     
    </div>
    </div>
  )
}

export default page
