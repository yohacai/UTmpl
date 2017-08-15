(function(){
	var ifRegx = /\{%\s*if\s+([^}]*)\}/igm
	var elseIfRegx = /\{%\s*else\s?if\s+([^}]*)\s*\}/igm
	var elseRegx = /\{%\s*else\s*\}/igm
	var endIfRegx = /\{%\s*\/if\s*\}/igm
	var forRegx = /\{%\s*for\s+([\$_a-zA-Z][\$_\w]*)(?:,([\$_a-zA-Z][\$_\w]*))?\s+in\s+([^}\s]+)\s*\}/igm
	var endforRegx = /\{%\s*\/for\s*\}/igm
	var startVarsRegx = /\{\{/igm
	var endVarsRegx = /\}\}/igm
	var UTmpl = function( template, data ){
		template = template.replace(ifRegx, function($, statement){
			return `';if(${statement}){
				_s += '
			`
		})
		.replace(elseIfRegx,function($,statement){
			return `';}else if (${statement}){
				_s += '
			`	 
		})
		.replace(elseRegx,function($){
			return `'}else{
				_s += '
			`	
		})
		.replace(endIfRegx,function($,statement){
			return "';}_s+='"
		})
		.replace(forRegx,function($,a,b,c){
			return `';for(var ${b || 'index'} in ${c}){
				var ${a} = ${c}[${b || 'index'}];
				_s += '
			`
		})
		.replace(endforRegx,function($){
			return `';}_s+='`
		})
		.replace(startVarsRegx,"'+(")
		.replace(endVarsRegx,")+'")
		.replace(/[\r\n\t]/igm,'')
		template = "var _s = '';_s+='" + template + "';return _s;";
		var render =  new Function('data',template)
		return render
	}
	this.UTmpl = UTmpl;
})()