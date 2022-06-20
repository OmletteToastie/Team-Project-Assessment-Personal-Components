<?php
define('BASEPATH', '/KV6002/Assessment/'); /**Sets the basename of the file. */
define('DATABASE', 'db/esports.db');
define ('DEVELOPMENT_MODE', true);
define ('SECRET_KEY', '3F53682FA68DFCE82CCCDBD5F28D8'); //Implements the Secret key used to sign JSON Web Tokens.

ini_set('display_errors', DEVELOPMENT_MODE);
ini_set('display_startup_errors', DEVELOPMENT_MODE);

//Connects the autoloader.
include 'config/autoloader.php';
spl_autoload_register("autoloader");

//Connects the errorhandler.
include 'config/errorhandler.php';
set_error_handler("errorHandler");

//Connects the error handlers for both JSON and HTML Web Formats, setting the primary exception handler to JSON.
include 'config/exceptionhandlerhtml.php';
include 'config/exceptionhandlerjson.php';
set_exception_handler("exceptionHandlerJSON");