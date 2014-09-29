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

function sendMail($verification,$account,$name,$phone,$ali_account){
		
		$verification = checkInput($verification);
		$account = checkInput($account);
		$name = checkInput($name);
		$phone = checkInput($phone);
		$ali_account = checkInput($ali_account);
		
		$sCharset="utf-8";
		$sMailHeaderFmt = '=?' . $sCharset . '?b?%s?=';
		$to = $account; //收件者 
		$sMailFrom = "mybee.admin@mybee.com";
		$headers = "MIME-Version: 1.0\r\n" .
            "Content-type: text/html; charset=$sCharset\r\n" .
            "From: $sMailFrom\r\n";
		$subject = "Mybee - Email verification"; //信件標題
		$subject = iconv('big5', $sCharset, $subject);
		$subject = sprintf($sMailHeaderFmt, base64_encode($subject));
		$msg = "
		<style>
		td{
			
		}
		</style>
		親愛的會員 您好: 
		<br>
		<br>
		感謝您申請『Mybee有限公司』的代收付帳號電子郵件認證，請點擊以下的連結，來認證您的e-mail address，謝謝您! 
		<br>
		<br>
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr>
		<td style='
			font-family: arial,sans-serif;
			background-color: rgb(240, 90, 40);
			height: 30px;
			text-align: center;
			vertical-align: middle;
			color:#ffffff;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		點擊認證連結，或複製後貼至瀏覽器網址列
		</td>
		</tr>
		<tr>
		<td style='
			width: 500px;
			height: 80px;
			font-family: arial,sans-serif;
			vertical-align: middle;
			text-align: center;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		<a href='http://mybee.com.tw/index.php?verification=$verification'>http://mybee.com.tw/index.php?verification=$verification</a>
		</td>
		</tr>
		</table>
		<br>
		<br>
		您的資料明細
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>會員名稱</td><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>$name</td></tr>
		<tr><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>手機號碼</td><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>$phone</td></tr>
		<tr><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>阿里旺旺帳號</td><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>$ali_account</td></tr>
		</table>
		<br>
		<br>
		<p style='
		font-size: 9.0pt;
		color: #ff6600;
		font-weight: bold;
		'>
		※此信件為系統自動發信，請勿直接回覆。
		</p>
		";//信件內容 
		
		if(mail("$to", "$subject", "$msg", "$headers"))
			echo "<!--信件已經發送成功！-->";//寄信成功就會顯示的提示訊息
		else
			echo "<!--信件發送失敗！-->";//寄信失敗顯示的錯誤訊息 
}
function sendMailToResetPassword($account,$resetcode){
		
		$verification = checkInput($verification);
		$account = checkInput($account);
		$name = checkInput($name);
		$phone = checkInput($phone);
		$ali_account = checkInput($ali_account);
		
		$sCharset="utf-8";
		$sMailHeaderFmt = '=?' . $sCharset . '?b?%s?=';
		$to = $account; //收件者 
		$sMailFrom = "mybee.admin@mybee.com";
		$headers = "MIME-Version: 1.0\r\n" .
            "Content-type: text/html; charset=$sCharset\r\n" .
            "From: $sMailFrom\r\n";
		$subject = "Mybee - Reset password"; //信件標題
		$subject = iconv('big5', $sCharset, $subject);
		$subject = sprintf($sMailHeaderFmt, base64_encode($subject));
		$msg = "
		<style>
		td{
			
		}
		</style>
		親愛的會員 您好: 
		<br>
		<br>
		您申請『Mybee有限公司』重置帳號密碼作業，請點擊以下的連結至密碼重置頁面，謝謝您! 
		<br>
		<br>
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr>
		<td style='
			font-family: arial,sans-serif;
			background-color: rgb(240, 90, 40);
			height: 30px;
			text-align: center;
			vertical-align: middle;
			color:#ffffff;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		點擊網頁連結，或複製後貼至瀏覽器網址列
		</td>
		</tr>
		<tr>
		<td style='
			width: 500px;
			height: 80px;
			font-family: arial,sans-serif;
			vertical-align: middle;
			text-align: center;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		<a href='http://mybee.com.tw/index.php?reset=$resetcode'>
		http://mybee.com.tw/index.php?reset=$resetcode</a>
		</td>
		</tr>
		</table>
		<br>
		<br>
		<p style='
		font-size: 9.0pt;
		color: #ff6600;
		font-weight: bold;
		'>
		※此信件為系統自動發信，請勿直接回覆。
		</p>
		";//信件內容 
		
		if(mail("$to", "$subject", "$msg", "$headers"))
			echo "<!--信件已經發送成功！-->";//寄信成功就會顯示的提示訊息
		else
			echo "<!--信件發送失敗！-->";//寄信失敗顯示的錯誤訊息 
}
function sendOpinionMail($email,$phone,$name,$context,$admin){
		
		$email = checkInput($email);
		$phone = checkInput($phone);
		$name = checkInput($name);
		$admin = checkInput($admin);
		$context = checkInput($context);
		$context = str_replace( "\\r\\n", "<br />",$context);  
		
		$sCharset="utf-8";
		$sMailHeaderFmt = '=?' . $sCharset . '?b?%s?=';
		$to = $admin; //收件者 
		$sMailFrom = "mybee.customer@mybee.com";
		$headers = "MIME-Version: 1.0\r\n" .
            "Content-type: text/html; charset=$sCharset\r\n" .
            "From: $sMailFrom\r\n";
		$subject = "Mybee - Customer advice"; //信件標題
		$subject = iconv('big5', $sCharset, $subject);
		$subject = sprintf($sMailHeaderFmt, base64_encode($subject));
		$msg = "
		<style>
		td{
			
		}
		</style>
		親愛的管理員 您好: 
		<br>
		<br>
		有人透過系統發送意見給您，請查收。
		<br>
		<br>
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr>
		<td style='
			font-family: arial,sans-serif;
			background-color: rgb(240, 90, 40);
			height: 30px;
			text-align: center;
			vertical-align: middle;
			color:#ffffff;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		顧客建議
		</td>
		</tr>
		<tr>
		<td style='
			width: 500px;
			height: 80px;
			font-family: arial,sans-serif;
			vertical-align: middle;
			text-align: left;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		$context
		</td>
		</tr>
		</table>
		<br>
		<br>
		發送者資料：<br>
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>姓名</td><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>$name</td></tr>
		<tr><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>手機號碼</td><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>$phone</td></tr>
		<tr><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>信箱</td><td style='
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>$email</td></tr>
		</table>
		<br>
		<br>
		<br>
		
		<p style='
		font-size: 9.0pt;
		color: #ff6600;
		font-weight: bold;
		'>
		※此信件為系統自動發信，請勿直接回覆。
		</p>
		";//信件內容 
		
		if(mail("$to", "$subject", "$msg", "$headers"))
			echo "<!--信件已經發送成功！-->";//寄信成功就會顯示的提示訊息
		else
			echo "<!--信件發送失敗！-->";//寄信失敗顯示的錯誤訊息 
}
function sendNoticeToAdminMail($context,$target){

		$sCharset="utf-8";
		$sMailHeaderFmt = '=?' . $sCharset . '?b?%s?=';
		$to = $target; //收件者 
		$sMailFrom = "mybee.customer@mybee.com";
		$headers = "MIME-Version: 1.0\r\n" .
            "Content-type: text/html; charset=$sCharset\r\n" .
            "From: $sMailFrom\r\n";
		$subject = "Mybee - Customer advice"; //信件標題
		$subject = iconv('big5', $sCharset, $subject);
		$subject = sprintf($sMailHeaderFmt, base64_encode($subject));
		$msg = "
		<style>
		td{
			
		}
		</style>
		親愛的管理員 您好: 
		<br>
		<br>
		使用者透過系統發送提醒給您，請查收。
		<br>
		<br>
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr>
		<td style='
			font-family: arial,sans-serif;
			background-color: rgb(240, 90, 40);
			height: 30px;
			text-align: center;
			vertical-align: middle;
			color:#ffffff;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		提醒內容
		</td>
		</tr>
		<tr>
		<td style='
			width: 500px;
			height: 80px;
			font-family: arial,sans-serif;
			vertical-align: middle;
			text-align: left;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		$context
		</td>
		</tr>
		</table>
		<br>
		<br>
		
		<p style='
		font-size: 9.0pt;
		color: #ff6600;
		font-weight: bold;
		'>
		※此信件為系統自動發信，請勿直接回覆。
		</p>
		";//信件內容 
		
		if(mail("$to", "$subject", "$msg", "$headers"))
			echo "<!--信件已經發送成功！-->";//寄信成功就會顯示的提示訊息
		else
			echo "<!--信件發送失敗！-->";//寄信失敗顯示的錯誤訊息 
}
function sendNoticeToCustomerMail($context,$target){

		$sCharset="utf-8";
		$sMailHeaderFmt = '=?' . $sCharset . '?b?%s?=';
		$to = $target; //收件者 
		$sMailFrom = "mybee.customer@mybee.com";
		$headers = "MIME-Version: 1.0\r\n" .
            "Content-type: text/html; charset=$sCharset\r\n" .
            "From: $sMailFrom\r\n";
		$subject = "Mybee - Customer advice"; //信件標題
		$subject = iconv('big5', $sCharset, $subject);
		$subject = sprintf($sMailHeaderFmt, base64_encode($subject));
		$msg = "
		<style>
		td{
			
		}
		</style>
		親愛的Mybee用戶 您好: 
		<br>
		<br>
		管理員透過系統發送提醒給您，請查收。
		<br>
		<br>
		<table style='
			border-collapse: separate;
			border-style: double;
			border-width: 1px;
			border-color: gray;
		'>
		<tr>
		<td style='
			font-family: arial,sans-serif;
			background-color: rgb(240, 90, 40);
			height: 30px;
			text-align: center;
			vertical-align: middle;
			color:#ffffff;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		提醒內容
		</td>
		</tr>
		<tr>
		<td style='
			width: 500px;
			height: 80px;
			font-family: arial,sans-serif;
			vertical-align: middle;
			text-align: left;
			border-style:solid;
			border-color: gray;
			border-width: 1px;
			padding:5px;
		'>
		$context
		</td>
		</tr>
		</table>
		<br>
		<br>
		
		<p style='
		font-size: 9.0pt;
		color: #ff6600;
		font-weight: bold;
		'>
		※此信件為系統自動發信，請勿直接回覆。
		</p>
		";//信件內容 
		
		if(mail("$to", "$subject", "$msg", "$headers")){}
			//echo "<!--通知信已發送成功！-->";//寄信成功就會顯示的提示訊息
		//else
			//echo "<!--信件發送失敗！-->";//寄信失敗顯示的錯誤訊息 
}
?>