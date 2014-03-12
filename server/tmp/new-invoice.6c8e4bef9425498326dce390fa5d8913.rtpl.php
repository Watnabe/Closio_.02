<?php if(!class_exists('raintpl')){exit;}?><?php $tpl = new RainTPL;$tpl_dir_temp = self::$tpl_dir;$tpl->assign( $this->var );$tpl->draw( dirname("header") . ( substr("header",-1,1) != "/" ? "/" : "" ) . basename("header") );?>

    <?php echo get_config('company.name'); ?> has sent you an proposal for
    <?php echo get_config('currency_symbol'); ?><?php echo $total;?>

    <br>
    <br>


    Please <a style="color:#4e79c6;" href=<?php echo get_config('base_url'); ?>>log in</a> to view the details of this proposal or send
    <?php echo get_config('company.name'); ?> your payment.

    <br><br>
    You can also copy and paste this link into your web browser:
    <?php echo get_config('base_url'); ?>


<?php $tpl = new RainTPL;$tpl_dir_temp = self::$tpl_dir;$tpl->assign( $this->var );$tpl->draw( dirname("footer") . ( substr("footer",-1,1) != "/" ? "/" : "" ) . basename("footer") );?>