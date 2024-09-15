import { EnterpriseTick, FreeTick, PremiumTick } from "@/utils/Icon";
import React from "react";

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
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center w-[80%] llg:w-[90%] lmd:w-[95%] bg-gradient-price py-14 rounded-lg">
        <main className="grid grid-cols-3 lmd:grid-cols-1 gap-0 border w-[90%] justify-center">
          {lists?.map((item, i) => (
            <div
              className={`flex justify-center items-center ${i === 1 ? "box-content py-14" : "box-border"} ${item?.name === "Premium Plan" && "text-white"} ${item?.className}`}
              key={i}
            >
              <aside className="w-[90%]">
                <div
                  className={`border-b py-2 ${item?.name !== "Premium Plan" ? "border-[#3EB489]" : "border-[#FFA90C]"}`}
                >
                  <h3 className="font-Ubuntu text-offblack font-medium mb-5">
                    {item?.name}{" "}
                    <small className="text-[14px] font-Ubuntu">
                      {item?.name === "Free Plan" ? "(Forever FREE)" : ""}
                    </small>
                  </h3>
                  <h4
                    className={`font-Ubuntu text-offblack text-xl font-medium ${item?.name !== "Enterprise Plan" ? "font-semibold" : "font-medium"}`}
                  >
                    {item?.name !== "Enterprise Plan" && "$"}
                    {item?.price}
                  </h4>
                </div>
                <div className="mt-4">
                  <h1>Features</h1>
                  <div>
                    {item?.features?.map((feats, i) => (
                      <div
                        key={i}
                        className="mb-4 flex justify-start items-center"
                      >
                        {item?.name === "Free Plan" ? (
                          <FreeTick />
                        ) : item?.name === "Premium Plan" ? (
                          <PremiumTick />
                        ) : (
                          <EnterpriseTick />
                        )}
                        <p className="ml-2">{feats}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    className={`w-full rounded-md py-2 ${item?.name === "Premium Plan" ? "bg-white text-basicBlue" : "bg-basicBlue text-white"}`}
                  >
                    {item?.name !== "Enterprise Plan"
                      ? "Get Started"
                      : "Contact Us"}
                  </button>
                </div>
              </aside>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};

export default PriceList;
