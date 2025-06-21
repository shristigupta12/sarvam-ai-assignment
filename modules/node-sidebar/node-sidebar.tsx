import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { SidebarComponent } from "./components/sidebar-component";
import { SidebarComponentData } from "./constants/main";
import { PanelRight } from "lucide-react";
import { useSidebar } from "../providers/sidebar-provider";
import { DragPreview } from "./components/drag-preview";

const NodeSidebar: React.FC = () => {

  const {isOpen, setIsOpen} = useSidebar();
  
  return (
    <>
      <DragPreview />
      <motion.aside 
        className="border-r border-neutral-300 bg-white h-full overflow-hidden flex flex-col gap-4 pt-4 relative z-10 md:relative md:z-auto"
        initial={{ opacity: 0, x: -300 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          width: isOpen ? "200px" : "64px"
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={`flex gap-2 justify-between items-center pr-6 pl-4 `}>
            {isOpen && (
          <AnimatePresence>
              <motion.h1
                key="sidebar-title"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="font-semibold text-lg text-primary-300 truncate"
              >
                FlowBuilder
              </motion.h1>
          </AnimatePresence>
            )}
          <PanelRight 
            className="size-[15px] text-neutral-600 cursor-pointer flex-shrink-0" 
            onClick={() => setIsOpen(!isOpen)} 
          />
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="add-new-node-section"
              className="flex flex-col px-3 sm:px-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-sm sm:text-md font-semibold text-neutral-700">Add New Node</div>
              <p className="text-xs text-neutral-400">Click or drag</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Separator />

        <div className={`flex flex-col gap-2 w-full text-neutral-800 overflow-y-auto flex-1 ${
          isOpen ? "px-3 sm:px-4 items-start" : "px-2 items-center"
        }`}>
          {SidebarComponentData.map((item) => (
            <SidebarComponent key={item.nodeType} {...item} />
          ))}
        </div>
      </motion.aside>
    </>
  );
};

export default NodeSidebar;


