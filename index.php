<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">

    <!-- Use the .htaccess and remove these lines to avoid edge case issues.
 More info: h5bp.com/b/378 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Closio Sales CRM </title>
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Mobile viewport optimized: h5bp.com/viewport -->
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css" href="client/plugins/3rd-party/morris/morris.css">
    <link rel="stylesheet" type="text/css" href="client/plugins/3rd-party/fullcalendar-1.5.3/fullcalendar/fullcalendar.css">
    <link rel="stylesheet" type="text/css" href="client/plugins/3rd-party/select2-3.4.1/select2.css">
    <link rel="stylesheet" type="text/css" href="client/plugins/3rd-party/nano-scroller/nanoscroller.css">
    <link rel="stylesheet/less" type="text/css" href="client/css/style.less">
    <link rel="stylesheet/less" type="text/css" href="client/plugins/document-viewer/css/style.less">

     <script src="client/js/libs/less-1.3.0.min.js"></script> 
	<!-- <script src="client/js/libs/less-1.5.0.min.js"></script> -->

	<!-- bootstrap 3 stuff here -->
    <!-- Bootstrap core CSS 
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
-->
	<!-- Optional theme 
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap-theme.min.css">
-->


</head>

<body class="full">
<div id="hidden"></div>
<footer>
</footer>


<!-- JavaScript at the bottom for fast page loading -->

<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
<?php //TODO:Uncomment this - jquery cdn and stripe ?>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
<script>window.jQuery || document.write('<script src="client/js/libs/jquery.min.js"><\/script>')</script>


<script defer src="client/js/libs/jquery-ui-1.8.21.custom.min.js"></script>
<script defer type="text/javascript" src="https://js.stripe.com/v1/"></script>

<!-- scripts concatenated and minified via build script -->

<script defer src="client/plugins/3rd-party/select2-3.4.1/select2.min.js"></script>
<script defer src="client/plugins/document-viewer/libs/yepnope.1.5.3-min.js"></script>
<script defer src="client/plugins/document-viewer/src/plugins.js"></script>
<script defer src="client/plugins/document-viewer/src/ttw-document-viewer.js"></script>
<script defer src="client/plugins/fluid-list/fluid-list.js"></script>
<script defer src='client/plugins/3rd-party/fullcalendar-1.5.3/fullcalendar/fullcalendar.js'></script>
<?php //TOdo:hogan should be a library not a plugin ?>
<script defer src='client/plugins/3rd-party/twitter-hogan.js/web/builds/2.0.0/hogan-2.0.0.min.js'></script>
<script defer src='client/plugins/3rd-party/moment/moment.min.js'></script>
<script defer src='client/js/libs/jquery.tools.min.js'></script>


<!-- NVD3 Reporting -->
<script defer src="client/plugins/3rd-party/raphael/raphael-min.js"></script>
<script defer src="client/plugins/3rd-party/morris/morris.min.js"></script>


<!-- Blueimp Ajax Uploads -->
<script defer src="client/plugins/3rd-party/blueimp-jQuery-File-Upload/js/vendor/jquery.ui.widget.js"></script>
<script defer src="client/plugins/3rd-party/blueimp-jQuery-File-Upload/js/jquery.iframe-transport.js"></script>
<script defer src="client/plugins/3rd-party/blueimp-jQuery-File-Upload/js/jquery.fileupload.js"></script>


<script defer src="client/plugins/3rd-party/nano-scroller/ttw.jquery.nanoscroller.js"></script>
<script defer src="client/plugins/3rd-party/ckeditor/ckeditor.js"></script>

<script defer src="client/plugins/general-plugins.js"></script>

<script defer src="client/js/libs/underscore-min.js"></script> 
<script defer src="client/js/closio.utils.js"></script>
<script defer src="client/js/closio.misc.js"></script>
<script defer src="client/js/closio.options.js"></script>
<script defer src="client/js/closio.core.js"></script>
<script defer src="client/js/closio.main.js"></script>
<script defer src="client/js/closio.collections.js"></script>
<script defer src="client/js/closio.models.js"></script>
<script defer src="client/js/closio.routes.js"></script>
<script defer src="client/js/closio.views.js"></script>
<script defer src="client/js/closio.stripe.js"></script>



<script defer type="text/javascript">

</script>
<!-- end scripts -->
</body>
</html>

