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
				$sql = "SELECT * FROM banner WHERE category = 4 ORDER BY  id ASC ";
				$result = exe_sql(DATABASE, $sql);
				if(!$result)
				{?>
					<img class="img-responsive" src="http://placehold.it/1280x400" alt="">
			<?	}
				for($index=0;$index<count($result);$index++)
				{
					if($result[$index]['filename'] != '')
					{
			?>		
						<img class="img-responsive" src="./img/index_slider/<?echo $result[$index]['filename'];?>" alt="">
			<?
					}else{
			?>
						<img class="img-responsive" src="http://placehold.it/1280x400" alt="">
			<?}}?>
          <!--img class="img-responsive" src="./img/index_slider/01.jpg" alt="">
          <img class="img-responsive" src="./img/index_slider/02.jpg" alt="">
          <img class="img-responsive" src="./img/index_slider/03.jpg" alt="">
          <img class="img-responsive" src="./img/index_slider/04.jpg" alt="">
          <img class="img-responsive" src="./img/index_slider/05.jpg" alt="">
          <img class="img-responsive" src="http://placehold.it/1280x400" alt=""-->
        </div>
      </div>
