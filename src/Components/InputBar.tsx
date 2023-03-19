import React, {FC} from "react"


export const InputBar: FC<{ onSubmit: React.FormEventHandler }> = ({onSubmit}) => {

    return (
        <div>
            <div className="mt-2 w-1/2 mx-auto">
                <form onSubmit={onSubmit}>
                    <input
                        id="chat"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Ask the AI something..."
                    />
                </form>
            </div>
        </div>
    )
}
