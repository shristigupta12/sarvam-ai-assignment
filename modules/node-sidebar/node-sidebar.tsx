import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { SidebarComponent } from "./components/sidebar-component";
import { SidebarComponentData } from "./constants/main";
import { PanelRight } from "lucide-react";
import { useSidebar } from "../providers/sidebar-provider";

const NodeSidebar: React.FC = () => {

  const {isOpen, setIsOpen} = useSidebar();
  
  return (
    <motion.aside 
      className="border-r border-neutral-300 bg-white h-full overflow-y-auto flex flex-col gap-4 pt-4"
      initial={{ opacity: 0, x: -300 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        width: isOpen ? "14vw" : "4vw"
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={`flex gap-2 justify-between items-center px-5 `}>
        {isOpen && <h1 className=" font-semibold text-xl text-primary-300">sarvam</h1>}
        <PanelRight className="size-[15px] text-neutral-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && (
      <div className="flex flex-col px-4 ">
        <div className="text-md font-semibold text-neutral-700">Add New Node</div>
        <p className="text-xs text-neutral-400 ">  Click or drag </p>
      </div>
      )}

      <Separator />

      <div className={`flex flex-col gap-2 w-full text-neutral-800 ${isOpen ? "px-4 items-start" : "px-2 items-center  "}`}>
        {SidebarComponentData.map((item) => (
          <SidebarComponent key={item.nodeType} {...item} />
        ))}
      </div>

      

    </motion.aside>
  );
};

export default NodeSidebar;


