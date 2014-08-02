title: multipart/form-data
tags: [formData]
categories: HTTP
---

几种常见的Content-Type类型
--------------------------

值|	描述
--|------
application/x-www-form-urlencoded|	在发送前编码所有字符（默认）
multipart/form-data|不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
text/plain|	空格转换为 "+" 加号，但不对特殊字符编码。

multipart/form-data
-------------------

 1. `multipart/form-data`的基础方法是`post`
 2. 与`post`不同之处：请求头，请求体
 3. 请求头必须包含一个特殊的头信息`Content-Type`,且其值也必须规定为`multipart/form-data`,同时还需要规定一个内容分隔符，用于分割多个`post`的内容

    ```
    Content-Type: multipart/form-data; boundary=${bound}
    ``` 

    其中`${bound}` 是一个占位符，代表我们规定的分割符，可以自己任意规定，但为了避免和    正常文本重复了，尽量要使用复杂一点的内容。如：`--------------------56423498738365`
 4. `multipart/form-data`的请求体也是一个字符串，不过和`post`的请求体不同的是它的构造方式，`post`是简单的`name=value`值连接，而`multipart/form-data`则是添加了分隔符等内容的构造体。
 
```
--${bound}  
Content-Disposition: form-data; name="Filename"  
  
HTTP.pdf  
--${bound}  
Content-Disposition: form-data; name="file000"; filename="HTTP协议详解.pdf"  
Content-Type: application/octet-stream  
  
%PDF-1.5  
file content  
%%EOF  
  
--${bound}  
Content-Disposition: form-data; name="Upload"  
  
Submit Query  
--${bound}--  
```

如果传送的内容是一个文件的话，那么还会包含文件名信息，以及文件内容的类型。上面的第二个小部分其实是一个文件体的结构，最后会以--分割符--结尾，表示请求体结束。

FormDate
--------------

http://www.ietf.org/rfc/rfc2388.txt

XMLHTTPRequest Level 2 添加的新接口`FormDate`

**最大优点：异步上传一个二进制文件**

### 构造函数

```
new FormDate(optional HTMLFormElement form)
```

- **form :** (可选) 一个HTML表单元素,可以包含任何形式的表单控件,包括文件输入框.
 
### 方法

```
append()
```

给当前FormData对象添加一个键/值对.

```
void append(DOMString name, Blob value, optional DOMString filename);
void append(DOMString name, DOMString value);
```

- **name :** 字段名称.
- **value :** 字段值.可以是,或者一个字符串,如果全都不是,则该值会被自动转换成字符串.
- **filename :** (可选) 指定文件的文件名,当value参数被指定为一个Blob对象或者一个File对象时,该文件名会被发送到服务器上,对于Blob对象来说,这个值默认为"blob".

### 兼容

#### Desktop

Feature	|Chrome	|Firefox (Gecko)	|Internet Explorer	|Opera	|Safari
--------|-------|-------------------|-------------------|-------|------
Basic |support	|7+	|4.0 (2.0)	|10+	|12+	|5+
支持filename参数	|(Yes)	|22.0 (22.0)	|?	|?	|?

#### Mobile
------
Feature	|Android	|Chrome for Android	|Firefox Mobile (Gecko)	|IE Mobile	|Opera Mobile	|Safari Mobile
--------|-----------|-------------------|-----------------------|-----------|-------------|--------------
Basic support	|3.0	|?	|4.0 (2.0)	|?	|12+    |?
支持filename参数	|?	|?	|22.0 (22.0)	|?	|?	|?

> **Gecko附注:**

> 在Gecko 7.0 (Firefox 7.0 / Thunderbird 7.0 / SeaMonkey 2.4)之前,如果你将Blob对象作为数据添加到一个`FormData`对象中,则在使用`Ajax`将这个`FormData`对象提交到服务器上时,所发送的HTTP请求头中代表那个`Blob`对象所包含文件的文件名称的`"Content-Disposition"`请求头的值会是一个空字符串,这会引发某些服务器程序上的错误.从Gecko 7.0开始,这种情况下发送的文件名称改为"blob"这个字符串.

### 使用FormData对象

利用`FormData`对象,你可以使用一系列的键值对来模拟一个完整的表单,然后使用`XMLHttpRequest`发送这个"表单".

#### 创建一个FormData对象

```
    <form action="" id="myFormElement">
		<input type="text" name="title">
		<input type="text" name="age">
		<a href="javascript:;" id="submit">发送</a>
	</form>
	<script>
	var sendBtn = document.getElementById("submit");
	sendBtn.onclick = function(){
		var formElement = document.getElementById("myFormElement");
		formData = new FormData(formElement);
		formData.append("serialnumber", "123");
		var oReq = new XMLHttpRequest();
		oReq.open("POST", "upload.php");
		oReq.send(formData);
	}
	</script>
```

#### 使用FormData对象发送文件

```
    <form enctype="multipart/form-data" method="post" name="fileinfo">
        <label>Your email address:</label>
        <input type="email" autocomplete="on" autofocus name="userid" placeholder="email" required size="32" maxlength="64" />
        <br />
        <label>Custom file label:</label>
        <input type="text" name="filelabel" size="12" maxlength="32" />
        <br />
        <label>File to stash:</label>
        <input type="file" name="file" required />
    </form>
    <div id="output"></div>
    <a href="javascript:sendForm()">Stash the file!</a>


    <script>
    function sendForm() {
        var oOutput = document.getElementById("output");
        var oData = new FormData(document.forms.namedItem("fileinfo"));

        oData.append("CustomField", "This is some extra data");

        var oReq = new XMLHttpRequest();
        oReq.open("POST", "upload.php", true);
        oReq.onload = function(oEvent) {
            if (oReq.status == 200) {
                oOutput.innerHTML = "Uploaded!";
            } else {
                oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
            }
        };

        oReq.send(oData);
    }
    </script>
```

#### 使用jQuery来发送FormData

```
var fd = new FormData(document.getElementById("fileinfo"));
fd.append("CustomField", "This is some extra data");
$.ajax({
  url: "stash.php",
  type: "POST",
  data: fd,
  processData: false,  // 告诉jQuery不要去处理发送的数据
  contentType: false   // 告诉jQuery不要去设置Content-Type请求头
  /** 
  *必须false才会自动加上正确的Content-Type 
  */  
  contentType:false,  
  /** 
  * 必须false才会避开jQuery对 formdata 的默认处理 
  * XMLHttpRequest会对 formdata 进行正确的处理 
  */  
  processData:false  
});
```