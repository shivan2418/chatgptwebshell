import React, {FC} from "react"


export const InputBar: FC<{ onSubmit: React.FormEventHandler }> = ({onSubmit}) => {

    return (
        <div>
            <div className="mt-2 w-1/2 mx-auto">
                <form className={'flex flex-row gap-x-2'} onSubmit={onSubmit}>
                    <input
                        id="chat"
                        name={'chat'}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Ask the AI something..."
                    />
                    <button className={'inline-block rounded bg-indigo-500 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'} type={'submit'}>Submit</button>
                </form>
            </div>
        </div>
    )
}
