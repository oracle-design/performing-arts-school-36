  <!-- slider block -->
      <div class="slider-wrapper theme-default">
        <div id="slider" class="nivoSlider">
          <!-- slider img place here -->
          <!--

          <% data.activities.each do |f| %>
            <img class="img-responsive" src="<%= f.cover %>" alt="">
          <% end %>

          -->
          <?
            $sql = "SELECT * FROM banner WHERE category = 8 AND status =0 ORDER BY  id ASC ";
            $result = exe_sql(DATABASE, $sql);
            for($index=0;$index<count($result);$index++)
            {
          ?>		
              <img class="img-responsive" src="system/img/index_slider/<?echo $result[$index]['filename'];?>" alt="">
          <?}?>
            <!--img class="img-responsive" src="http://placehold.it/1280x400&text=cover1" alt="">
            <img class="img-responsive" src="http://placehold.it/1280x400&text=cover2" alt="">
            <img class="img-responsive" src="http://placehold.it/1280x400&text=cover3" alt="">
            <img class="img-responsive" src="http://placehold.it/1280x400&text=cover4" alt="">
            <img class="img-responsive" src="http://placehold.it/1280x400&text=cover5" alt="">
            <img class="img-responsive" src="http://placehold.it/1280x400&text=cover6" alt=""-->
        </div>
      </div>
