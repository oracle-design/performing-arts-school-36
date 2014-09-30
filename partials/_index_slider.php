<!-- slider block -->

      <ul class="bxslider">

      <?
        $sql = "SELECT * FROM banner WHERE category = 1 ORDER BY  id ASC ";
        $result = exe_sql(DATABASE, $sql);
        for($index=0;$index<count($result);$index++)
        {
      ?>

        <!--
          這邊可能要改一下
          <li>
            li tag 裡面可以放圖片（<img src="" alt="">）或是影片（<iframe src="" frameborder="0"></iframe>）
          </li>

          看要怎麼塞不同的媒體到 tag 裡
        -->

        <li>
          <img class="img-responsive" src="system/img/index_slider/<?echo $result[$index]['filename'];?>" alt="">
        </li>
      <?}?>

      </ul>
