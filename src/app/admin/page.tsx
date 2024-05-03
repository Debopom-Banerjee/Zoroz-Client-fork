import React from 'react'
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
    <div className={`bg-${color}-400 p-3 justify-between  text-white flex flex-row items-start rounded-md shadow-md w-[400px] h-[200px]`}>
      <div className='flex mt-10 flex-col items-start gap-5'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      <p className='text-2xl font-bold'>{value}</p>
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

const page = () => {
  return (
    <div className='my-5 flex flex-row flex-wrap w-full items-center gap-20 px-10'>
      {
        adminCards.map((card, index) => (
          <InfoCard key={index} title={card.title} value={card.value} color={card.color} icon={card.icon} />
        ))
      }
    </div>
  )
}

export default page
