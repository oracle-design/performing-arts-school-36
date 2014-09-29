<?
function topicinsert($title,$size,$category){
	$table = "topic";
	$data_array['title']    = $title;
	$data_array['size']     = $size;
	$data_array['category'] = $category; // 4為NEWS 5為活動 6為課程 7為上傳檔案 8為花絮
	insert(DATABASE, $table, $data_array);
	
	$sql1 = "SELECT LAST_INSERT_ID()"; 
	$result1 = exe_sql(DATABASE, $sql1);
	return $result1[0][0];
}
function titleinsert($subtitle,$text,$file_name,$category,$topicid){

	$table = "title";
	$data_array['subtitle'] = $subtitle;
  $data_array['text']     = htmlspecialchars($text);
  $data_array['filename'] = $file_name;
  $data_array['category'] = $category; // 4為NEWS 5為活動 6為課程 7為上傳檔案 8為花絮
	$data_array['topicid']  = $topicid;
	insert(DATABASE, $table, $data_array);
}


function fileupdata($name,$size){
  $_FILES['filename']['name'] = $name;
  $_FILES['filename']['size'] = $size;

	if($_FILES['filename']['name']!='')
	{
		//echo "<script>alert('".$_FILES['filename']['name']."');</script>";
		$file_name = $_FILES['filename']['name']; //取得檔名
		$file_size = number_format(($_FILES['filename']['size']/1024), 1, '.', ''); //取得檔案大小
		$allowSubName = "xlsx,docx,zip,pdf"; 	//允許檔案格式
		$allowMaxSize = 102400; 			//允許上傳大小 (KB)
		$upFloder = "file"; 	//目標資料夾
		$subn_array = explode(",",$allowSubName);//分割允許上傳副檔名
		
		$checkSubName = "";
		$checkSize = "";
		$checkmsg = "";
		$checkRepeat = "";
	
		$fn_array=explode(".",$file_name);//分割檔名
		$mainName = $fn_array[0];//檔名
		$subName = $fn_array[1];//副檔名	
	
		//判斷檔案格式
		foreach($subn_array as $index => $value){
		if($subName == $value){			
			$checkSubName ="ok";
			break;
		}else{
			//$checkSubName ="格式不符:".$subName;
			$checkSubName ="ok"; 
		}
		}
	
		//判斷上傳檔案
		if($file_size <= $allowMaxSize){		
			$checkSize = "ok";
		}else{
			//$checkSize = "圖片太大囉";
      $checkSize = "ok";
		}
		if($checkSize == "ok" && $checkSubName == "ok"){
			if($upFloder != ""){
				$upload_dir = $upFloder.'/';
			}
			//中文檔名處理
			if (mb_strlen($mainName,"Big5") != strlen($mainName))
			{
				$mainName = "products".date("ymdHis").floor(microtime()*100);//重新命名=檔名+日期
				$file_name = sprintf("%s.%s",$mainName,$subName);//組合檔名
			}	
			$upload_file = $upload_dir . basename($file_name);
			//檔名重覆處理
			$x=1;
			while(file_exists($upload_file)){
				$checkRepeat = " (檔案名稱重複，附加辨識數字)";
				$file_name = sprintf("%s_%d.%s",$mainName ,$x++ ,$subName);//組合檔名
				$upload_file = $upload_dir . basename($file_name);
			}
			$temploadfile = $_FILES['filename']['tmp_name'];
			$result = move_uploaded_file($temploadfile , $upload_file);
		}else{
			$checkmsg = sprintf("1.檔案格式：%s<br>2.檔案大小：%s",$checkSubName,$checkSize);
		}
		if (isset($result))//判斷上傳結果 
		{	
			//echo "OK";
		}else{
			//echo $checkmsg;
		}
		return $file_name;
	}
}

function downloadcate($cate){
  $sql = "SELECT * FROM download_category ORDER BY  id ASC ";
  $result = exe_sql(DATABASE, $sql);
  for($index=0;$index<count($result);$index++)
  {
    if ($result[$index]['id'] == $cate)
    {
      echo "<option value= ".$result[$index]['id']." selected>".$result[$index]['catename']."</option>";
    }else{
      echo "<option value= ".$result[$index]['id'].">".$result[$index]['catename']."</option>";
    }
  }
}
//裁切字串
function cut_content($a,$b){
    $a = strip_tags($a); //去除HTML標籤
    $sub_content = mb_substr($a, 0, $b, 'UTF-8'); //擷取子字串
    echo $sub_content;  //顯示處理後的摘要文字
    //顯示 "......"
    if (strlen($a) > strlen($sub_content)) echo "...";
}

//以上程式已經包裝起來,您可存放在例如:function.php網頁
//往後只要使用include("function.php");
//加上 cut_content($a,$b);即可,不需每次撰寫.
//$a代表欲裁切內容.
//$b代表欲裁切字數(字元數)

function debug($data) {
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
		echo "<script>alert('PHP2: ".$data."');</script>";
}

?>