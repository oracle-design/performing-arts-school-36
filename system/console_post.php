<?php 
  session_start();
	include "lib/mysql.php";
	include "php/indexupdata.php";
	include "php/functions.php";
  if($_GET['part']!=''){$_SESSION['part'] = $_GET['part'];}else{$_GET['part'] = $_SESSION['part'];}
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
    <title>表演 36 房</title>
    <meta name="description" content="「表演36房」，將優人神鼓原創的表演藝術技巧傳授給山下社區居民，並協同中華民國自主學習促進會及文山區各社區組織的資源，期望打造一個專業表演人才培訓學苑，實現從社區出發，建立國際舞台交流平台的目標。">
    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link href="css/application.css" rel="stylesheet" type="text/css" />
    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js" type="text/javascript"></script>
    <script src="js/autoHeightIframe.js" type="text/javascript"></script>
  </head>
  <body>
      <!--[if lt IE 7]>
          <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
      <![endif]-->



  <!-- little banners -->
  <div class="index_banners">
    <div class="container">
    </div>
    
    <div class="index_slider">
    <div class="container">
      <div class="slider-wrapper theme-default">
      <style>
        td {
          padding:3px;
          border:#000000 1px dotted;
        }
        .edit_input {
          margin-left:5px;
        }
        .bottom {
          height:50px;
        }
        .edit_btn {
          width:20%;
          margin:15px;
        }
        iframe{
        width:100%;
        border:0;
      } 
      </style>
		<table style="width:80%; margin:30px auto;  ">
    <tr><td style="width:20%;"><b>時間</td><td style="width:60%;"><b>文章標題</td>
    <?if($_GET['part']=='course'){?><td style="width:10%;"><b>類別</td><?}?>
    <td style="width:10%;"><b>功能選項</td></tr>
		<?
      if($_GET['part']=='course'){$WHERE = " WHERE category = 5 OR category = 6 ORDER BY category ASC ";}
      if($_GET['part']=='zen'){$WHERE = " WHERE category = 8 ORDER BY id ASC ";}
      if($_GET['part']=='act'){$WHERE = " WHERE category = 9 ORDER BY id ASC ";}
			$sql = "SELECT * FROM topic ".$WHERE;
			$result = exe_sql(DATABASE, $sql);
			for($index=0;$index<count($result);$index++)
			{
		?>		
				<tr><td><? echo $result[$index]['post_time'];?></td><td><? echo $result[$index]['title'];?></td>
        
        <?if($_GET['part']=='course'){?><td><? if($result[$index]['category']==5)echo "活動"; else echo "課程";?></td><?}?>
        <td>
          <a href="editor_content.php?aid=<? echo $result[$index]['id'];?>" target="spage">編輯</a>
          <!--input type="button" value="編輯"-->
        </td></tr>
		<?}?>
    <tr><td colspan="4">
    <table style="width:100%;">
    <?if($_GET['part']=="course"){?>
      <td>
        <a href="editor_content.php?cate=5" target="spage"><input type="button" style="width:100%;height:55px;" value="新增活動"></a>
      </td>
      <td>
        <a href="editor_content.php?cate=6" target="spage"><input type="button" style="width:100%;height:55px;" value="新增課程"></a>
      </td>
      <?}elseif($_GET['part']=="zen"){?>
      <td>
        <a href="editor_content.php?cate=8" target="spage"><input type="button" style="width:100%;height:55px;" value="新增文章"></a>
      </td>
      <?}elseif($_GET['part']=="act"){?>
      <td>
        <a href="editor_content.php?cate=9" target="spage"><input type="button" style="width:100%;height:55px;" value="新增活動花絮"></a>
      </td>
      <?}?>
    </table>
    </td>
		</table>
   
    
      </div>
    </div>
  </div><!-- e/o slider -->
  </div>
  <iframe id="iframe_content" name="spage" src="" onLoad="SetCwinHeight(this);" ></iframe>
  </body>
</html>
