import BookMarcCard from "./BookMarcCard";
import {useContext} from "react";
import {Store} from "../context/store";
import {Grid, GridItem} from '@chakra-ui/react'

export default function BookMarcList() {
    const {
        state: {bookMarcs}
    } = useContext(Store);

    if (!bookMarcs.length) {
        return <Grid p={6} color='gray.500'>No bookmarks</Grid>
    }

    return <Grid templateColumns='repeat(3, 1fr)' gap={6}>{bookMarcs.map((bookMarc) => {
        const {
            title, id, addedDate, html, height, width, author_name, upload_date, duration, url
        } = bookMarc;

        return <GridItem key={id}>
            <BookMarcCard
                duration={duration}
                upload_date={upload_date}
                author_name={author_name}
                key={id}
                title={title}
                html={html}
                url={url}
                id={id}
                addedDate={addedDate}
                height={height}
                width={width}
            />
        </GridItem>
    })}</Grid>

}
