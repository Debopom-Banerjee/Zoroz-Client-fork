import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto bg-white p-10 rounded-xl lg:w-3/5 my-10">
        <h1 className="font-semibold text-4xl text-center w-full">
          Ship & Delivery Policy
        </h1>
        <div className="text-justify w-full">
          Once the payment has been made for the product through zoroz.in,
          you’ll be shared tracking/order id, you may share this details through
          contact us page mentioning the query and alternatively, you may call
          us at +91 9311796739. For International buyers, orders are shipped and
          delivered through registered international courier companies and/or
          International speed post only. For domestic buyers, orders are shipped
          through registered domestic courier companies and /or speed post only.
          Orders are shipped within 6+ Days or as per the delivery date agreed
          at the time of order confirmation and delivering of the shipment
          subject to Courier Company / post office norms. RAMBO MOBIVERSE OPC
          PRIVATE LIMITED or ZOROZ is not liable for any delay in delivery by
          the courier company / postal authorities and only guarantees to hand
          over the consignment to the courier company or postal authorities
          within 6+ Days days from the date of the order and payment or as per
          the delivery date agreed at the time of order confirmation. Delivery
          of all orders will be to the address provided by the buyer. Delivery
          of our services will be confirmed on your mail ID as specified during
          registration. For any issues in utilizing our services you may contact
          our helpdesk on 9311796739 or zorozmobi@gmail. com or
          connect@zoroz.in. To return your product, you should drop an email
          with product details at connect@zoroz.in, post
          confirmation/acknowledgment from Zoroz Team, You’ll have courier the
          product(s) to the following address:
          <h6>ZOROZ OFFICE</h6>
          No.-289, Level 01, Tower A, Building 10, DLF Phase 2, Gurugram,
          Haryana -122018 Please ensure the items are packed securely to prevent
          any loss or damage during transit and the ORDER ID and registered
          mobile number is mentioned on the packaging. All items must be in
          unused condition with all original tags attached and packaging intact.
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable. If you receive
          a refund, the cost of return shipping will be deducted from your
          refund. Depending on where you live, the time it may take for your
          exchanged product to reach you may vary. If you are returning more
          expensive items, you may consider using a trackable shipping service
          or purchasing shipping insurance. We request that you do not use The
          Professional Couriers for self return as they are not reliable and the
          package will not be accepted at the warehouse. We recommend using
          ‘Speed Post’ as your courier service. Speed Post is a Government of
          India owned entity and has the most widely distributed postal network
          in India.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
