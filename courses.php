<?php
	include "lib/mysql.php";
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
    <title>表演 36 房 || 活動課程</title>
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


  <!-- courses.html -->

  <!-- slider -->
  <div class="course_slider">
    <div class="container">

      <!-- 分隔墨線 -->
      <div class="banner-divider">
        <img src="/img/asset/banner-divider.png" alt="" class="img-responsive">
      </div>

      <?php include "partials/_courses_slider.php" ?>

      <!-- 分隔墨線 -->
      <div class="banner-divider">
        <img src="/img/asset/banner-divider.png" alt="" class="img-responsive">
      </div>

    </div>
  </div><!-- e/o slider -->

  <!-- courses list -->
  <div class="course_list">
    <div class="container">
      <div class="course_list-wrapper">

        <!-- 課程 -->
        <div class="course_block">


          <!--

          <% data.courses.courses.each do |f| %>

          <div class="unit">
            <div class="unit-inner course">
              <h3><%= f.title %></h3>
              <div class="mobile-photo">
                <img class="img-responsive" src="<%= f.img %>" alt="">
              </div>
              <div class="description">
                <p><%= f.content %></p>
              </div>
              <div class="readmore">
                <button class="b-course">了解更多</button>
              </div>
            </div>
          </div>

          <% end %>

          -->

          <!-- 課程單元 -->
		  <?
			$sql = "SELECT * FROM  `topic` WHERE  `category` = 6";
			$result = exe_sql(DATABASE, $sql);
			for($index=0;$index<count($result);$index++)
			{
		?>

          <div class="unit">
            <div class="unit-inner course">
              <h3><?echo $result[$index]['title'];?></h3>
              <div class="mobile-photo">
				<?
					$sql1 = "SELECT *  FROM `title` WHERE  `topicid` = ".$result[$index]['id'];
					$result1 = exe_sql(DATABASE, $sql1);

				?>
						<img class="img-responsive" src="system/img/<?echo $result1[0]['filename'];?>" alt="">
			         </div>
						<div class="description">
						<p><?echo $result1[0]['subtitle'];?></p>
            <?echo html_entity_decode($result1[0]['text']);?>
						</div>
						<div class="readmore">

              <!-- <button>...</button> 改成 <a href="<%= f.link %>" class="b-course">了解更多</a> -->
							<button class="b-course">了解更多</button>
						</div>
				</div>
			</div><!-- e/o 課程單元 -->
			<?}?>

		<!-- 課程單元 -->
          <!--div class="unit">
            <div class="unit-inner course">
              <h3>兒童擊鼓班</h3>
              <div class="mobile-photo">
                <img class="img-responsive" src="http://placehold.it/500x500" alt="">
              </div>
              <div class="description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, tempore vel similique eligendi incidunt dolores veritatis ipsam expedita nostrum quam nisi saepe natus animi laudantium maxime doloremque dignissimos modi blanditiis!</p>
              </div>
              <div class="readmore">
                <button class="b-course">了解更多</button>
              </div>
            </div>
          </div><!-- e/o 課程單元 -->

        </div>

        <!-- 活動 -->
        <div class="event_block">

          <!--

          <% data.courses.events.each do |f| %>

          <div class="unit">
            <div class="unit-inner event">
              <h3><%= f.title %></h3>
              <div class="mobile-photo">
                <img class="img-responsive" src="<%= f.img %>" alt="">
              </div>
              <div class="description">
                <p><%= f.content %></p>
              </div>
              <div class="readmore">
                <button class="b-event">了解更多</button>
              </div>
            </div>
          </div>

          <% end %>

          -->

          <!-- 活動單元 -->
		  <?
			$sql = "SELECT *FROM  `topic` WHERE  `category` = 5";
			$result = exe_sql(DATABASE, $sql);
			for($index=0;$index<count($result);$index++)
			{
		?>
          <div class="unit">
            <div class="unit-inner event">
              <h3><?echo $result[$index]['title'];?></h3>
              <div class="mobile-photo">
                <?
					$sql1 = "SELECT * FROM `title` WHERE  `topicid` = ".$result[$index]['id'];
					$result1 = exe_sql(DATABASE, $sql1);
				?>
						<img class="img-responsive" src="system/img/<?echo $result1[0]['filename'];?>" alt="">
              </div>
              <div class="description">
                <p><?echo $result1[0]['subtitle'];?></p>
                <?echo html_entity_decode($result1[0]['text']);?>
              </div>
              <div class="readmore">

                <!-- <button>...</button> 改成 <a href="<%= f.link %>" class="b-course">了解更多</a> -->
                <button class="b-event">了解更多</button>
              </div>
            </div>
          </div><!-- e/o 活動單元 -->
		  	<?}?>
          <!-- 活動單元 -->
          <!--div class="unit">
            <div class="unit-inner event">
              <h3>太極引導</h3>
              <div class="mobile-photo">
                <img class="img-responsive" src="http://placehold.it/500x500" alt="">
              </div>
              <div class="description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci qui ut excepturi, sunt fugiat soluta natus ullam, autem laborum, ipsa eum consequuntur dolore blanditiis, voluptatum omnis non! Dolores, libero, quis.</p>
              </div>
              <div class="readmore">
                <button class="b-event">了解更多</button>
              </div>
            </div>
          </div><!-- e/o 活動單元 -->

        </div>

      </div>
    </div>
  </div><!-- e/o courses list -->


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
