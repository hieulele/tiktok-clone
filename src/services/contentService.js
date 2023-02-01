import * as httpRequest from '~/utils/httpRequest';

export const getContent = async ( page, perPage) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page: 3,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
