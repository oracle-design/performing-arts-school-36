<?
  if($_GET['aid']=='')$_GET['aid']=1;
	$sql1 = "SELECT * FROM topic WHERE id = ".$_GET['aid'];
	$result1 = exe_sql(DATABASE, $sql1);
  
	$sql = "SELECT * FROM title WHERE id = ".$_GET['aid'];
	$result = exe_sql(DATABASE, $sql);
?>

<div class="about_content_wrapper">
	
  <div class="content_title" style="padding:8px;">
    <h3>
	<input type="hidden" name="id" value="<?echo $_GET['aid'];?>">
    <input type="text" style="font-size:<?echo $result1[0]['size'];?>px;" placeholder="Content Title" name="title" value="<?echo $result1[0]['title'];?>">
    <select name="size">
		<option value="45" <?if($result1[0]['size']==45){echo "selected";}?>>Big</option>
		<option value="35" <?if($result1[0]['size']==35){echo "selected";}?>>Mediem</option>
		<option value="25" <?if($result1[0]['size']==25){echo "selected";}?>>Small</option>
    </select>
    </h3>	
    <h4><input type="text" style="font-size:20px;" placeholder="Subtitle" name="subtitle" value="<?echo $result[0]['subtitle'];?>"></h4>
  </div>
  <div class="content" style="padding:8px;width:100%;height:auto;">
    <div style="float:left;width:25%;margin:10px;">
      <img src="./img/<?echo $result[0]['filename'];?>" style="width:300px;height:300px;">
      <Br>
      <Br>
      <input type="file" name="filename">
    </div>
    <div style="float:left;width:70%;height:300px;margin:10px;">
      <textarea id="input" name="text" style="height:300px;"><?echo $result[0]['text'];?></textarea>
      <input type="submit" name="submit" value="送出" style="margin:10px;width:70px;">
      <input type="reset" style="margin:10px;width:70px;">
      <span style="color:red;"><?echo $statusMsg;?></span>
    </div>
    <div style="clear:both"></div>
  </div>

</div>
