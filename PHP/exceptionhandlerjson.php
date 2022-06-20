<?php

function exceptionHandlerJSON($e) {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $output['error'] = "Internal server error! (Status 500)";

    if (DEVELOPMENT_MODE) {
        $output['Message'] = $e->getMessage();
        $output['File'] = $e->getFile();
        $output['Line'] = $e->getLine();
    }

    echo json_encode($output);
}