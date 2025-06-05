import { CustomNodeData, TransitionType } from "@/modules/types/flow"
import { AddTransitionsDropdown } from "./add-transitions-dropdown"
import { EquationTransition } from "./equation-transition"
import { PromptTransition } from "./prompt-transition"
import { Separator } from "@/components/ui/separator"
import { Share2 } from "lucide-react"

export const TransitionConditions = ({id, data}:{id:string, data:CustomNodeData}) => {
    return (
        <div className="flex flex-col gap-2">
            <Separator className="mt-3 sm:mt-5"/>
            <div className="flex items-center justify-between text-neutral-400">
                <div className="flex items-center gap-2">
                    <Share2 className="size-3 sm:size-4"/> 
                    <p className="text-xs sm:text-sm">Transitions</p>
                </div>
                <AddTransitionsDropdown id={id} data={data} />
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2">
                {('transitions' in data && Array.isArray(data.transitions)) && 
                    data.transitions.map((transition: TransitionType, index: number) => (
                        transition.type === 'EQUATION' ? 
                            <EquationTransition id={id} data={data} index={index} transition={transition} key={index} /> : 
                            <PromptTransition id={id} data={data} index={index} transition={transition} key={index} />
                ))}
            </div>
        </div>
    )
}