<?php
function checkInput($value){
	connect_to_database();
	$value = trim($value);
	if (get_magic_quotes_gpc()){
		$value = stripslashes($value);	//去除斜線
	}
	if (!is_numeric($value)){	
		$value = mysql_real_escape_string($value);
	}
	return $value;
}
?>