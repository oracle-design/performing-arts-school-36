<?php 
	include "lib/mysql.php";
	include "php/indexupdata.php";
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

      <!-- slider block -->
      <div class="slider-wrapper theme-default">
        <div id="slider" class="nivoSlider">
          <!-- slider img place here -->
          <!--

          <% data.index.slider.each do |f| %>
            <img class="img-responsive" src="<%= f.img %>" alt="">
          <% end %>

          -->
			<?
        if($_GET['cate']=='')$_GET['cate'] = 1;
				$sql = "SELECT * FROM banner WHERE category = ".$_GET['cate']."  ORDER BY  id ASC ";
				$result = exe_sql(DATABASE, $sql);
				for($index=0;$index<count($result);$index++)
				{
			?>		
					<img class="img-responsive" src="./img/index_slider/<?echo $result[$index]['filename'];?>" alt="">
			<?}?>
        </div>
      </div>

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
        .td_s{
          width:50px;
        }
        .edit_input {
          display:inline;
          width:75%;
          margin-left:5px;
        }
        .edit_upload {
          display:inline;
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
			<?
        
				$sql = "SELECT * FROM banner WHERE category = ".$_GET['cate']." ORDER BY  id ASC ";
				$result = exe_sql(DATABASE, $sql);
				for($index=0;$index<count($result);$index++)
				{
			?>		
					<?if($_GET['cate']!=1){?><tr><td class="td_s">標題<?echo $index+1?></td><td> <div style="padding-left:5px;display:inline;"></div><input type="hidden" name="id<?echo $index;?>" value="<? echo $result[$index]['id'];?>"><input class="edit_input" type="text" name="title<?echo $index;?>" value="<? echo $result[$index]['title'];?>"></td></tr><?}?>
					<tr><td class="td_s">圖檔<?echo $index+1?></td><td> <input class="edit_upload" type="file" name="filename<?echo $index;?>"> <div style="padding-left:5px;display:inline;">(<? echo $result[$index]['filename'];?>)</div></td></tr>
			<?}?>
		<tr><td class="td_s"></td><td class="bottom">
		<center>
		<input class="edit_btn" type="submit" name="submit" value="送出">
		<input class="edit_btn" type="reset" value="重置"> 
    <span style="color:red;"><?echo $statusMsg;?></span>
		</center>
		</td></tr>
		</table>
     </form>
      </div>
    </div>
  </div><!-- e/o slider -->

  <!-- little banners -->
  <div class="index_banners">

  </div>


  <!-- footer -->


  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.0.min.js"><\/script>')</script>
  <script src="js/plugins.js" type="text/javascript"></script>
  <script src="js/application.js" type="text/javascript"></script>

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
