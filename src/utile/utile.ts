export const extractIdFromString = (link: string): string => {
    const digits_only = string => [...string].every(c => '0123456789'.includes(c));
    const substringLink = (searchedText) => {
        const n = link.lastIndexOf(searchedText);
        return link.substring(n + searchedText.length);
    };
    const url = new URL(link);

    if (link.includes('https://') || link.includes('.com/')) {
        if (link.includes('youtube.com/')) {
            return url.searchParams.get('v');
        }
        if (link.includes('youtu.be/')) {
            return substringLink('youtu.be/');
        }
        if (link.includes('vimeo.com/')) {
            return substringLink('vimeo.com/');
        }

    } else {
        if (digits_only(link)) {
            return link;
        } else {
            return link;
        }
    }

};
