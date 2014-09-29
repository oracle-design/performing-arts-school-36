<?session_start();
  include "lib/mysql.php";
  if($_GET['del']!="")
  {
    $sql = "DELETE FROM useruppic WHERE id = ".$_GET['del'];
		exe_sql(DATABASE, $sql);
  }
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <script language="javascript">
    function reSize(){
　　//parent.document.all.frameid.height=document.body.scrollHeight; 
　　  parent.document.getElementById("pic").height=document.body.scrollHeight;
    } 
    window.onload=reSize;
</script>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!-- Use title if it's in the page YAML frontmatter -->
    <title>表演 36 房</title>
    <meta name="description" content="「表演36房」，將優人神鼓原創的表演藝術技巧傳授給山下社區居民，並協同中華民國自主學習促進會及文山區各社區組織的資源，期望打造一個專業表演人才培訓學苑，實現從社區出發，建立國際舞台交流平台的目標。">
    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link href="css/application.css" rel="stylesheet" type="text/css" />
    <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js" type="text/javascript"></script>
    <script src="js/autoHeightIframe.js" type="text/javascript"></script>
  </head>
  <body>
      <?
        $sql="SELECT * FROM useruppic WHERE topicid = ".$_SESSION['topicid'];
				$result = exe_sql(DATABASE,$sql);
        for($index=0;$index<count($result);$index++)
        {
      ?>
          <div style="float:left">
            <div><img src="img/<?echo $result[$index]['filename'];?>" width="250px%" height="150px" alt=""></div>
            <div><a href="editor_activities_pic.php?del=<?echo $result[$index]['id'];?>">刪除照片</a></div>
          </div>
      <?}?>
      
      
        

  </body>
</html>
