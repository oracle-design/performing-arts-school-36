<?php 
	if($_POST['submit']=="送出")
	{
		//echo "<script>alert('".htmlspecialchars($_POST['text'])."');</script>";
		if($_FILES['filename']['name']!='')
		{
			//echo "<script>alert('".$_FILES['filename']['name']."');</script>";
			$file_name = $_FILES['filename']['name']; //取得檔名
			$file_size = number_format(($_FILES['filename']['size']/1024), 1, '.', ''); //取得檔案大小
			$allowSubName = "jpg,png,gif"; 	//允許檔案格式
			$allowMaxSize = 1024; 			//允許上傳大小 (KB)
			$upFloder = "img"; 	//目標資料夾
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
			$sql_array['title'] = $_POST['title'];
			$sql_array['size'] = $_POST['size'];
			$table = "topic";
			$key_column = "id";
			$id = $_POST['id'];
			update(DATABASE, $table, $sql_array, $key_column, $id);
			$sql_array = null;
			
			$sql_array['filename'] = $file_name;
			$sql_array['subtitle'] = $_POST['subtitle'];
			$sql_array['text'] = htmlspecialchars($_POST['text']);
			$table = "title";
			$key_column = "id";
			$id = $_POST['id'];
			update(DATABASE, $table, $sql_array, $key_column, $id);
			$file_name = null;
			$sql_array = null;
		}
    else 
		{
			$sql_array['title'] = $_POST['title'];
			$sql_array['size'] = $_POST['size'];
			$table = "topic";
			$key_column = "id";
			$id = $_POST['id'];
			update(DATABASE, $table, $sql_array, $key_column, $id);
			$sql_array = null;
	
			$sql_array['subtitle'] = $_POST['subtitle'];
			$sql_array['text'] = htmlspecialchars($_POST['text']);
			$table = "title";
			$key_column = "id";
			$id = $_POST['id'];
			update(DATABASE, $table, $sql_array, $key_column, $id);
			$sql_array = null;
		}
		$statusMsg = "資料已更新 ".date("Y-m-d H:i:s",mktime (date(H), date(i), date(s), date(m), date(d), date(Y)));
	}   
?>