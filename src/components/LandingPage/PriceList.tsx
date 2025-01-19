import Link from "next/link";
import { Tick } from "@/utils/Icon";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstanceWithHeader } from "@/utils/AxiosHeader";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_LIVE || ""
);

const PriceList = () => {
  const lists = [
    {
      name: "Free Plan",
      price: "0",
      features: [
        "Limited AI Q&A",
        "Upload up to 5 documents",
        "Basic management",
        "Real-Time Interaction",
        "Community Support",
      ],
      className: "price-white",
    },
    {
      name: "Premium Plan",
      price: "9.99",
      features: [
        "Limited AI Q&A",
        "Upload up to 50 documents",
        "Advanced management",
        "Multiple Document Analysis",
        "Priority Email Support",
        "Access to New Features",
      ],
      className: "price-gradient",
    },
    {
      name: "Enterprise Plan",
      price: "Custom Pricing",
      features: [
        "All Premium Features",
        "Unlimited Document Upload",
        "Custom AI Models",
        "Dedicated Manager",
        "24/7 Support",
        "Enterprise-Level Security",
      ],
      className: "price-white",
    },
  ];

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
  
      // Use axiosInstanceWithHeader to make the API call
      const response = await axiosInstanceWithHeader.post("/payment/create-checkout-session");
  
      // const session = response.data;
      const {sessionId} = await response.data;
      console.log(sessionId);
      

    if (!sessionId) {
      throw new Error("Failed to create session");
    }
  
      // Redirect to Checkout
      const result = await stripe?.redirectToCheckout({ sessionId: sessionId });
  
      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error: any) {
      console.error("Error during payment:", error);
    }
  };
  

  return (
    <section className="flex justify-center items-center w-full bg-[#021221]">
      <div className="flex justify-center items-center flex-col w-[90%] llg:w-[95%] lmd:w-[95%] py-14 rounded-lg">
        <aside className="flex justify-center items-center flex-col mb-2">
          <h1 className="font-Ubuntu font-semibold text-white text-3xl lmd:text-2xl">
            Pricing
          </h1>
          {/* <span className="bg-[#FFC71F] h-[4px] w-full absolute z-[-3] bottom-[10px] "></span> */}
        </aside>
        <p className="mb-12 text-center text-white">
          Choose the plan that best fits your needs and unlock the full
          potential of your PDFs with AlwaysPDF. <br />
          Note: All plans come with a 14-day free trial
        </p>
        <main className="grid grid-cols-3 lmd:grid-cols-1 gap-10 w-[90%] justify-center">
          {lists?.map((item, i) => (
            <div
              className={`flex justify-center items-start rounded-2xl text-white bg-[#141F49] py-4 h-full bg-[url('/assets/priceline.svg')] bg-no-repeat bg-right-bottom`}
              key={i}
            >
              <aside className="w-[90%] flex h-full flex-col">
                <div className={`border-b py-2 border-white`}>
                  <h3 className={`font-Ubuntu font-semibold mb-5 text-white`}>
                    {item?.name}{" "}
                    <small className="text-[14px] font-Ubuntu">
                      {item?.name === "Free Plan" ? "(Forever FREE)" : ""}
                    </small>
                  </h3>
                  <h4
                    className={`font-Ubuntu text-xl font-semibold text-white ${item?.name !== "Enterprise Plan" ? "font-semibold" : "font-medium"}`}
                  >
                    {item?.name !== "Enterprise Plan" && "$"}
                    {item?.price}{" "}
                    <small className="text-xs font-light">
                      {item?.name === "Free Plan"
                        ? "/month"
                        : item?.name !== "Enterprise Plan"
                          ? "/month or $99.99/year"
                          : "(Contact for a quote)"}
                    </small>
                  </h4>
                </div>
                <aside className="flex flex-col justify-between h-full">
                  <div className="mt-4">
                    <h1 className="mb-4">Features</h1>
                    <div>
                      {item?.features?.map((feats, i) => (
                        <div
                          key={i}
                          className="mb-4 flex justify-start items-center"
                        >
                          <Tick />
                          {/* {item?.name === "Free Plan" ? (
                          <FreeTick />
                        ) : item?.name === "Premium Plan" ? (
                          <PremiumTick />
                        ) : (
                          <EnterpriseTick />
                        )} */}
                          <p className="ml-2">{feats}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex justify-center text-center items-center ">
                    {item.name === "Free Plan" && (
                      <Link
                        href="/auth/email"
                        className={`w-full rounded-md py-2 bg-[#0070E0] text-white`}
                      >
                        {" "}
                        Get Started
                      </Link>
                    )}
                    {item.name === "Premium Plan" && (
                      <button
                        className={`w-full rounded-md py-2 bg-[#0070E0] text-white`}
                        onClick={handlePayment}
                      >
                        Get Started
                      </button>
                    )}
                    {item.name === "Enterprise Plan" && (
                      <Link
                        href="mailto:alwayspdf2@gmail.com"
                        className={`w-full rounded-md py-2 bg-[#0070E0] text-white`}
                      >
                        Contact Us
                      </Link>
                    )}
                  </div>
                </aside>
              </aside>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};

export default PriceList;
