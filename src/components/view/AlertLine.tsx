import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";

const AlertLine = ({content, level = 0}:{content :string, level :number}) => {
    // level 0 = warning
    // level 1 = error

    return (
        <div className="w-full rounded-md bg-amber-200 text-amber-700 p-2 flex items-center gap-2">
            <ExclamationTriangleIcon width={18} height={18}/>
            <span className="whitespace-pre-wrap">{content}</span>
        </div>
    )
}

export default AlertLine;
