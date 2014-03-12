<?php

Class ProposalsController extends Controller{
    function pdf(){

        $proposal = new Proposal();

        $result = $proposal->pdf();

        Response($result);
        //we check access in the upload function

    }

    function download($name){
        $proposal = new Proposal();

        $result = $proposal->download($name);
    }


    function force_delete(){
        if(!current_user()->is('admin'))
            Response()->not_authorized();

        $proposal = new Proposal();
        $result = $proposal->force_delete(Request::param('proposal_number'));

        Response($result);
    }


}

 
