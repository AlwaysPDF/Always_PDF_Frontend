import { useState } from "react";
import ByDragOrClick from "./ByDragOrClick";
import ByUrl from "./ByUrl";

const FullTab = () => {
  const [tabName, setTabName] = useState<string>("Upload Document");
  const tabs = ["Upload Document", "Upload from URL"];

  return (
    <section className="w-full">
      <div>
        <main className="flex justify-center items-center mt-4">
          {tabs?.map((tab, i) => (
            <div className=" first:border-r border-grey">
              <h1
                key={i}
                onClick={() => setTabName(tab)}
                className={`${tab === tabName ? "text-offblack border-b-2 border-offblack" : "text-grey"} font-Ubuntu font-medium cursor-pointer mx-10 px-4`}
              >
                {tab}
              </h1>
            </div>
          ))}
        </main>

        <main className="mt-12 w-full">
          {tabName === "Upload Document" ? <ByDragOrClick /> : <ByUrl />}
        </main>
      </div>
    </section>
  );
};

export default FullTab;
