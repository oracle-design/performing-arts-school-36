<?php include "lib/mysql.php" ;
      include "system/php/functions.php" ;
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
    <title>表演 36 房 || 禪鼓體驗</title>
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
  <?php include "partials/_header.php" ?>


  <!-- zen.html -->

  <!-- page main title + background pic -->
  <div class="activities_slider">
    <div class="container">
    <?php include "partials/_zen_slider.php" ?>

    </div>
  </div>


  <!-- content area -->
  <div class="zen_main_content">
    <div class="container">
      <?
        if(!$_GET['aid'])$_GET['aid'] = 0 ;
        $index = $_GET['aid'];
        $sql = "SELECT * FROM topic WHERE category  = 8 ORDER BY id ASC ";
        $result = exe_sql(DATABASE, $sql);
        $sql1 = "SELECT * FROM title WHERE topicid = ".$result[$index]['id']." ORDER BY id ASC ";
        $result1 = exe_sql(DATABASE, $sql1);
      ?>
      <div class="zen_main-wrapper">

            <!-- HERE -->
            <!-- HERE -->
            <!-- HERE -->
            <!-- HERE -->
            <!-- HERE -->
            <!-- HERE -->

        <!-- 改成下面這個樣式 -->

        <!--
        <h3><%= data.zen.title %></h3>

        <div class="show_image">
          <img class="img-responsive" src="<%= data.zen.img %>" alt="">
        </div>

        <div class="show_text">
          <% data.zen.content.each do |f| %>
          <p><%= f %></p>
          <% end %>
        </div>

        <div class="show_info">

        </div>
         -->



        <!-- title -->
        <h3>禪鼓體驗</h3>

        <!-- content -->
        <div class="show_image">
          <img class="img-responsive" src="/img/zen/detail-001.jpg" alt="">
        </div>

        <div class="show_text">
          <p>量身打造課程內容，提供最優質的體驗，適合公司、學校、機關團體規劃校外教學、教育訓練等活動設計</p>
          <p>運用優人神鼓二十多年藝術訓練精華，針對不同族群的需求，特別企劃推出一系列強調＜身‧心＞訓練的客製化多元專屬課程，包括半天、一天的體驗活動，如：演出培訓課程、企業教育訓練課程、動態靜心課程、擊鼓課程…等方向，除了可培養開發表演藝術能力，亦能達到舒壓、靜心、提升專注力及團隊凝聚力等，運用於日常生活中，更能達到身心靈平衡，擁有健康且優質的生活品質。</p>
          <p><br /></p>
          <p>體驗詳情請洽永安藝文館-表演36房02-2939-3088  Email： <a href='mailto:pas36.ut@msa.hinet.net'>pas36.ut@msa.hinet.net</a></p>
          <p><br /></p>
          <p>《申請辦法》</p>
          <p><a href='#'>下載報名表</a>，填寫後回傳至 pas36.ut@msa.hinet.net，我們將盡速與你聯絡。</p>
        </div>

        <div class="show_info">

        </div>


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
