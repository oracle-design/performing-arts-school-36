<?php session_start();
include "../lib/mysql.php";
$upload_folder = 'data';
if(count($_FILES)>0) {
        if(move_uploaded_file( $_FILES['upload']['tmp_name'] , $upload_folder.'/'.$_FILES['upload']['name'])) {
               //echo 'done';
        }
        $table = "useruppic";
        $data_array['filename'] = $_FILES['upload']['name'];
        $data_array['topicid']  = $_SESSION['topicid'];
        insert(DATABASE, $table, $data_array);
        $data_array = null;
        exit();

	} else if(isset($_GET['up'])) {   
        if(isset($_GET['base64'])) {
                $content = base64_decode(file_get_contents('php://input'));
        } else {
                $content = file_get_contents('php://input');
        }
				
        $headers = getallheaders();
        $headers = array_change_key_case($headers, CASE_UPPER);
		
		/* define */
    
		$file_name = $headers['UP-FILENAME']; //取得檔名
		$fn_array=explode(".",$file_name);//分割檔名
		$mainName = $fn_array[0];//檔名
		$subName = $fn_array[1];//副檔名
		
    if (mb_strlen($mainName,"Big5") != strlen($mainName))
		{
			$mainName = "undefine".date("ymdHis").floor(microtime()*100);//重新命名=檔名+日期
			$file_name = sprintf("%s.%s",$mainName,$subName);//組合檔名
		}
		//中文檔名處理 end
		
		//檔名與路徑組合
		$upFilePath = $upload_folder.'/'. basename($file_name);	
		
		
		//檔名重覆處理
		$x=1;
		while(file_exists($upFilePath)){
			$file_name = sprintf("%s_%d.%s",$mainName ,$x++ ,$subName);//組合檔名
			$upFilePath = $upload_folder.'/'. basename($file_name);
		}
		$temploadfile = $_FILES['Filedata']['tmp_name'];
		$result = move_uploaded_file($temploadfile , $upFilePath);
		//檔名重覆處理 end			
    if(file_put_contents($upFilePath, $content))
    
    $table = "useruppic";
    $data_array['filename'] = $file_name;
    $data_array['topicid']  = $_SESSION['topicid'];
    insert(DATABASE, $table, $data_array);
    $data_array = null;
    
		echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
		echo "<xmllist>\n";
		echo "<student>\n";
		echo "<id>$file_name</id>\n";
		echo "</student>\n</xmllist>";
 }
?>