import { FiUpload } from "react-icons/fi";
import EmptyState from "../../../public/assets/EmptyState.png";
import Image from "next/image";
import { useAppContext } from "../ContextApi/ContextApi";

const NoDocument = () => {
  const { setIsModalOpen } = useAppContext();

  return (
    <section className="flex justify-center items-center w-full bg-white rounded-lg min-h-[70vh] mt-6">
      <div className="flex justify-center items-center flex-col py-16">
        <span className="w-[15%] flex justify-center items-center">
          <Image
            src={EmptyState}
            alt="Empty state image"
            layout="responsive"
            width={100}
            height={100}
            className="w-full h-full"
            priority
          />
        </span>
        <h1 className="font-bold font-Ubuntu text-basicBlue text-2xl mt-4 mb-2">
          {" "}
          Nothing here yet
        </h1>
        <p className="tetx-sm font-Ubuntu font-medium text-[#7A7A7A]">
          Click the <b className="text-basicBlue">upload</b> button to upload
          your first pdf
        </p>
        <button
          onClick={() => setIsModalOpen && setIsModalOpen(true)}
          className="bg-basicBlue text-[#FAFAFA] px-4 py-2 rounded-md flex justify-center items-center mt-4"
        >
          <FiUpload className="mr-2" /> Upload Your PDF
        </button>
      </div>
    </section>
  );
};

export default NoDocument;
