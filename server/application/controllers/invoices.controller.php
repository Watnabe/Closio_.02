<?php

Class proposalsController extends Controller{
    function pdf(){

        $proposal = new proposal();

        $result = $proposal->pdf();

        Response($result);
        //we check access in the upload function

    }

    function download($name){
        $proposal = new proposal();

        $result = $proposal->download($name);
    }


    function force_delete(){
        if(!current_user()->is('admin'))
            Response()->not_authorized();

        $proposal = new proposal();
        $result = $proposal->force_delete(Request::param('proposal_number'));

        Response($result);
    }


}

 
