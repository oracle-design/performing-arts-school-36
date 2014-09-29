<?php 
	if($_POST['submit']=="送出")
	{
		//echo "<script>alert('".htmlspecialchars($_POST['text'])."');</script>";
		$file_name = fileupdata($_FILES['filename']['name'],$_FILES['filename']['size']);
		$topicid = topicinsert($_POST['title'],$_POST['cate'],7); //這裡SIZE充當紀錄下載的類別download_category  topicinsert($title,$size,$category) 4為NEWS 5為活動 6為課程 7為上傳檔案
		titleinsert($_FILES['filename']['name'],$_POST['text'],$file_name,7,$topicid);//這裡subtitle充當紀錄文件ID //titleinsert($subtitle,$text,$filename,$category,$topicid) 4為NEWS 5為活動 6為課程 7為上傳檔案
    $statusMsg = "資料已上傳 ".date("Y-m-d H:i:s",mktime (date(H), date(i), date(s), date(m), date(d), date(Y)));
	}
  if($_POST['submit']=="新增")
	{
    $table = "download_category";
    $data_array['catename']  = $_POST['catein'];
    insert(DATABASE, $table, $data_array);
  }
  if($_POST['submit']=="刪除")
	{
    $sql_array['status'] = 1;
		$table = "topic";
		$key_column = "id";
		$id = $_POST['topicid'];
		update(DATABASE, $table, $sql_array, $key_column, $id);
  }
  if($_POST['submit']=="更新")
	{ 
    $table = "topic";
    $sql_array['title'] = $_POST['title'];
    $sql_array['size'] = $_POST['cate'];
		$key_column = "id";
		$id = $_POST['topicid'];
		update(DATABASE, $table, $sql_array, $key_column, $id);
    $sql_array = null;
    
    if($_FILES['filename']['name'] != '')
    {
      $file_name = fileupdata($_FILES['filename']['name'],$_FILES['filename']['size']);
      $table = "title";
      $sql_array['subtitle'] = $_FILES['filename']['name'];
      $sql_array['text'] = $_POST['text'];
      $sql_array['filename'] = $file_name;
      $key_column = "id";
      $id = $_POST['titleid'];
      update(DATABASE, $table, $sql_array, $key_column, $id);
    }else{
      $table = "title";
      $sql_array['text'] = $_POST['text'];
      $key_column = "id";
      $id = $_POST['titleid'];
      update(DATABASE, $table, $sql_array, $key_column, $id);
    }
    
  }
?>