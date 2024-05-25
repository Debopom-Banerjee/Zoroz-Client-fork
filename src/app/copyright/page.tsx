import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto bg-white p-10 rounded-xl lg:w-3/5 my-10">
        <h1 className="font-semibold text-4xl text-center w-full">Copyright</h1>
        <div className="text-justify w-full">
          ZOROZ PRIVATE LIMITED (“ZOROZ”) is the sole owner of all rights to
          www.zoroz.com (“Website”) and its content. ZOROZ also uses content
          from its vendors and third parties who may not be the original owners
          of the copyrights therein. Website content includes its design,
          layout, text, images, graphics, sound, and video. All titles,
          ownership, and intellectual property rights in the Website and its
          contents shall remain with ZOROZ. All rights not otherwise claimed
          under this agreement or by ZOROZ are hereby reserved. The information
          contained in this Website is intended solely to provide general
          information for personal or business use by the user, who accepts full
          responsibility for its use. Users should assume that standard
          copyright protection applies to all materials and contents displayed
          on the Website. ZOROZ does not represent or endorse the accuracy or
          reliability of any information, advertisements, or other content
          (collectively, the “content”) contained on, distributed through, or
          linked, downloaded, or accessed from any of the services contained on
          this Website. This includes the quality of any products, information,
          or other materials displayed or obtained by the user as a result of an
          advertisement or any other information or offer in or in connection
          with the service. We accept no responsibility for any errors or
          omissions, or for the results obtained from the use of the information
          contained in this Website. All information on this Website is provided
          “as is” with no guarantee of completeness, accuracy, timeliness, or of
          the results obtained from the use of this information. It is provided
          without warranty of any kind, express or implied, including but not
          limited to warranties of performance, merchantability, and fitness for
          a particular purpose. You may display, print, or download the content
          to a local hard disk for personal, non-commercial use, but only if you
          acknowledge the Website as the source of the material. In no event
          shall ZOROZ be liable for any direct, indirect, incidental, punitive,
          or consequential damages of any kind whatsoever with respect to the
          service, the materials, and the products available on the Website.
          Users of this site must hereby acknowledge that any reliance upon any
          content shall be at their sole risk. The information presented here
          has been compiled from publicly aired and published sources. ZOROZ
          respects these sources and is in no way trying to infringe on the
          respective copyrights or businesses of these entities. ZOROZ reserves
          the right, in its sole discretion and without any obligation, to make
          improvements to, or correct any errors or omissions in, any portion of
          the service or the materials.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
