<?php 
	//include "lib/mysql.php";
	//include "php/indexupdata.php";
	
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- Use title if it's in the page YAML frontmatter -->
    <title>表演 36 房後台</title>
    <meta name="description" content="「表演36房」，將優人神鼓原創的表演藝術技巧傳授給山下社區居民，並協同中華民國自主學習促進會及文山區各社區組織的資源，期望打造一個專業表演人才培訓學苑，實現從社區出發，建立國際舞台交流平台的目標。">
    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link href="css/application.css" rel="stylesheet" type="text/css" />
    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="jquery.cleditor.css" />
  </head>
  <body>
      <!--[if lt IE 7]>
          <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
      <![endif]-->

  <!-- header -->
  

  <!-- index.html -->

  <!-- slider -->
  <div class="index_slider">
    <div class="container">

      <?php //include "partials/_index_slider.php" ?>

    </div>
  </div><!-- e/o slider -->

  <!-- index main content => news and FB -->
  <div class="index_slider">
    <div class="container">
      <div class="slider-wrapper theme-default">
      <style>
        td {
          padding:3px;
        }
        .edit_input {
          width:95%;
          margin-left:5px;
        }
        .bottom {
          height:80px;
        }
        .edit_btn {
          width:20%;
          margin:15px;
        }
      </style>
	  <form method="post" action="" enctype="multipart/form-data" > 
		<table style="width:80%; margin:0 auto;" >
			<?/*
				$sql = "SELECT * FROM banner WHERE category = 1 ORDER BY  id ASC ";
				$result = exe_sql(DATABASE, $sql);
				for($index=0;$index<count($result);$index++)
				{
			?>		
					<tr><td>
          <input type="hidden" name="id<?echo $index;?>" value="<? echo $result[$index]['id'];?>">
          <input class="edit_input" type="text" name="title<?echo $index;?>" value="<? echo $result[$index]['title'];?>"></td></tr>
					<tr><td><input class="edit_input" type="file" name="filename<?echo $index;?>"></td></tr>
			<?}*/?>
		</table>
     
      </div>
    </div>
  </div><!-- e/o slider -->

  <!-- little banners -->
  <div class="about_content">
    <div class="container">

      <div class="about_content_wrapper">

        <div class="content_title" style="padding:8px;">
          <h3>
          <input type="text" style="font-size:30px;" name="content" value="<?echo $_POST['content'];?>" placeholder="Content Title">
          <select>
          <option>Big</option>
          <option>Mediem</option>
          <option>Small</option>
          </select>
          </h3>
          <h2><input type="text" style="font-size:20px;" placeholder="Subtitle"></h2>
        </div>
        <div class="content" style="padding:8px;width:100%;height:auto;">
          <div style="float:left;width:25%;margin:10px;">
            <img src="#" style="width:300px;height:300px;">
            <Br>
            <Br>
            <input type="file">
          </div>
          <div style="float:left;width:70%;height:600px;margin:10px;">
            <textarea id="input" name="inputx" style="height:500px;height:600px;"><?echo $_POST['inputx'];?></textarea>
            <!--input type="button" value="新增段落" style="margin:7px 0;width:100%;"><br-->
            <input type="submit" style="margin:3px 0;width:70px;">
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>

  </form>
  <!-- footer -->


  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  
  <script src="js/plugins.js" type="text/javascript"></script>
  
  <script type="text/javascript" src="jquery.cleditor.js"></script>
  <script src="js/application.js" type="text/javascript"></script>
  <script type="text/javascript">
      $(document).ready(function () { $("#input").cleditor(); });
  </script>
  <!-- Google Analystic -->
  <script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X','auto');ga('send','pageview');
  </script>


  </body>
</html>
