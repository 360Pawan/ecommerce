import { Address } from "@/components/checkout/address";
import { CartItem } from "@/components/checkout/cartItems";
import { Payment } from "@/components/checkout/payment";
import { Steps } from "@/components/checkout/steps";

const checkoutPage = () => {
  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <Steps />
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <CartItem />
        </div>
        <Address />
        {/* <Payment/> */}
      </div>
    </>
  );
};

export default checkoutPage;
