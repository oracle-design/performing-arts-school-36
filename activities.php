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
    <title>表演 36 房 || 活動花絮</title>
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


  <!-- activities.html -->

  <!-- slider -->
  <div class="activities_slider">
    <div class="container">
      <?php include "partials/_activities_slider.php" ?>

    </div>
  </div><!-- e/o slider -->

  <!-- activities list -->
  <div class="activities_list">
    <div class="container">
      <div class="activities_wrapper">

        <!--

        <% data.activities.each do |f| %>
        <div class="unit">
          <div class="activity_inner">
            <div class="activity_cover">
              <img class="img-responsive" src="<%= f.cover %>" alt="">
            </div>
            <h3><%= f.title %></h3>
            <div class="description">
              <p><%= f.description %></p>
            </div>
            <div class="button">
              <a class="gallery_trigger" href="<%= f.gallery.first %>" data-lightbox="<%= f.title %>">觀賞照片</a>
            </div>
          </div>

          <div class="gallery_container">
            <% f.gallery.each_with_index do |g, index| %>
              <% if index > 0 %>
            <a href="<%= g %>" data-lightbox="<%= f.title %>"></a>
              <% end %>
            <% end %>
          </div>
        </div>
        <% end %>

        -->

        <!-- activities unit -->
        
          <?
              $sql = "SELECT * FROM topic WHERE category  = 9 ORDER BY id ASC ";
              $result = exe_sql(DATABASE, $sql);
              for($index=0;$index<count($result);$index++)
              {
                $sql1 = "SELECT * FROM useruppic WHERE topicid = ".$result[$index]['id']." ORDER BY id ASC ";
                $result1 = exe_sql(DATABASE, $sql1);
                $sql2 = "SELECT * FROM title WHERE topicid = ".$result[$index]['id']." ORDER BY id ASC ";
                $result2 = exe_sql(DATABASE, $sql2);
                ?>
                <div class="unit">
                <div class="activity_inner">
                <!-- 封面照片 -->
                <div class="activity_cover">
                <?
                  if ($result2[0]['filename'] != '')
                  {
                ?>
                    <img class="img-responsive" src="system/img/<?echo $result2[0]['filename'];?>" alt="">
                <?}?>
                </div>
                <!-- 活動標題 -->
                <h3><?echo $result[$index]['title'];?></h3>
                <!-- 活動描述 121字-->
                <div class="description">
                  <p><?echo cut_content(html_entity_decode($result2[0]['text']),121);?></p>
                </div>
                <!-- 打開 Gallery（href 指向第一張照片）, data-lightbox 的值可設定為活動 id -->
                <div class="button">
                  <a class="gallery_trigger" href="system/img/<?echo $result1[0]['filename'];?>" data-lightbox="<?echo $result[$index]['id'];?>">觀賞照片</a>
                </div>
                </div>
                <!-- 放置其他照片給 lightbox 用 -->
                <div class="gallery_container">
                  <!-- 列出第二張之後的照片 -->
                  <?
                    for($i=1;$i<count($result1);$i++)
                    {
                  ?>
                      <a href="system/img/<?echo $result1[$i]['filename'];?>" data-lightbox="<?echo $result[$index]['id'];?>"></a>
                  <?}?>
                </div>
                </div>
            <?}?>
        
        <!-- activities unit -->
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
