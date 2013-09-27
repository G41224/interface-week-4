/**
 * @author Zac Croasmun
 */
var parseAddForm = function (data) {
  
  console.log(data);
};

$(document).ready(function(){
	
	
	var addForm = $("#shippingAddress"),
		addErrLink = $("#addErrLink")
	;
	
	addForm.validate({
		invalidHandler: function(form, validator){
			addErrLink.click();
			var html = "";
			for(var key in validator.submitted){
				var label = $("label[for^='"+key+"']").not("[generated]");
				var legend = label.closest("fieldset").find(".ui-controlgroup-label");
				var fieldName = legend.lenght ? legend.text() : label.text();
				html += "<li>" + fieldName + "</li>";
			};
			$("#addressErrors ul").html(html);
			
		},
		submitHandler: function(){
			var data = addForm.serializeArray();
			parseAddForm(data);
			
			}
		
		
	});
	
});
