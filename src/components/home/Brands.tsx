"use client";
import { Accordion } from "flowbite-react";
import React from "react";

const BrandSubChip = () => {
  return (
    <div className="flex flex-col pb-2 border-b border-slate-500 text-slate-500 w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <h1>Wellton Healthcare</h1>
        <h1>{">"}</h1>
      </div>
    </div>
  );
};

const Brands = () => {
  return (
    <Accordion className="w-full block md:hidden">
      <Accordion.Panel>
        <Accordion.Title className="font-semibold text-black">
          Brands from Electronic Devices
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex flex-col items-center w-full gap-3">
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="font-semibold text-black">
          Brands from Electronic Devices
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex flex-col items-center w-full gap-3">
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="font-semibold text-black">
          Brands from Electronic Devices
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex flex-col items-center w-full gap-3">
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="font-semibold text-black">
          Brands from Electronic Devices
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex flex-col items-center w-full gap-3">
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
            <BrandSubChip />
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default Brands;
