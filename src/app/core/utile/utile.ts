import { VIDEO_WEBSITE, Movie } from '@model/movies.model';
import { SORT } from '@model/movies.model';
import { PageEvent } from '@angular/material/paginator';

const digitsOnly = (digits: string) => [...digits].every(c => '0123456789'.includes(c));

export const substringLink = (searchedText: string, link: string) => {
  const lastIndex = link.lastIndexOf(searchedText);
  return link.substring(lastIndex + searchedText.length);
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

export const slicePage = (allMovies: Movie[], page: PageEvent): Movie[] => {
  return allMovies.slice((page.pageIndex * page.pageSize), (page.pageIndex * page.pageSize) + page.pageSize);
};

export const compareByDate = (a: Movie, b: Movie, type: SORT): number => {
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
