var can = document.getElementById("can"),
	can1 = document.getElementById("can1")
	can2 = document.getElementById("can2");
/*绘制矩形*/
var context = can.getContext("2d"),
	context1 = can1.getContext("2d"),
	context2 = can2.getContext("2d");

context.fillStyle = "rgba(0, 134, 139, 0.5)";
context.fillRect(10,10,100,100);

context.fillStyle = "rgba(204, 0, 0, 0.5)";
context.fillRect(30,30,100,100);
context.clearRect(60,60,10,10);

context.strokeStyle = "rgba(204, 0, 0, 0.5)";
context.strokeRect(160,10,100,100); 

context.strokeStyle = "rgba(0, 134, 139, 0.5)";
context.strokeRect(180,30,100,100); 

/*绘制路径*/
//外圆
context1.beginPath();
context1.arc(100,100,99,0,2*Math.PI,false);
//内圆
context1.moveTo(194,100);
context1.arc(100,100,94,0,2*Math.PI,false);
//时针
context1.moveTo(100,100);
context1.lineTo(35,100);
//分针
context1.moveTo(100,100);
context1.lineTo(80,15);

context1.stroke();

context1.drawImage(can,100,200,200,300);

//七巧板
var cardArray = [
	{point:[{x:0,y:0},{x:0,y:400},{x:200,y:200}],color:"rgba(0, 134, 139, 0.5)"},
	{point:[{x:0,y:0},{x:400,y:0},{x:200,y:200}],color:"rgba(204, 255, 0, 0.5)"},
	{point:[{x:0,y:400},{x:100,y:300},{x:200,y:400}],color:"rgba(0, 102, 153, 0.5)"},
	{point:[{x:200,y:200},{x:300,y:300},{x:200,y:400},{x:100,y:300}],color:"rgba(0, 51, 51, 0.5)"},
	{point:[{x:400,y:400},{x:400,y:200},{x:200,y:400}],color:"rgba(204, 51, 51, 0.5)"},
	{point:[{x:200,y:200},{x:300,y:100},{x:300,y:300}],color:"rgba(153, 153, 204, 0.5)"},
	{point:[{x:400,y:0},{x:300,y:100},{x:300,y:300},{x:400,y:200}],color:"rgba(238, 154, 0, 0.5)"},
];
can2.width = 400;
can2.height = 400;
var cardPoint = null;
for(var i=0;i<cardArray.length;i++){
	cardPoint = cardArray[i].point;
	context2.beginPath();
	context2.moveTo(cardPoint[0].x,cardPoint[0].y);
	for(var j=1;j<cardPoint.length;j++){
		context2.lineTo(cardPoint[j].x,cardPoint[j].y);
	}
	context2.lineTo(cardPoint[0].x,cardPoint[0].y);
	context2.fillStyle = cardArray[i].color;
	context2.fill();
	context2.closePath();
};