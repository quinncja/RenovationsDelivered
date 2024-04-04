import React, { useState } from "react";
import Userfront, { SignupForm, LoginForm} from "@userfront/toolkit/react";

Userfront.init("xbpwwqmn");

function Home(){
    const [formState, setForm] = useState(0)
    const forms = [
        {
            form: <SignupForm theme={{"colors":{"light":"#ffffff","dark":"#e9993e","accent":"#dd9d50","lightBackground":"#fdfdfd","darkBackground":"#2d2d2d"},"colorScheme":"dark","fontFamily":"Avenir, Helvetica, Arial, sans-serif","size":"default","extras":{"hideSecuredMessage":true}}} />,
            text: "Or, log in"
        },
        {
            form: <LoginForm theme={{"colors":{"light":"#ffffff","dark":"#e9993e","accent":"#dd9d50","lightBackground":"#fdfdfd","darkBackground":"#2d2d2d"},"colorScheme":"dark","fontFamily":"Avenir, Helvetica, Arial, sans-serif","size":"default","extras":{"hideSecuredMessage":true}}} />,
            text: "Or, sign up"
        }
    ]

    return(
        <div>
            {forms[formState].form}
            <button  onClick={() => setForm(formState === 0 ? 1 : 0)}> {forms[formState].text} </button>
        </div>
    
    )
}

export default Home;