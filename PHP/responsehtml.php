<?php

/**
 * This class contains the header code required to display webpages in a HTML format.
 * 
 * @author Ethan Borrill W18001798
 */
class ResponseHTML extends Response
{
    protected function headers() {
        header("Access-Control-Allow-Origin: *"); //This tells the browser that the content present on HTML pages is accessible to certain origins

        header("Content-Type: text/html; charset=UTF-8"); //Sets the content type of the webpage to be HTML.

    }
}