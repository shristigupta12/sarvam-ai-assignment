// components/function-node-modal/function-node-modal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'; // Assuming Shadcn UI Dialog
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ApiCallFormDialog } from './pre-defined-function-form';
import CustomFunctionDialog from './custom-function-form';

interface FunctionNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFunction: (functionName: string) => void;
}

const FunctionNodeModal: React.FC<FunctionNodeModalProps> = ({ isOpen, onClose, onSelectFunction }) => {
  const [selectedOption, setSelectedOption] = useState<'predefined' | 'custom'>('predefined');
  const [predefinedFunction, setPredefinedFunction] = useState<string>('fetch_user_details');
  
  const [showPredefinedForm, setShowPredefinedForm] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState<'fetchUserDetails' | 'getOtp' | null>(null);

  const handleAddFunction = () => {
    if (selectedOption === 'predefined') {
      if (predefinedFunction === 'fetch_user_details') {
        setCurrentUseCase('fetchUserDetails');
      } else if (predefinedFunction === 'send_otp') {
        setCurrentUseCase('getOtp');
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Function</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col ">
            <RadioGroup value={selectedOption} onValueChange={(value: 'predefined' | 'custom') => setSelectedOption(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="predefined" id="predefined" />
                <Label htmlFor="predefined">Predefined Functions</Label>
              </div>
              <div className="ml-6 grid gap-2">
                {/* Predefined function options */}
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="fetch_user_details"
                    value="fetch_user_details"
                    checked={selectedOption === 'predefined' && predefinedFunction === 'fetch_user_details'}
                    onChange={() => { setSelectedOption('predefined'); setPredefinedFunction('fetch_user_details'); }}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor="fetch_user_details"
                    className="flex cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Fetch User Details
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="send_otp"
                    value="send_otp"
                    checked={selectedOption === 'predefined' && predefinedFunction === 'send_otp'}
                    onChange={() => { setSelectedOption('predefined'); setPredefinedFunction('send_otp'); }}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor="send_otp"
                    className="flex cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Send OTP
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom Function</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleAddFunction}>Add</Button>
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