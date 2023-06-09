import React, {FC, useEffect} from 'react';
import {Dashboard} from "./Components/Dashboard";
import {OverlayModal} from "./Components/OverlayModal";
import {InputBar} from "./Components/InputBar";
import {Configuration, OpenAIApi} from "openai";
import {ChatCompletionRequestMessage} from "openai/api";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
const showdown = require('showdown');
const converter = new showdown.Converter();

const App: FC = () => {

    const api_key = localStorage.getItem('api_key');

    const [messages, setMessages] = React.useState<ChatCompletionRequestMessage[]>([])

    const [open, setOpen] = React.useState<boolean>(api_key === undefined || api_key === null)

    useEffect(() => {
        hljs.highlightAll()
    },[messages])
    function handle_submit(e: React.FormEvent<HTMLFormElement>) {

        const configuration = new Configuration({
            apiKey: localStorage.getItem('api_key') as string,
        });
        console.log(`Created client with api key ${localStorage.getItem('api_key')}`)
        const openai_client = new OpenAIApi(configuration);

        e.preventDefault();

        let prompt = e.currentTarget['chat'].value;
        e.currentTarget['chat'].value = '';
        console.log(prompt);

        call_api(prompt,openai_client).then((response) => {
            if (!response) {
                return;
            }
            // add the latest message to the list of messages
            console.log(response.data.choices)

            setMessages([...messages, response.data.choices[0].message!])
        }
        ).catch(err=>console.error(err))
    }

    async function call_api(prompt: string,openai_client:OpenAIApi) {

        if (!openai_client) {
            console.error("No client created");
            return;
        }

        let msg:ChatCompletionRequestMessage = {"role":"user","content":prompt}

        const response = await openai_client.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [...messages,msg]
        });

        return response

    }

    let parsed_messages = messages.map((message,index) => {
        return <div className={'my-8'} key={index} dangerouslySetInnerHTML={{__html:converter.makeHtml(message.content)}}/>
    })

    return (

        <>
            <Dashboard>

                <div>
                    {parsed_messages.map((message,index) => message)}

                </div>
                <InputBar onSubmit={handle_submit}/>

            </Dashboard>
            <OverlayModal open={open} setOpen={setOpen}/>

        </>

    );
}

export default App;
