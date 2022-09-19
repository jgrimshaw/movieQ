
import React, { useState } from "react";


interface FormProps {
    handleSubmit: (values: any) => void
}

export default function Form(props: FormProps) {
    const [values, setValues] = useState({});

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
        // console.log(values)
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.handleSubmit(values);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Series</h2>
                <input
                    type='text'
                    name='serieTitle'
                    placeholder='Series Title'
                    onChange={onChange}
                />
                <input
                    type='text'
                    name='btnUrl'
                    placeholder='Enter external URL for the CTA button'
                    onChange={onChange}
                />
                <input
                    type='text'
                    name='btnText'
                    placeholder='Enter CTA button text'
                    onChange={onChange}
                />

                <h2>Videos</h2>
                <input
                    type='text'
                    name='videoTitle'
                    placeholder='Video Title'
                    onChange={onChange}
                />
                <input
                    type='text'
                    name='videoDescription'
                    placeholder='Enter Video Description'
                    onChange={onChange}
                />
                <input
                    type='text'
                    name='videoUrl'
                    placeholder='Video URL'
                    onChange={onChange}
                />

                <div>
                    <button>Set Time and Date</button>
                    <button>Save</button>
                </div>

            </form>


        </div>

        // render active series movie list
        // render all series
    )

}