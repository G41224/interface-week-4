
	
	function $(x){
		var element = document.getElementById(x);
		return element;
	}
	
	// drop menu option
	function dropMenu() {
		var tags = document.getElementById("addressForm"),
			selectLi=$("select"),
			makeSelec = document.createElement("select");
		makeSelec.setAttribute("id", "groups");
		for (var i=0, j=states.length; i<j; i++){
			var makeOpt = document.createElement("option");
			var optText = states[i];
			makeOpt.setAttribute("value", optText);
			makeOpt.innerHTML = optText;
			makeSelec.appendChild(makeOpt)
		}
		selectLi.appendChild(makeSelec);
	}
	// radio function
	
	function radioSelect(){
		var radio = document.forms[0].addType;
		for(var i = 0; i<radio.length; i++){
			if(radio[i].checked){
			addTypeValue = radio[i].value;
			}
		}
	}
	// checkbox function
	function checkSelect(){
		var check = document.forms[0].weekday;
		for(var i = 0; i<check.length; i++){
			if(check[i].checked){
			dilivDayValue = check[i].value;	
			}
		}
	}
	
	
	//toggel control
	
	function toggleControl(n){
		switch(n){
			case "on":
				$("addressForm").style.display = "none";
				$("clearStorage").style.display = "inline";
				$("displyAdd").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("addressForm").style.display = "block";
				$("clearStorage").style.display = "inline";
				$("displyAdd").style.display = "inline";
				$("addNew").style.display = "none";
				$("listItems").style.display = "none";
				break;
			default:
			return false;
			
		}
		
		
	}
	
	// store data function
	
	
	function store(key){
		if(!key){
		var id = Math.floor(Math.random()*10000001);
		}else{
			id = key;
		}
		radioSelect();
		checkSelect();
		var listItem = {};
			listItem.fName =       ["First Name:", $("fName").value];
			listItem.lName =       ["Last Name:", $("lName").value];
			listItem.sAddress =    ["Street:", $("sAddress").value];
			listItem.city =        ["City:", $("city").value];
			listItem.state =       ["State:", $("state").value];
			listItem.zip =         ["Zip Code:", $("zip").value];
			listItem.addressType = ["Address Type:", addTypeValue];
			listItem.dilivDay =    ["Dilivery Day:",dilivDayValue];
			listItem.note =        ["Note:", $("note").value];
			
			localStorage.setItem(id, JSON.stringify(listItem));
			alert("Address Saved!");
			
	}
	
	// display data function
	function getStorage (){
		toggleControl("on");
		if(localStorage.length === 0){
			alert("there is no data so I added some for you");
			autoFill();
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "listItems");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("listItems").style.display = "block";
		for(var i = 0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li")
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//turns string back to object
			var object = JSON.parse(value);
			var makeSubLi = document.createElement("ul");
			makeLi.appendChild(makeSubLi);
			for( var n in object){
				var makeSubList = document.createElement("li");
				makeSubLi.appendChild(makeSubList);
				var objSubText = object[n][0] +" "+object[n][1];
				makeSubList.innerHTML = objSubText;
				makeSubLi.appendChild(linksLi);
			}
		makeItemLinks(localStorage.key(i), linksLi);
			
		}
		
		
	}
	function autoFill(){
		for(var n in json){
			var id = Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
			
		}
		
	}
	
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Address";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Address";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControl("off");
		
		$("fName").value = item.fName[1];
		$("lName").value = item.lName[1];
		$("sAddress").value = item.sAddress[1];
		$("city").value = item.city[1];
		$("state").value = item.state[1];
		$("zip").value = item.zip[1];
		/*var radios = document.forms[0].addType
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "house" && item.addType[1] =="house"){
				radios[i].setAttribute("checked", "checked")
			}else if (radios[i].value == "aprt" && item.addtype[1] =="aprt"){
				radios[i].setAttribute("checked", "checked")
			 }
		}*/

		$("note").value = item.note[1];
		
		submit.removeEventListener("click", store);
		$("submit").value = "edit Address";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
		
	}
	
	function clearData () {
	  if(localStorage.length === 0){
	  alert("no data")
	  }else{ 
	  	localStorage.clear();
	  	alert("addresses deleted!");
	  	window.location.reload();
	  	return false;
	   }
	}
	
	function validate(e){
		var getFname = $("fName");
		var getLname = $("lName");
		var getSaddress = $("sAddress");
		var getCity = $("city");
		var getState = $("state");
		var getZip = $("zip");
		
		errMsg.innerHTML = "";
			getFname.style.border = "1px solid black";
			getLname.style.border = "1px solid black";
			getSaddress.style.border = "1px solid black";
			getCity.style.border = "1px solid black";
			getState.style.border = "1px solid black";
			getZip.style.border = "1px solid black";

		
		var messageAry = [];
		
		if(getFname.value === ""){
			var fNameError = "enter First name";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		
		if(getLname.value === ""){
			var lNameError = "enter Last name";
			getLname.style.border = "1px solid red";
			messageAry.push(lNameError);
		}
		
		if(getSaddress.value === ""){
			var sAddressError = "enter Street";
			getSaddress.style.border = "1px solid red";
			messageAry.push(sAddressError);
		}
		
		if(getCity.value === ""){
			var cityError = "enter City";
			getCity.style.border = "1px solid red";
			messageAry.push(cityError);
		}
		
		if(getState.value === "--state--"){
			var stateError = "enter state";
			getState.style.border = "1px solid red";
			messageAry.push(stateError);
		}
		
		if(getZip.value === ""){
			var zipError = "enter Zip Code";
			getZip.style.border = "1px solid red";
			messageAry.push(zipError);
		}
		if(messageAry.length >= 1){
			for(var i=0,j=messageAry.length; i<j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{ 
		store(this.key);
		 }
		
	}
	
	function deleteItem (){
		var ask = confirm("are you sure");
		if(ask){
			localStorage.removeItem(this.key);
			alert("address Deleted")
			window.location.reload();
		}else{
			alert("address not deleted")
		}
		
	}
	
	
	
	var states = [],//states input here
		addTypeValue,
		dilivDayValue,
		errMsg = $("error")
		;
	
	var displayAdd = $("displyStorage");
	displyAdd.addEventListener("click", getStorage);
	var clearAdd = $("clearStorage");
	clearAdd.addEventListener("click", clearData);
	var submit = $("submit");
	submit.addEventListener("click", validate);
	
	
	
	
	
	
	
	

