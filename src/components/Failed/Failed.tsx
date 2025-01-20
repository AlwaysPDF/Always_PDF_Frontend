import Link from "next/link";

const Failed = () => {
  return (
    <section className="flex justify-center items-center w-full h-screen bg-errorRed">
      <div className="flex justify-center items-center flex-col w-[90%] h-[90%] bg-white rounded-2xl lsm:px-6 text-center">
        <div className="w-[30%]">
          <img
            src="/assets/failed.svg"
            alt="Failed Mark"
            className="w-full h-full mb-2"
          />
        </div>
        <h1 className="text-errorRed text-2xl font-semibold">Failed!...</h1>
        <p className="mt-1 mb-6">
          Something went wrong.... Please kindly try again
        </p>
        <Link
          href="/"
          className="text-[#EAF5FF] bg-errorRed px-12 lsm:px-6 py-2 rounded-md"
        >
          Back to Homepage
        </Link>{" "}
      </div>
    </section>
  );
};

export default Failed;
