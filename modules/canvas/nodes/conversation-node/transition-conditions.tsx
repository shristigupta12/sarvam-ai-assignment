import { ConversationNodeData } from "@/modules/types/flow"
import { AddTransitionsDropdown } from "./add-transitions-dropdown"
import { EquationTransition } from "./equation-transition"
import { PromptTransition } from "./prompt-transition"

export const TransitionConditions = ({id, data}:{id:string, data:ConversationNodeData}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-neutral-400">
                <p className="text-sm ">Transitions</p>
                <AddTransitionsDropdown id={id} data={data} />
            </div>
            <div>
            {data.transitions.map((transition, index) => (
                transition.type === 'EQUATION' ? <EquationTransition id={id} data={data} index={index} transition={transition} key={index} /> : <PromptTransition id={id} data={data} index={index} transition={transition} key={index  } />
            ))}
            </div>
        </div>
    )
}