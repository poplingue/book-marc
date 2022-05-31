import {useContext, useEffect, useState} from "react";
import {BookMarc} from '../context/reducer'
import {Store} from "../context/store";
import parse from "html-react-parser";
import {Box, Button, Badge, Text} from '@chakra-ui/react'

export default function BookMarcCard({
                                         title,
                                         id,
                                         url,
                                         html,
                                         width,
                                         height,
                                         addedDate,
                                         upload_date,
                                         duration,
                                         author_name
                                     }: BookMarc) {
    const {
        dispatch
    } = useContext(Store);

    const [uploadDateFormatted, setUploadDateFormatted] = useState('')
    const [durationFormatted, setDurationFormatted] = useState('')

    const removeBookMarc = () => {
        dispatch({type: 'REMOVE', payload: {id}})
    }

    const renderAddedDate = () => {
        let r = `Added few seconds ago`;
        const date1 = new Date(addedDate);
        const nowDate = Date.now()

        const duration = nowDate.valueOf() - date1.valueOf();
        const minutes = Math.round((duration / 1000) / 60);

        if (minutes > 1) {
            r = `Added ${minutes} minutes ago`
        }

        return r
    }
    const formatSeconds = (seconds: number) => {
        const [hour, minute, second] = [seconds / 3600, (seconds / 60) % 60, seconds % 60, '']

        return ([hour, minute, second].map(v => `${Math.floor(v)}`.padStart(2, '0')).join(':'));
    };

    useEffect(() => {

        if (upload_date) {
            const date = new Date(upload_date)

            setUploadDateFormatted(new Intl.DateTimeFormat('en-EN', {dateStyle: 'full'}).format(date))
        }

        if (duration) {
            setDurationFormatted(formatSeconds(duration))
        }

    }, [duration, upload_date])


    return <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Box>
            {parse(html)}
        </Box>
        <Box p='4'>
            <Box display='flex' alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                    {renderAddedDate()}
                </Badge>
            </Box>
            <Box p='6'>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h3'
                >
                    <Text color='grey' as='span'>Title: </Text>
                    {title}
                </Box>
                <Box>
                    <Text color='grey' as='span'>Author: </Text>
                    {author_name}
                </Box>
                <Box>
                    <Text color='grey' as='span'>Url: </Text>
                    {url}
                </Box>
                {upload_date && <Box>
                    <Text color='grey' as='span'>Upload date: </Text>
                    {uploadDateFormatted}
                </Box>}
                {durationFormatted && <Box>
                    <Text color='grey' as='span'>Duration: </Text>
                    {durationFormatted}
                </Box>}
                {width && height && <Box>
                    <Text color='grey' as='span'>width x height: </Text>
                    {`${width} x ${height}`}
                </Box>}
            </Box>
            <Button onClick={removeBookMarc} size='sm' bg='tomato' color='white'>Remove</Button>
        </Box>
    </Box>
}
