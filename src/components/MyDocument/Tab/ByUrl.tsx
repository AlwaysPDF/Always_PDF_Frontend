import { VscLink } from "react-icons/vsc";
import { FaLink } from "react-icons/fa6";

const ByUrl = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="w-[80%] mb-10">
        <main className="dotDash w-full flex justify-center items-center">
          <aside className="w-[80%]">
            <div className="ant-upload-drag-icon w-full flex justify-center items-center mt-4">
              <div className="size-[48px] bg-[#F0F2F5] rounded-full flex justify-center items-center">
                <VscLink className="text-[#475367] text-2xl" />
              </div>
            </div>

            <div className="flex justify-between py-2 px-4 items-center w-full mt-6 border border-[#DEDEDE] rounded-lg">
              <FaLink className="text-[#151515] flex- text-2xl" />
              <input
                type="url"
                name=""
                id=""
                placeholder="https://docs.google.com/yourdocument"
                className="px-2 outline-none focus:outline-none flex-1"
              />
              <button
                className="bg-[#B5B5B5] px-2 py-1 rounded-lg text-[#FAFAFA]"
                disabled={true}
              >
                Get Document
              </button>
            </div>

            <p className="ant-upload-text font-Ubuntu text-offwhite pt-1 text-center mb-4">
              Supported links:{" "}
              <b className="font-Ubuntu text-[#BABABA]">Google docs</b>
            </p>
          </aside>
        </main>
      </div>
    </section>
  );
};

export default ByUrl;
