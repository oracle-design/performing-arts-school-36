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
    <title>表演 36 房 || 關於 36 房</title>
    <meta name="description" content="「表演36房」，將優人神鼓原創的表演藝術技巧傳授給山下社區居民，並協同中華民國自主學習促進會及文山區各社區組織的資源，期望打造一個專業表演人才培訓學苑，實現從社區出發，建立國際舞台交流平台的目標。">
    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link href="css/application.css" rel="stylesheet" type="text/css" />
    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js" type="text/javascript"></script>
  </head>
  <body class="opacity0" onload="">
      <!--[if lt IE 7]>
          <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
      <![endif]-->

  <!-- header -->
  <?php include "partials/_header.php" ?>



  <!-- about.html -->

  <!-- page main title + background pic -->

  <!--
    這邊不是 slider，是單張底圖
  -->
  <div class="page_title">
    <div class="container">

      <!-- 分隔墨線 -->
      <div class="banner-divider">
        <img src="/img/asset/banner-divider.png" alt="" class="img-responsive">
      </div>

      <div class="page_title-inner">
        <div class="page_title-content">

          <!--
            下面這張圖可能需要讓客戶自己更換
          -->

          <!-- background pic -->
          <img class="img-responsive" src="./img/index_slider/02.jpg" alt="">
        </div>
      </div>

      <!-- 分隔墨線 -->
      <div class="banner-divider">
        <img src="/img/asset/banner-divider.png" alt="" class="img-responsive">
      </div>
    </div>
  </div>


  <!-- content title tabs -->
  <div class="about_tabs">
    <div class="container">

      <div class="about_tabs-wrapper">
        <div class="about_tabs-unit">
          <ul>
            <!--

            <% data.about.tabs.each do |f| %>
            <li><a href="<%= f.anchor %>"><%= f.title %></a></li>
            <% end %>

            -->
            <li><a href="?aid=1">表演36房緣起</a></li>
            <li><a href="?aid=2">使命與目標</a></li>
            <li><a href="?aid=3">財團法人優人文化藝術基金會</a></li>
            <li><a href="?aid=4">志工招募</a></li>
            <li><a href="?aid=5">社區專案</a></li>
            <li><a href="?aid=6">參觀導覽</a></li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  <div class="about_content" name="content">
    <div class="container">
      <div class="about_content_wrapper">

        <!--
          這邊可以用 loop 讓六個一次出現嗎？上面 link 連到 anchor，這樣 navi menu 才能運作
          不然就是 navi menu 的 link 要對應到正確的 aid params
          麻煩你了 T-T
        -->

       <?
        if($_GET['aid']=='')$_GET['aid']=1;
        $sql = "SELECT * FROM title WHERE id = ".$_GET['aid'];
        $result = exe_sql(DATABASE, $sql);
        ?>

        <div class="unit">
          <div class="content_title">
            <!-- id 可以的話設個 anchor -->
            <h3 id="name"><?echo $result[0]['subtitle'];?></h3>
          </div>
          <div class="img">
            <img class="img-responsive" src="system/img/<?echo $result[0]['filename'];?>" alt="">
          </div>
          <div class="content">
            <p><?echo html_entity_decode($result[0]['text']);?></p>

            <!-- 新增回到頁首 link -->
            <div class="back2top"><a href="#top">▲回到頁首▲</a></div>
          </div>
        </div>



      <!--
        <% data.about.content.each do |f| %>

        <div class="unit">
          <div class="content_title">
            <h3 id="<%= f.anchor %>"><%= f.title %></h3>
          </div>
          <div class="img">
            <img class="img-responsive" src="<%= f.pic %>" alt="">
          </div>
          <div class="content">
            <% f.content.each do |c| %>
            <p><%= c %></p>
            <% end %>
          </div>
        </div>

        <% end %>
      -->

      </div>
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