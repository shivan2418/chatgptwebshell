import React, {FC, useMemo} from 'react';
import {Configuration, OpenAIApi} from "openai";
import {Dashboard} from "./Components/Dashboard";

function create_openai_client() {
    const configuration = new Configuration({
        apiKey: localStorage.getItem('openai_api_key') as string,
    });
    return new OpenAIApi(configuration);
}


async function call_api(client:OpenAIApi) {

    const response = await client.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        temperature: 0,
        max_tokens: 7,
    });

    return response

}

const App:FC = () => {

    const api_key = localStorage.getItem('openai_api_key');

    const [messages, setMessages] = React.useState<string[]>([])

    const openai_client = useMemo(() => create_openai_client(), [localStorage]);

    return (


        <Dashboard>



        </Dashboard>

    );
}

export default App;
