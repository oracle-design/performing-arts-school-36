<?php session_start();
	include "lib/mysql.php";
	include "php/contentupdata.php";
  if($_GET['cate']!=''){$_SESSION['cate'] = $_GET['cate'];}else{$_GET['cate'] = $_SESSION['cate'];}
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
    <script type="text/javascript" src="src/js/jscal2.js"></script>
    <script type="text/javascript" src="src/js/lang/b5.js"></script>
    <link type="text/css" rel="stylesheet" href="src/css/jscal2.css" />
    <link type="text/css" rel="stylesheet" href="src/css/border-radius.css" />
    <link id="skin-gold" title="Gold" type="text/css" rel="stylesheet" href="src/css/gold/gold.css" />
  </head>
  <body>
      <!--[if lt IE 7]>
          <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
      <![endif]-->

  <!-- header -->
  

  <!-- index.html -->
  <?	
	if(!$_GET['aid']){
  ?>
		<!-- slider -->
		<div style="display:none" class="index_slider">
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
		
				<img class="img-responsive" src="http://placehold.it/1280x400" alt="">
			</div>
			</div>
		
		</div>
		</div><!-- e/o slider -->
	
	<!-- index main content => news and FB -->

		<form method="post" action="" enctype="multipart/form-data" >
		<div style="display:none" class="index_slider">
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
			
				<table style="width:80%; margin:0 auto;" >
					<tr><td>1<input class="edit_input" type="text" name="title0" ></td></tr>
					<tr><td><input class="edit_input" type="file" name="filename0"></td></tr>
					<tr><td>2<input class="edit_input" type="text" name="title1" ></td></tr>
					<tr><td><input class="edit_input" type="file" name="filename1"></td></tr>
					<tr><td>3<input class="edit_input" type="text" name="title2" ></td></tr>
					<tr><td><input class="edit_input" type="file" name="filename2"></td></tr>
					<tr><td>4<input class="edit_input" type="text" name="title3" ></td></tr>
					<tr><td><input class="edit_input" type="file" name="filename3"></td></tr>
				</table>
			
			</div>
			</div>
		</div><!-- e/o slider -->
		
		<!-- little banners -->
		<div class="about_content">
		
			<div class="container">
			<div class="about_content_wrapper">
				<div class="content_title" style="padding:8px;">
        <?
          if($_SESSION['cate'] == 5){
            echo "新增活動";
          }elseif($_SESSION['cate'] == 6){
            echo "新增課程";
          }elseif($_SESSION['cate'] == 8){
            echo "新增禪鼓文章";
          }elseif($_SESSION['cate'] == 9){
            echo "新增活動花絮";
          }elseif($_SESSION['cate'] == 10){
            echo "新增最新消息";
          }
        ?>
        <input type="hidden" name="category" value="<?echo $_SESSION['cate'];?>"></input>
				<h3>
				<input type="text" style="font-size:30px;" placeholder="Content Title" name="title">
				<select name="size">
					<option value="45">Big</option>
					<option value="35">Mediem</option>
					<option value="25">Small</option>
				</select>
				</h3>
        <div>
        請選擇日期
        <input type="text" id="date" name="date" readonly value="<?	date_default_timezone_set("Asia/Taipei");	echo date("Y-m-01 00:00",time());?>">
        <input type="button" value="..." id="BTN" name="BTN">
        <script type="text/javascript">
          new Calendar({
              inputField: "date",
              dateFormat: "%Y-%m-%d %H:%M",
              trigger: "BTN",
              bottomBar: true,
              weekNumbers: false,
              showTime: 24,
              onSelect: function() {this.hide();}
          });
        </script>
        <div>
				<h2><input type="text" style="font-size:20px;" placeholder="Subtitle" name="subtitle"></h2>
				</div>
				<div class="content" style="padding:8px;width:100%;height:auto;">
				<div style="float:left;width:25%;margin:10px;">
					<img src="#" style="width:300px;height:300px;">
					<Br>
					<Br>
					<input type="file" name="pic">
				</div>
				<div style="float:left;width:70%;margin:10px;">
					<textarea id="input" name="text" style="height:500px;height:600px;"></textarea>
					<input type="submit" name="submit" value="送出" style="margin:3px 0;width:70px;">
					<input type="reset" style="margin:3px 0;width:70px;">
				</div>
				
				
				<div style="clear:both"></div>
				</div>
		
			</div>
		
			</div>
			
		</div>
		</form>
	<?}else{  $_SESSION['topicid'] = $_GET['aid'];
	?>		
				<!-- slider -->
				<div style="display:none" class="index_slider">
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
							$sql = "SELECT * FROM banner WHERE topicid = ".$_GET['aid'];
							$result = exe_sql(DATABASE, $sql);
							for($index=0;$index<count($result);$index++)
							{
								if($result[$index]['filename'])
								{
						?>
									<img class="img-responsive" src="img/index_slider/<?echo $result[$index]['filename'];?>" alt="">
									
							<?}}?>
						
					</div>
					</div>
			
				</div>
				</div><!-- e/o slider -->
			
	<!-- index main content => news and FB -->

		<form method="post" action="" enctype="multipart/form-data" >
		<input type="hidden" name="category" value="<?echo $_GET['cate'];?>"></input>
		<div style="display:none" class="index_slider">
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
			
				<table style="width:80%; margin:0 auto;" >
				<?
					for($index=0;$index<count($result);$index++)
					{
				?>		
						<tr><td><input type="hidden" name="id<?echo $index;?>" value="<? echo $result[$index]['id'];?>"><input class="edit_input" type="text" name="title<?echo $index;?>" value="<? echo $result[$index]['title'];?>"></td></tr>
						<tr><td><input class="edit_input" type="file" name="filename<?echo $index;?>"></td></tr>
				<?}?>
				</table>
			</div>
			</div>
		</div><!-- e/o slider -->
		
		<!-- little banners -->
		<div class="about_content">
		
			<div class="container">
			<div class="about_content_wrapper">
				<?
					$sql1 = "SELECT * FROM topic WHERE id = ".$_GET['aid'];
					$result1 = exe_sql(DATABASE, $sql1);
				?>
				<div class="content_title" style="padding:8px;">
				<h3 style="display:inline;">
				<input type="hidden" name="topicid" value="<?echo $_GET['aid'];?>">
				<input type="text" style="font-size:<?echo $result1[0]['size'];?>px;" placeholder="Content Title" name="title" value="<?echo $result1[0]['title'];?>">
				<select name="size">
					<option value="45" <?if($result1[0]['size']==45){echo "selected";}?>>Big</option>
					<option value="35" <?if($result1[0]['size']==35){echo "selected";}?>>Mediem</option>
					<option value="25" <?if($result1[0]['size']==25){echo "selected";}?>>Small</option>
				</select>
				</h3>
        <a href="editor_content.php?del=<?echo $_GET['aid'];?>">刪除文章</a>
        <br>
        <div>
        <br>
          請選擇日期
          <input type="text" id="date" name="date" readonly value="<?if($result1[0]['post_time']!="0000-00-00 00:00:00"){echo $result1[0]['post_time'];}else{
          date_default_timezone_set("Asia/Taipei");	echo date("Y-m-01 00:00",time());}?>">
          <input type="button" value="..." id="BTN" name="BTN">
          <script type="text/javascript">
            new Calendar({
                inputField: "date",
                dateFormat: "%Y-%m-%d %H:%M",
                trigger: "BTN",
                bottomBar: true,
                weekNumbers: false,
                showTime: 24,
                onSelect: function() {this.hide();}
            });
          </script>
				</div>
				</div>
				<?
					if($_POST['submit']=="新增段落")
					{?>
						<div class="content_title" style="padding:8px; background-color:#eeeeee;">
						<input type="hidden" name="topicid" value="<?echo $_GET['aid'];?>">
						<h2><input type="text" style="font-size:20px;" placeholder="Subtitle" name="subtitle"></h2>
						</div>
						<div class="content" style="padding:8px;width:100%;height:auto;background-color:#eeeeee;">
						<div style="float:left;width:25%;margin:10px;">
							<img src="#" style="width:300px;height:300px;">
							<Br>
							<Br>
							<input type="file" name="pic">
						</div>
						<div style="float:left;width:70%;;margin:10px;">
							<textarea id="input" name="text" style="height:500px;"></textarea>
							<input type="submit" name="submit" value="確定新增" style="margin:3px 0;width:100px;">
							<input type="reset" style="margin:3px 0;width:70px;">
						</div>
						<div style="clear:both"></div>
						</div>
				<?}

					$sql2 = "SELECT * FROM title WHERE topicid = ".$_GET['aid'];
					$result2 = exe_sql(DATABASE, $sql2);
					for($index=0;$index<count($result2);$index++)
					{
				?>		<div class="content_title" style="padding:8px;">
						<input type="hidden" name="titleid<?echo $index;?>" value="<?echo $result2[$index]['id'];?>">
						<h2><input type="text" style="font-size:20px;" placeholder="Subtitle" name="subtitle<?echo $index;?>" value="<?echo $result2[$index]['subtitle'];?>"></h2>
						</div>
						<div class="content" style="padding:8px;width:100%;height:auto;">
						<div style="float:left;width:25%;margin:10px;">
							<img src="img/<?echo $result2[$index]['filename'];?>" style="width:300px;height:300px;">
							<Br>
							<Br>
							<input type="file" name="pic<?echo $index;?>">
						</div>
						<div style="float:left;width:70%;margin:10px;">
							<textarea id="input<?echo $index;?>" name="text<?echo $index;?>" style="height:500px;height:600px;"><?echo $result2[$index]['text'];?></textarea>
							<input type="submit" name="submit" value="修改" style="margin:3px 0;width:70px;">
							<input type="reset" style="margin:3px 0;width:70px;">
							
						</div>
				
						<div style="clear:both"></div>
						</div>
						
				<?
					}
					 
				?>
        <div>
        </div>
					<?if($_POST['submit']!="新增段落"){?><input type="submit" name="submit" value="新增段落" style="margin:7px 0;width:100%;"><br><?}?>
          <a href="test/index.php" target="ppage"><input type="button" style="margin:7px 0;width:100%;" value="新增活動照片"></a>
          <a href="editor_activities_pic.php" target="ppage"><input type="button" style="margin:7px 0;width:100%;" value="刪除活動花絮照片"></a>
			</div>
		
			</div>
			
		</div>
		</form>
	<?}?>
  
  <!-- footer -->
  <iframe src="" id="pic" name="ppage" width="100%" height="350px" frameborder="0" scrolling="no" ></iframe>
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script type="text/javascript">
	//文本工具列 抓ID新增
    $(document).ready(function () { $("#input").cleditor(); });
    $(document).ready(function () { $("#input0").cleditor(); });
	  $(document).ready(function () { $("#input1").cleditor(); });
	  $(document).ready(function () { $("#input2").cleditor(); });
	  $(document).ready(function () { $("#input3").cleditor(); });
	  $(document).ready(function () { $("#input4").cleditor(); });
	  $(document).ready(function () { $("#input5").cleditor(); });
	  $(document).ready(function () { $("#input6").cleditor(); });
	  <?if($_GET['del']!=""){?>$(document).ready(function () {alert('刪除成功'); var iframe = parent.parent.document.getElementById("console_post_iframe"); iframe.src = iframe.src; });<?}?>
	  <?if($_POST['submit']=="修改"){?>$(document).ready(function () {alert('修改成功'); var iframe = parent.parent.document.getElementById("console_post_iframe"); iframe.src = iframe.src; });<?}?>
	  <?if($_POST['submit']=="送出"){?>$(document).ready(function () {alert('新增成功'); var iframe = parent.parent.document.getElementById("console_post_iframe"); iframe.src = iframe.src; });<?}?>
	  <?if($_POST['submit']=="新增段落"){?>$(document).ready(function () {var iframe = parent.parent.document.getElementById("console_post_iframe"); parent.parent.SetCwinHeight(iframe);});<?}?>
    
    $(document).ready(function () {
      setTimeout(function(){
      var parent_content = window.parent;
      var parent_post = parent_content.parent;
      var console_post_iframe = parent_post.document.getElementById("console_post_iframe");
      parent_post.SetCwinHeight(console_post_iframe);
    }, 1000);
    });
  </script>
  <script src="js/plugins.js" type="text/javascript"></script>
  <script src="js/application.js" type="text/javascript"></script>
  <script type="text/javascript" src="jquery.cleditor.js"></script>
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
