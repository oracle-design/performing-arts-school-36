<?php
  include "lib/mysql.php";
  include "system/php/functions.php";
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
    <title>表演 36 房 || 下載專區</title>
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



  <!-- download.html -->

  <div class="download_list">
    <div class="container">
      <div class="download_wraper">

        <!--

        <% data.download.each do |f| %>

        <div class="category_block">
          <h3><%= f.category %></h3>
          <div class="files_list">

            <% f.files.each do |file| %>

            <div class="file_unit">
              <div class="file_wrapper">
                <h4><%= file.title %></h4>
                <div class="file_info">
                  <p><%= file.description %></p>
                </div>
                <div class="file_type">
                  <img class="img-responsive" src="./img/asset/file_type/<%= file.type %>.png" alt="">
                </div>
                <div class="button">
                  <a href="<%= file.link %>">下載</a>
                </div>

              </div>
            </div>

            <% end %>

          </div>
        </div>

        <% end %>

        -->


        <!-- 分類 unit -->
        <?
        $sql = "SELECT * FROM download_category ORDER BY id ASC ";
        $result = exe_sql(DATABASE, $sql);
        for($index=0;$index<count($result);$index++)
        {
       ?>
        <div class="category_block">
          <h3><?echo $result[$index]['catename'];?></h3>
          <div class="files_list">
          <?
            $sql1 = "SELECT * FROM topic WHERE `size` = ".$result[$index]['id']." AND `category` = 7 AND `status` = 0 ORDER BY id ASC ";
            $result1 = exe_sql(DATABASE, $sql1);
            for($index1=0;$index1<count($result1);$index1++)
            {
          ?>
            <!-- 檔案 unit -->
            <div class="file_unit">
              <div class="file_wrapper">
                <h4><?echo cut_content($result1[$index1]['title'],20);?></h4>
                <?
                  $sql2 = "SELECT * FROM title WHERE topicid = ".$result1[$index1]['id']." AND `category` = 7 ORDER BY id ASC ";
                  $result2 = exe_sql(DATABASE, $sql2);
                ?>
                <div class="file_info">
                  <p><?echo cut_content($result2[0]['text'],84);?></p>
                </div>
                <div class="file_type">
                  <?
                    $cate = explode(".",$result2[0]['filename']);
                    if($cate[1] == 'docx'){echo '<img class="img-responsive" src="./img/asset/file_type/docx.png" alt="">';}else
                    if($cate[1] == 'pdf'){echo '<img class="img-responsive" src="./img/asset/file_type/pdf.png" alt="">';}else
                    if($cate[1] == 'rar'){echo '<img class="img-responsive" src="./img/asset/file_type/rar.png" alt="">';}else
                    if($cate[1] == 'zip'){echo '<img class="img-responsive" src="./img/asset/file_type/zip.png" alt="">';}else
                    if($cate[1] == 'xlsx'){echo '<img class="img-responsive" src="./img/asset/file_type/xlsx.png" alt="">';}else
                    {echo '<img class="img-responsive" src="./img/asset/file_type/other.png" alt="">'; }

                  ?>
                  <!--img class="img-responsive" src="./img/asset/file_type/docx.png" alt=""-->
                </div>
                <div class="button">
                  <a href="system/file/<?echo $result2[0]['filename'];?>">下載</a>
                </div>

              </div>
            </div>
            <?}?>
            <!-- 檔案 unit -->

            <!-- 檔案 unit -->

            <!-- 檔案 unit -->

          </div>
        </div>
        <?}?>
        <!-- 分類 unit -->

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