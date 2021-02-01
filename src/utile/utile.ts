import {Movie, SORT, VIDEO_WEBSITE} from '@model/movies.model';

export interface IdAndWebsiteType {
  idVideo: string;
  videoWebsite: VIDEO_WEBSITE;
}

const digitsOnly = (digits: string) => [...digits].every(c => '0123456789'.includes(c));

const substringLink = (searchedText: string, link: string) => {
  const n = link.lastIndexOf(searchedText);
  return link.substring(n + searchedText.length);
};
const extractType = (link: string): VIDEO_WEBSITE => {
  let videoWebsite: VIDEO_WEBSITE;
  if (link.includes('youtube.com/') || link.includes('youtu.be/') || (!digitsOnly(link) && !link.includes('.com/'))) {
    videoWebsite = VIDEO_WEBSITE.YOUTUBE;
  }
  if (link.includes('vimeo.com/') || (digitsOnly(link) && !link.includes('.com/'))) {
    videoWebsite = VIDEO_WEBSITE.VIMEO;
  }
  return videoWebsite;
};

const extractId = (link: string): string => {
  if (link.includes('https://') || link.includes('.com/')) {
    const url = new URL(link);
    if (link.includes('youtube.com/')) {
      return url.searchParams.get('v');
    }
    if (link.includes('youtu.be/')) {
      return substringLink('youtu.be/', link);
    }
    if (link.includes('vimeo.com/')) {
      return substringLink('vimeo.com/', link);
    }
  }
  return link;
};

export const extractIdAndWebsiteType = (link: string): IdAndWebsiteType => {
  return {
    idVideo: extractId(link),
    videoWebsite: extractType(link)
  };
};

export const compare = (a: Movie, b: Movie, type: SORT): number => {
  const dateA = new Date(a.publishedAt);
  const dateB = new Date(b.publishedAt);
  let comparison = 0;
  if (type === SORT.ASC) {
    comparison = dateA < dateB ? 1 : -1;
  } else {
    comparison = dateA > dateB ? 1 : -1;
  }
  return comparison;
};
