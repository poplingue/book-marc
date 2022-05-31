import {ChangeEvent, FormEvent, useContext, useState} from "react";
import infoService from "../services/Info";
import {Store} from "../context/store";
import {Button, Input, Grid, GridItem} from '@chakra-ui/react'

interface FormElements extends HTMLFormControlsCollection {
    url: HTMLInputElement
}

interface UrlFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function Form() {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const {dispatch} = useContext(Store);

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {currentTarget: form} = event
        setUrl(form.value)
    };

    const handleSubmit = async (event: FormEvent<UrlFormElement>) => {
        event.preventDefault();

        setLoading(true)

        infoService.getInfo(url).then((bookMarc) => {

            dispatch({type: 'ADD', payload: bookMarc})
            setUrl('')

        }).catch((err) => {
            console.error('==== ERR ==== ', err.message);
        }).finally(() => {
            setLoading(false)
        })
    }

    return <form onSubmit={handleSubmit} className='App-Form'>
        <Grid gap={6} p={6}>
            <GridItem>
                <Input
                    value={url}
                    onChange={inputHandler}
                    placeholder='url'

                />
            </GridItem>
            <GridItem>
                <Button isLoading={loading} size='md' colorScheme='teal' type='submit'>Add Bookmark</Button>
            </GridItem>
        </Grid>
    </form>
}
