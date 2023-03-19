import React, {FC, useMemo} from 'react';
import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
import {Dashboard} from "./Components/Dashboard";
import {OverlayModal} from "./Components/OverlayModal";
import {InputBar} from "./Components/InputBar";

const App: FC = () => {

    const api_key = localStorage.getItem('api_key');

    const [messages, setMessages] = React.useState<string[]>([])

    const [open, setOpen] = React.useState<boolean>(api_key === undefined || api_key === null)

    const openai_client = useMemo(() => create_openai_client(), [localStorage]);

    function create_openai_client() {
        const configuration = new Configuration({
            apiKey: localStorage.getItem('openai_api_key') as string,
        });
        console.log(`Created client with api key ${localStorage.getItem('api_key')}`)
        return new OpenAIApi(configuration);
    }

    function handle_submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let prompt = e.currentTarget['chat'].value;
        e.currentTarget['chat'].value = '';
        console.log(prompt);
    }

    async function call_api(prompt: string) {

        if (!openai_client) {
            console.error("No client created");
            return;
        }

        const response = await openai_client.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 7,
        });

        return response

    }

    return (

        <>
            <Dashboard>

                <div>
                    {messages.map((message) => {
                        return <div>{message}</div>
                    })
                    }

                </div>
                <InputBar onSubmit={handle_submit}/>

            </Dashboard>
            <OverlayModal open={open} setOpen={setOpen}/>

        </>

    );
}

export default App;
