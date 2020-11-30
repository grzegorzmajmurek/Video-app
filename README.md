# VIDEO-APP

### Celem zadania było zbudowanie aplikacji do odtwarzania i przechowywania filmów z Youtube i Vimeo

## Instalacja

* `npm install` - zainstalowanie paczek zdefiniowanych w pliku package.json
* `npm run start` - uruchomienie aplikacji angularowej na porcie `4200`

## Użyte frameworki i bibioteki

* Angular 11.0.1            https://angular.io/
* Angular Material 11.0.1   https://material.angular.io/

## Użyte zewnętrzne API
* Youtube API               https://developers.google.com/youtube/v3
* Vimeo API                 https://developer.vimeo.com/

## Użycie

Aplikacja poprawnie wyświetla się na desktopie.
Aplikacja poprawnie wyświetla się na wszystkich popularnych przeglądarkach.

## Secret Key

Uzupełnij `Secret Key` odpowiednio do Youtube/Vimeo
```
export const environment = {
  key: {
    youtube: `${YOUTUBE_SECRET_KEY}`,
    vimeo: `${YOUTUBE_SECRET_KEY}`
  }
};
```
## HINT
 
Jeżeli pojawi się bład w trakcie odtwarzania filmu związany :
[Strict Content Security Policy] (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
Należy wyłączyć AdBlock
