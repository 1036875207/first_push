var firstName=["Lily","Saber","Jack","Rose"];
var LastName=["","A","B","C","D"];
var id;
$(document).ready(function(){
	var ws;
	$(".more").mouseover(function(e){
		$(".blank").animate({top:'100px'},"fast");
	})
	function initialize() {
		// 随机匹配名字，id
		var name=LastName[parseInt(Math.random()*LastName.length)]+firstName[parseInt(Math.random()*firstName.length)];
		var date=new Date();
		id=date.getHours()+date.getMinutes()+date.getSeconds()+parseInt(Math.random()*10);
		//建立通讯
		ws= new WebSocket('ws://106.14.123.168:8083/');
		sendUserAdd('我加入了群聊');
		addMessage('小明','你好')
		ws.onopen = function() {
			document.body.style.backgroundColor = '#cfc';
			ws.send(name);
			ws.send(id);
		};
		ws.onclose = function() {
			document.body.style.backgroundColor = null;
		};

		ws.onmessage = function(event) {
			var json=JSON.parse(event.data);
			switch(json.code){

				case 0:
					sendUserAdd(json.message);
					break;
				case 1:
					addMessage(json.name,json.message);
					break;

			}
		};
	}
	
	$(".send_button").click(function(e){
		//console.log(JSON.parse('{"name":12333}').name);
		ws.send(id+":"+$("#talk_input").val());
	
	})

	//用户加入
	function sendUserAdd(message){

		$(".blank").append('<div class="user_add">'+message+'</div>');
	}

	//广播信息添加
	function addMessage(name,message){
		
		$(".blank").append('<div class="other_talk"><i class="head_0">'+name+'</i><div class="matter">'+message+'</div></div>');

	}
	initialize();

});
