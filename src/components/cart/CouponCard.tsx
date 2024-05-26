export const CouponCard = ({ coupon }: { coupon: any }) => {
  return (
    <div className="flex flex-col items-start ">
      <h1 className="font-semibold text-sm">{coupon.name}</h1>
      <h1 className="font-semibold text-xs ">
        {coupon.discount_text}
      </h1>
      <h1 className="font-semibold text-base">
        Discount : <span className="text-geen-500 ">{coupon.name} Off</span>{" "}
      </h1>
      <h1>Valid Till : {new Date(coupon.expiryDate).toDateString()}</h1>
    </div>
  );
};
