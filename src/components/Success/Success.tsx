import Link from "next/link";

const Success = () => {
  return (
    <section className="flex justify-center items-center w-full h-screen bg-basicBlue">
      <div className="flex justify-center items-center flex-col w-[90%] h-[90%] bg-white rounded-2xl lsm:px-6 text-center">
        <div className="w-[30%]">
          <img
            src="/assets/success.svg"
            alt="Success Mark"
            className="w-full h-full mb-2"
          />
        </div>
        <h1 className="text-basicBlue text-2xl font-semibold">
          Successful!...
        </h1>
        <p className="mt-1 mb-6">Thank you for always believing us</p>
        <Link
          href="/dashboard/my-documents"
          className="text-[#EAF5FF] bg-basicBlue px-12 lsm:px-6 py-2 rounded-md"
        >
          Back to Dashboard
        </Link>{" "}
      </div>
    </section>
  );
};

export default Success;
