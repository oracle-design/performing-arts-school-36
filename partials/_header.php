<div id="top" class="header">

    <!-- banner -->
    <div class="container">

      <!-- mobile menu button -->
      <div class="menu-btn only-mobile">&#9776; Menu</div>

      <div class="header_top">
        <div class="container">
          <div class="header_top-icons">
            <a target="_blank" class="trans-05s" href="https://www.facebook.com/pas36">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
              </span>
            </a>
            <a class="trans-05s" href="./">
              <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-home fa-stack-1x fa-inverse"></i>
              </span>
            </a>
            <span> | </span>
            <a class="contact_us" href="/contact.php">聯絡我們</a>
          </div>
        </div>
        <div class="header_top-subscribe">
          <button class="subscribe-button" type="button">電子報訂閱</button>
        </div>

      </div>
    </div>

    <!-- banner -->
    <div class="container">

      <div class="header_banner">

        <!-- 留空勿刪 -->
        <div class="header_banner-icons hidden-mobile">
        </div>

        <div class="header_banner-logo">
          <div class="logo-wrapper">
            <a href="index.php">
              <img class="img-responsive only-mobile" src="img/asset/header_logo2.png" />
              <img class="img-responsive only-pad" src="img/asset/header_logo5.png" />
              <img class="img-responsive only-desktop" src="img/asset/header_logo4.png" />
              <img class="img-responsive only-large" src="img/asset/header_logo3.png" />
            </a>
          </div>
        </div>

        <!-- 留空勿刪 -->
        <div class="header_banner-subscribe hidden-mobile">
        </div>

      </div>
    </div><!-- e/o banner -->

    <!-- navi bar -->
    <div class="container hidden-mobile">
      <nav>
        <ul>
          <!-- navi contents -->
          <!--

          讀取 navi 的內容
          每個項目都生成一個 li 包起來的連結
          並判斷： link 的內容如果和 current page 的 url 一樣，則加入 "active" 到 class 中

          <% data.navi.each do |f| %>
          <li><%= nav_link f.title, f.link %></li>
          <% end %>

          -->

          <li><a class="" href="about.php">關於我們</a></li>
          <li><a class="" href="spaces.php">場地租借</a></li>
          <li><a class="" href="courses.php">活動課程</a></li>
          <li><a class="" href="about.php#tour">參訪體驗</a></li>
          <li><a class="" href="activities.php">活動花絮</a></li>
          <li><a class="" href="about.php#hire">志工招募</a></li>
          <li><a class="" href="about.php#comm">社區專案</a></li>
          <li><a class="" href="download.php">下載專區</a></li>
        </ul>
      </nav>
    </div><!-- e/o navi bar -->

  </div>

  <!-- mobile menu -->
  <nav class="pushy pushy-left">
    <ul>

      <!--
      <li><a href="/">回到首頁 <i class="fa fa-home"></i></a></li>
      <% data.navi.each do |f| %>
      <li><%= nav_link f.title, f.link %></li>
      <% end %>
       -->

      <li><a href="index.php">回到首頁 <i class="fa fa-home"></i></a></li>
      <li><a class="" href="about.php">關於我們</a></li>
      <li><a class="" href="spaces.php">場地租借</a></li>
      <li><a class="" href="courses.php">活動課程</a></li>
      <li><a class="" href="about.php#tour">參訪體驗</a></li>
      <li><a class="" href="activities.php">活動花絮</a></li>
      <li><a class="" href="about.php#hire">志工招募</a></li>
      <li><a class="" href="about.php#comm">社區專案</a></li>
      <li><a class="" href="download.php">下載專區</a></li>

    </ul>
  </nav>
  <!-- Site Overlay -->
  <div class="site-overlay"></div>
