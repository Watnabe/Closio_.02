<?php

class TemplatesController extends Controller{

    function create_deal(){
        $template = new Template();
        $result = $template->create_deal();

        Response($result);
    }
}
