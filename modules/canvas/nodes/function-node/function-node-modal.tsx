// components/function-node-modal/function-node-modal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ApiCallFormDialog } from "./pre-defined-function-form";
import CustomFunctionDialog from "./custom-function-form";
import { UserSearch, MessageCircleMore } from "lucide-react";

interface FunctionNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFunction: (functionName: string) => void;
}

const FunctionNodeModal: React.FC<FunctionNodeModalProps> = ({
  isOpen,
  onClose,
  onSelectFunction,
}) => {
  const [selectedOption, setSelectedOption] = useState<"predefined" | "custom">(
    "predefined"
  );
  const [predefinedFunction, setPredefinedFunction] =
    useState<string>("fetch_user_details");

  const [showPredefinedForm, setShowPredefinedForm] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState<
    "fetchUserDetails" | "getOtp" | null
  >(null);

  const handleAddFunction = () => {
    if (selectedOption === "predefined") {
      if (predefinedFunction === "fetch_user_details") {
        setCurrentUseCase("fetchUserDetails");
      } else if (predefinedFunction === "send_otp") {
        setCurrentUseCase("getOtp");
      }
      setShowPredefinedForm(true);
    } else {
      setShowCustomForm(true);
    }
  };

  const handlePredefinedFormClose = () => {
    setShowPredefinedForm(false);
    setCurrentUseCase(null);
  };

  const handlePredefinedFormSave = (functionName: string) => {
    onSelectFunction(functionName);
    setShowPredefinedForm(false);
    onClose();
  };

  const handleCustomFormSave = (functionName: string) => {
    onSelectFunction(functionName);
    setShowCustomForm(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[50vw] w-fit flex flex-col gap-6 min-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Function</DialogTitle>
          </DialogHeader>
            <RadioGroup
              value={selectedOption}
              onValueChange={(value: "predefined" | "custom") =>
                setSelectedOption(value)
              }
              className="flex flex-col gap-6"
            >
              <div className="flex items-start gap-4 justify-between">
                <div className="flex items-center gap-3 ">
                  <RadioGroupItem 
                    value="predefined" 
                    id="predefined" 
                    className="hover:cursor-pointer data-[state=checked]:border-primary-300 data-[state=checked]:text-primary-300 [&[data-state=checked]>span>svg]:fill-primary-300" 
                    />
                    <Label htmlFor="predefined" className="text-md text-neutral-600" >Predefined Functions</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem 
                    value="custom" 
                    id="custom" 
                    className="hover:cursor-pointer data-[state=checked]:border-primary-300 data-[state=checked]:text-primary-300 [&[data-state=checked]>span>svg]:fill-primary-300"  
                    />
                  <Label htmlFor="custom" className="text-md text-neutral-600">Custom Function</Label>
                </div>
              </div>
              {selectedOption === "predefined" && (
                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-col border rounded-md">
                    <input
                      type="radio"
                      id="fetch_user_details"
                      value="fetch_user_details"
                      checked={
                        selectedOption === "predefined" &&
                        predefinedFunction === "fetch_user_details"
                      }
                      onChange={() => {
                        setSelectedOption("predefined");
                        setPredefinedFunction("fetch_user_details");
                      }}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="fetch_user_details"
                      className={`flex cursor-pointer items-center rounded-md bg-popover p-4 hover:bg-neutral-50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${predefinedFunction==="fetch_user_details" ? "text-neutral-800 bg-neutral-100" : "text-neutral-600 bg-none" } font-semibold text-md`}
                    >
                      <UserSearch className="w-4 h-4 mr-1" /> Fetch User Details
                    </Label>
                  </div>
                  <div className="flex items-center border rounded-md">
                    <input
                      type="radio"
                      id="send_otp"
                      value="send_otp"
                      checked={
                        selectedOption === "predefined" &&
                        predefinedFunction === "send_otp"
                      }
                      onChange={() => {
                        setSelectedOption("predefined");
                        setPredefinedFunction("send_otp");
                      }}
                      className="peer hidden"
                    />
                    <Label
                      htmlFor="send_otp"
                      className={`flex cursor-pointer items-center rounded-md bg-popover p-4 hover:bg-neutral-50 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-full font-semibold text-md ${predefinedFunction==="send_otp" ? "text-neutral-800 bg-neutral-100" : "text-neutral-600 bg-none" }`}
                    >
                      <MessageCircleMore className="w-4 h-4 mr-1" /> Send OTP
                    </Label>
                  </div>
                </div>
                )}
            </RadioGroup>
          <DialogFooter className="flex justify-between w-full items-center ">
            <Button
              variant="outline"
              onClick={onClose}
              className="hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddFunction}
              className="bg-primary-300 hover:bg-primary-300 hover:cursor-pointer"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Predefined Function Form Dialog */}
      <ApiCallFormDialog
        open={showPredefinedForm}
        onClose={handlePredefinedFormClose}
        useCase={currentUseCase}
        onSave={handlePredefinedFormSave}
      />

      {/* Custom Function Form Dialog */}
      <CustomFunctionDialog
        open={showCustomForm}
        onOpenChange={setShowCustomForm}
        onSave={handleCustomFormSave}
      />
    </>
  );
};

export default FunctionNodeModal;
