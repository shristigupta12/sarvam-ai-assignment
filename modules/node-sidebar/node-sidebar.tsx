import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { SidebarComponent } from "./components/sidebar-component";
import { SidebarComponentData } from "./constants/main";
import { PanelRight } from "lucide-react";

const NodeSidebar: React.FC = () => {
  
  return (
    <motion.aside 
      className="border-r border-neutral-300 min-w-[14vw] bg-white h-full overflow-y-auto flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex gap-2 justify-between items-center p-5">
        <h1 className=" font-semibold text-xl text-primary-300">sarvam</h1>
        <PanelRight className="size-[18px] text-neutral-800 cursor-pointer" />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="text-lg font-semibold text-neutral-700">Add New Node</div>
        <p className="text-sm text-neutral-400 ">
          Click or drag
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 p-4 text-neutral-600">
        {SidebarComponentData.map((item) => (
          <SidebarComponent key={item.nodeType} {...item} />
        ))}
      </div>

      

    </motion.aside>
  );
};

export default NodeSidebar;


