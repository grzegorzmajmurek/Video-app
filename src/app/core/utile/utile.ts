import { VIDEO_WEBSITE } from '../model/movies.model';

const digitsOnly = (digits: string) => [...digits].every(c => '0123456789'.includes(c));

export const substringLink = (searchedText: string, link: string) => {
    const n = link.lastIndexOf(searchedText);
    return link.substring(n + searchedText.length);
};

export const extractType = (link: string): VIDEO_WEBSITE => {
    // https://stackoverflow.com/a/31617794
    if (link.match(/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/) || digitsOnly(link)) {
        return VIDEO_WEBSITE.VIMEO;
    }
    // https://stackoverflow.com/a/45426669
    if (link.match(/^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/) || !digitsOnly(link)) {
        return VIDEO_WEBSITE.YOUTUBE;
    }
};
