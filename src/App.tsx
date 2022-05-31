import Form from './components/Form'
import BookMarcList from "./components/BookMarcList";
import {Grid, GridItem, Text} from '@chakra-ui/react'

function App() {

    return (<Grid gap={6}>
        <GridItem w='100%' h='50' textAlign='center'>
            <Text fontSize='4xl'>Welcome to Book'Marcs</Text>
        </GridItem>
        <Form/>
        <BookMarcList/>
    </Grid>)
}

export default App
