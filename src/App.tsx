import React, {FC, useMemo} from 'react';
import {OpenAIApi} from "openai";

const {Configuration, OpenAIApi} = require("openai");


function create_openai_client() {
    const configuration = new Configuration({
        apiKey: localStorage.getItem('openai_api_key'),
    });
    const openai = new OpenAIApi(configuration);
    return openai;
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

    const openai_client = useMemo(() => create_openai_client(), [api_key]);

    return (
        <div className="App">

        </div>
    );
}

export default App;
