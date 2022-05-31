import {BookMarc} from "../context/reducer";
import CustomError from "../utils/CustomError";
import {v4 as uuidv4} from 'uuid';

const infoService = {
    getInfo: async (url: string): Promise<BookMarc> => {
        let response = null;
        const noembedUrl = `http://noembed.com/embed?url=${url}`

        try {

            const infos = await fetch(noembedUrl);
            response = await infos.json();

            if (response.error) {
                return Promise.reject(new CustomError(response.error, {ok: false}));
            }


        } catch (error) {
            return Promise.reject(error);
        }

        const addedDate = Date.now();
        const id = uuidv4();

        const {
            html, url: responseUrl, title, author_name, upload_date = '', height = '', width = '', duration = ''
        }: BookMarc = response

        const bookMarc: BookMarc = {
            id, html, url: responseUrl, title, addedDate, author_name, upload_date, width, height, duration
        }

        return Promise.resolve(bookMarc);
    },
};

export default infoService;
