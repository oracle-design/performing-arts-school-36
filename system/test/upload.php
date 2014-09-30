<?php session_start();
include "../lib/mysql.php";
if (!empty($_FILES)) {
	$file_name = $_FILES['file']['name']; //取得檔名
	$file_size = number_format(($_FILES['file']['size']/1024), 1, '.', ''); //取得檔案大小
	$allowSubName = "jpg,png,gif"; 	//允許檔案格式
	$allowMaxSize = 102400; 			//允許上傳大小 (KB)
	$upFloder = "../img"; 	//目標資料夾
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
		$checkSubName ="格式不符:".$subName;
	}
	}
	
	//判斷上傳檔案
	if($file_size <= $allowMaxSize){		
		$checkSize = "ok";
	}else{
		$checkSize = "圖片太大囉";
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
		$temploadfile = $_FILES['file']['tmp_name'];
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
  $table = "useruppic";
	$data_array['filename'] = $file_name;
	$data_array['topicid'] = $_SESSION['topicid'];
	insert(DATABASE, $table, $data_array);
  $data_array = null;
}
?>   