<?php session_start();
  if($_GET['del']!="")
  {
    $sql = "DELETE FROM title WHERE topicid = ".$_GET['del'];
		exe_sql(DATABASE, $sql);
    $sql = "DELETE FROM topic WHERE topic.id = ".$_GET['del'];
		exe_sql(DATABASE, $sql);
  }
  
	if($_POST['submit']=="送出")
	{
		$topicid;
		//echo "<script>alert('date=".$_POST['date']."');</script>";
		//echo "<script>alert('BTN=".$_POST['BTN']."');</script>";
		//echo "<script>alert('".htmlspecialchars($_POST['text'])."');</script>";
		if ($_POST['title']!='')
		{	
			
			if($_FILES['pic']['name']!='')
			{
				//echo "<script>alert('".$_FILES['pic']['name']."');</script>";
				$file_name = $_FILES['pic']['name']; //取得檔名
				$file_size = number_format(($_FILES['pic']['size']/1024), 1, '.', ''); //取得檔案大小
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
					$temploadfile = $_FILES['pic']['tmp_name'];
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
				$table = "topic";
				
				$data_array['title'] = $_POST['title'];
				$data_array['size'] = $_POST['size'];
				$data_array['post_time'] = $_POST['date'];
				$data_array['category'] =  $_POST['category']; // 4為NEWS 5為活動 6為課程
				insert(DATABASE, $table, $data_array);
				
				$sql1 = "SELECT LAST_INSERT_ID()"; 
				$result1 = exe_sql(DATABASE, $sql1);
				$topicid = $result1[0][0];
				$data_array = null;
        $_SESSION['topicid'] = $topicid;
				//----------------------------------------------------------
				$table = "title";
				$data_array['category'] =  $_POST['category']; // 4為NEWS 5為活動 6為課程
				$data_array['subtitle'] = $_POST['subtitle'];
				$data_array['topicid'] = $topicid;
				$data_array['text'] = htmlspecialchars($_POST['text']);
				$data_array['filename'] = $file_name;
				insert(DATABASE, $table, $data_array);
				$data_array = null;
			}else 
			{
				$table = "topic";
				$data_array['post_time'] = $_POST['date'];
				$data_array['title'] = $_POST['title'];
				$data_array['size'] = $_POST['size'];
				$data_array['category'] =  $_POST['category']; // 4為NEWS 5為活動 6為課程
				insert(DATABASE, $table, $data_array);
				
				$sql1 = "SELECT LAST_INSERT_ID()"; 
				$result1 = exe_sql(DATABASE, $sql1);
				$topicid = $result1[0][0];
				$data_array = null;
        $_SESSION['topicid'] = $topicid;
				//----------------------------------------------------------
				$table = "title";
				$data_array['category'] =  $_POST['category']; // 4為NEWS 5為活動 6為課程
				$data_array['subtitle'] = $_POST['subtitle'];
				$data_array['topicid'] = $topicid;
				$data_array['text'] = htmlspecialchars($_POST['text']);
				insert(DATABASE, $table, $data_array);
				$data_array = null;
			}
		}
		
		//for($i=0;$i<4;$i++)
		//{
		//	if($_FILES['filename'.$i]['name']!='')
		//	{
		//		//echo "<script>alert('".$_FILES['filename'.$i]['name']."');</script>";
		//		$file_name = $_FILES['filename'.$i]['name']; //取得檔名
		//		$file_size = number_format(($_FILES['filename'.$i]['size']/1024), 1, '.', ''); //取得檔案大小
		//		$allowSubName = "jpg,png,gif"; 	//允許檔案格式
		//		$allowMaxSize = 1024; 			//允許上傳大小 (KB)
		//		$upFloder = "img/index_slider"; 	//目標資料夾
		//		$subn_array = explode(",",$allowSubName);//分割允許上傳副檔名
		//		
		//		$checkSubName = "";
		//		$checkSize = "";
		//		$checkmsg = "";
		//		$checkRepeat = "";
		//	
		//		$fn_array=explode(".",$file_name);//分割檔名
		//		$mainName = $fn_array[0];//檔名
		//		$subName = $fn_array[1];//副檔名	
		//	
		//		//判斷檔案格式
		//		foreach($subn_array as $index => $value){
		//		if($subName == $value){			
		//			$checkSubName ="ok";
		//			break;
		//		}else{
		//			$checkSubName ="格式不符:".$subName;
		//		}
		//		}
		//	
		//		//判斷上傳檔案
		//		if($file_size <= $allowMaxSize){		
		//			$checkSize = "ok";
		//		}else{
		//			$checkSize = "圖片太大囉";
		//		}
		//		if($checkSize == "ok" && $checkSubName == "ok"){
		//			if($upFloder != ""){
		//				$upload_dir = $upFloder.'/';
		//			}
		//			//中文檔名處理
		//			if (mb_strlen($mainName,"Big5") != strlen($mainName))
		//			{
		//				$mainName = "products".date("ymdHis").floor(microtime()*100);//重新命名=檔名+日期
		//				$file_name = sprintf("%s.%s",$mainName,$subName);//組合檔名
		//			}	
		//			$upload_file = $upload_dir . basename($file_name);
		//			//檔名重覆處理
		//			$x=1;
		//			while(file_exists($upload_file)){
		//				$checkRepeat = " (檔案名稱重複，附加辨識數字)";
		//				$file_name = sprintf("%s_%d.%s",$mainName ,$x++ ,$subName);//組合檔名
		//				$upload_file = $upload_dir . basename($file_name);
		//			}
		//			$temploadfile = $_FILES['filename'.$i]['tmp_name'];
		//			$result = move_uploaded_file($temploadfile , $upload_file);
		//		}else{
		//			$checkmsg = sprintf("1.檔案格式：%s<br>2.檔案大小：%s",$checkSubName,$checkSize);
		//		}
		//		if (isset($result))//判斷上傳結果 
		//		{	
		//			//echo "OK";
		//		}else{
		//			//echo $checkmsg;
		//		}
		//		$table = "banner";
		//		$data_array['topicid'] = $topicid; 
		//		$data_array['filename'] = $file_name;
		//		$data_array['title'] = $_POST['title'.$i];
		//		$data_array['category'] = $_POST['category'];// 4為NEWS 5為活動 6為課程
		//		insert(DATABASE, $table, $data_array);
		//		$data_array = null;
    //
		//		
		//	}else 
		//	{
		//		$table = "banner";
		//		$data_array['topicid'] = $topicid; // 4為NEWS 5為活動 6為課程
		//		$data_array['title'] = $_POST['title'.$i];
		//		$data_array['category'] = $_POST['category'];
		//		insert(DATABASE, $table, $data_array);
		//		$data_array = null;
		//	}
		//}
		//echo "<script>location.href='bookQ.php?aid=".$resultb[0]['id']."'</script>";		
	}   
	if($_POST['submit']=="修改")
	{	
		//for($i=0;$i<4;$i++)
		//{
		//	if($_FILES['filename'.$i]['name']!='')
		//	{
		//		//echo "<script>alert('".$_FILES['filename'.$i]['name']."');</script>";
		//		$file_name = $_FILES['filename'.$i]['name']; //取得檔名
		//		$file_size = number_format(($_FILES['filename'.$i]['size']/1024), 1, '.', ''); //取得檔案大小
		//		$allowSubName = "jpg,png,gif"; 	//允許檔案格式
		//		$allowMaxSize = 1024; 			//允許上傳大小 (KB)
		//		$upFloder = "img/index_slider"; 	//目標資料夾
		//		$subn_array = explode(",",$allowSubName);//分割允許上傳副檔名
		//		
		//		$checkSubName = "";
		//		$checkSize = "";
		//		$checkmsg = "";
		//		$checkRepeat = "";
		//	
		//		$fn_array=explode(".",$file_name);//分割檔名
		//		$mainName = $fn_array[0];//檔名
		//		$subName = $fn_array[1];//副檔名	
		//	
		//		//判斷檔案格式
		//		foreach($subn_array as $index => $value){
		//		if($subName == $value){			
		//			$checkSubName ="ok";
		//			break;
		//		}else{
		//			$checkSubName ="格式不符:".$subName;
		//		}
		//		}
		//	
		//		//判斷上傳檔案
		//		if($file_size <= $allowMaxSize){		
		//			$checkSize = "ok";
		//		}else{
		//			$checkSize = "圖片太大囉";
		//		}
		//		if($checkSize == "ok" && $checkSubName == "ok"){
		//			if($upFloder != ""){
		//				$upload_dir = $upFloder.'/';
		//			}
		//			//中文檔名處理
		//			if (mb_strlen($mainName,"Big5") != strlen($mainName))
		//			{
		//				$mainName = "products".date("ymdHis").floor(microtime()*100);//重新命名=檔名+日期
		//				$file_name = sprintf("%s.%s",$mainName,$subName);//組合檔名
		//			}	
		//			$upload_file = $upload_dir . basename($file_name);
		//			//檔名重覆處理
		//			$x=1;
		//			while(file_exists($upload_file)){
		//				$checkRepeat = " (檔案名稱重複，附加辨識數字)";
		//				$file_name = sprintf("%s_%d.%s",$mainName ,$x++ ,$subName);//組合檔名
		//				$upload_file = $upload_dir . basename($file_name);
		//			}
		//			$temploadfile = $_FILES['filename'.$i]['tmp_name'];
		//			$result = move_uploaded_file($temploadfile , $upload_file);
		//		}else{
		//			$checkmsg = sprintf("1.檔案格式：%s<br>2.檔案大小：%s",$checkSubName,$checkSize);
		//		}
		//		if (isset($result))//判斷上傳結果 
		//		{	
		//			//echo "OK";
		//		}else{
		//			//echo $checkmsg;
		//		}
		//		$sql_array['filename'] = $file_name;
		//		$sql_array['title'] = $_POST['title'.$i];
		//		$table = "banner";
		//		$key_column = "id";
		//		$id = $_POST['id'.$i];
		//		update(DATABASE, $table, $sql_array, $key_column, $id);
		//		$file_name = null;
		//		$sql_array = null;	
		//	}else{
		//		$sql_array['title'] = $_POST['title'.$i];
		//		$table = "banner";
		//		$key_column = "id";
		//		$id = $_POST['id'.$i];
		//		update(DATABASE, $table, $sql_array, $key_column, $id);
		//		$file_name = null;
		//		$sql_array = null;	
		//	}
		//}
		//處理topic
		$sql_array['title'] = $_POST['title'];
		$sql_array['size'] = $_POST['size'];
		$sql_array['post_time'] = $_POST['date'];
		$table = "topic";
		$key_column = "id";
		$id = $_POST['topicid'];
    $_SESSION['topicid'] = $_POST['topicid'];
		update(DATABASE, $table, $sql_array, $key_column, $id);
		$file_name = null;
		$sql_array = null;	
		//處理title
		for($index=0;$index<20;$index++)
		{
			if($_FILES['pic'.$index]['name']!='')
			{
				//echo "<script>alert('".$_FILES['pic'.$index]['name']."');</script>";
				$file_name = $_FILES['pic'.$index]['name']; //取得檔名
				$file_size = number_format(($_FILES['pic'.$index]['size']/1024), 1, '.', ''); //取得檔案大小
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
					$temploadfile = $_FILES['pic'.$index]['tmp_name'];
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
				$sql_array['subtitle'] = $_POST['subtitle'.$index];
				$sql_array['text'] = htmlspecialchars($_POST['text'.$index]);
				$sql_array['filename'] = $file_name;
				
				$table = "title";
				$key_column = "id";
				$id = $_POST['titleid'.$index];
				update(DATABASE, $table, $sql_array, $key_column, $id);
				$file_name = null;
				$sql_array = null;
			}else{
				$sql_array['subtitle'] = $_POST['subtitle'.$index];
				$sql_array['text'] = htmlspecialchars($_POST['text'.$index]);
				$table = "title";
				$key_column = "id";
				$id = $_POST['titleid'.$index];
				update(DATABASE, $table, $sql_array, $key_column, $id);
				$file_name = null;
				$sql_array = null;
			}
		}
	}
	if($_POST['submit']=="確定新增")
	{
		if($_FILES['pic']['name']!='')
		{
			//echo "<script>alert('".$_FILES['pic']['name']."');</script>";
			$file_name = $_FILES['pic']['name']; //取得檔名
			$file_size = number_format(($_FILES['pic']['size']/1024), 1, '.', ''); //取得檔案大小
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
				$temploadfile = $_FILES['pic']['tmp_name'];
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
			$table = "title";
			$data_array['category'] =  $_POST['category']; // 4為NEWS 5為活動 6為課程
			$data_array['subtitle'] = $_POST['subtitle'];
			$data_array['topicid'] = $_POST['topicid'];
			$data_array['text'] = htmlspecialchars($_POST['text']);
			$data_array['filename'] = $file_name;
			insert(DATABASE, $table, $data_array);
			$data_array = null;
      $_SESSION['topicid'] = $_POST['topicid'];
		}else 
		{
			$table = "title";
			$data_array['category'] =  $_POST['category']; // 4為NEWS 5為活動 6為課程
			$data_array['subtitle'] = $_POST['subtitle'];
			$data_array['topicid'] = $_POST['topicid'];
			$data_array['text'] = htmlspecialchars($_POST['text']);
			insert(DATABASE, $table, $data_array);
			$data_array = null;
      $_SESSION['topicid'] = $_POST['topicid'];
		}
	}
	   
?>