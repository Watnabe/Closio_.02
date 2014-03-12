<?php

class PaypalController extends Controller{
    function get_button(){

        $proposal = new proposal($_POST['proposal_id']);

        $this->check_authorization($proposal);

        //todo:make sure user is owner of proposal;
        $paypal = new PaypalPayment();
        $paypal->amount = $_POST['amount'];
        $button = $paypal->generate_submission_button($proposal);

        Response($button);
    }

    function ipn_listener(){
        //todo:public
        $paypal = new PaypalPayment();
        $paypal->process_ipn();
    }
}