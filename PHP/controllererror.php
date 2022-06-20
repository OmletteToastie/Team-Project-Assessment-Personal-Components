<?php


/**
* ControllerError
* 
* This controller is used to display content on the error page of the PHP, primarily created to provide an error location for HTML content.
*
* @author Ethan Borrill W18001798
*/

class ControllerError extends Controller
{
    protected function processRequest() {
        $page = new ErrorPage("Page not found", "This page does not exist!");
        return $page->generateWebPage();
    }
}