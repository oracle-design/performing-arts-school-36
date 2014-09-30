<?php
	include "system/lib/mysql.php";
	include "system/php/indexupdata.php";
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
  </head>
  <body class="opacity0">
      <!--[if lt IE 7]>
          <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
      <![endif]-->

  <!-- header -->
  <?php include "partials/_header.php" ?>


  <!-- index.html -->

  <!-- slider -->
  <div class="index_slider">
    <div class="container">

      <!-- 分隔墨線 -->
      <div class="banner-divider">
        <img src="/img/asset/banner-divider.png" alt="" class="img-responsive">
      </div>

      <?php include "partials/_index_slider.php" ?>

      <!-- 分隔墨線 -->
      <div class="banner-divider">
        <img src="/img/asset/banner-divider.png" alt="" class="img-responsive">
      </div>

    </div>
  </div><!-- e/o slider -->

  <!-- index main content => news and FB -->
  <div class="index_main">
    <div class="container">

      <!-- 最新消息 -->
      <div class="index_news">
        <a href="#" class="index_news-title trans-05s">最新消息</a>
        <div class="index_news-inner">

            <?
            $sql = "SELECT *,title.filename AS TTN FROM topic LEFT JOIN title
ON topic.id=title.topicId WHERE topic.category  = 10 ORDER BY topic.id ASC LIMIT 0,5";
            $result = exe_sql(DATABASE, $sql);
            for($index=0;$index<count($result);$index++)
            {
            ?>


          <!-- news unit -->

            <!--
              這邊要連結到正確的單則新聞頁面
            -->
            <a href="show/news.php" class="unit curl-top-right  trans-05s">

            <!-- left for feature pic -->
            <div class="left">
              <img class="img-responsive" src="system/img/<? echo $result[$index]['TTN'];?>" alt="">
            </div>

            <!-- right for detail info -->
            <div class="right">
              <div class="date">
                <span><? echo $result[$index]['post_time'];?></span>
              </div>
              <div class="title">
                <h3><? echo $result[$index]['title'];?></h3>
              </div>
              <div class="summary only-desktop-up">
                <p>
                <?echo html_entity_decode($result[$index]['text']);?>
                <?//echo $result[$index]['text'];?>
                </p>
              </div>
            </div>
            </a>
            <?}?>

        </div>
      </div><!-- e/o 最新消息 -->

      <!-- facebook -->
      <div class="index_facebook">
        <div class="index_main-inner">
          <iframe class="facebook_block" src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpas36&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=true&amp;show_border=false&amp;appId=266049590099572" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowTransparency="true"></iframe>
        </div>
      </div><!-- e/o facebook -->

    </div>
  </div>

  <!-- little banners -->
  <div class="index_banners">
    <div class="container">

      <!--

      <% data.index.banner.each do |f| %>
      <div class="index_banner-unit">
        <div class="index_banner-inner">
          <a href="<%= f.link %>">
            <img class="img-responsive" src="<%= f.img %>" alt="<%= f.title %>" title="<%= f.title %>">
          </a>
        </div>
      </div>
      <% end %>

       -->
      <?
      $sql = "SELECT * FROM banner WHERE category = 2 ORDER BY  id ASC ";
      $result = exe_sql(DATABASE, $sql);
      for($index=0;$index<count($result);$index++)
      {
      ?>
        <div class="index_banner-unit">
          <div class="index_banner-inner">

            <!--
              可能要確認一下這個 banner 的用途是不是要連結到別的頁面，是的話這邊應該要有個 link 欄位
            -->
            <a href="#">
              <img class="img-responsive" src="system/img/index_slider/<?echo $result[$index]['filename'];?>" alt="banner<?echo $index+1;?>" title="banner<?echo $index+1;?>">
            </a>

          </div>
        </div>
      <?}?>

    </div>
  </div>


  <!-- footer -->
  <?php include "partials/_footer.php" ?>


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
