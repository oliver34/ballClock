var CANVAS_WIDTH = 1111,CANVAS_HEIGHT = 500,
	RADIUS = 8,
	MARGIN_TOP = 60,MARGIN_LEFT = 30,
	CUR_SHOWTIME_SECONDS = 0;

var balls = [],endTime = new Date(),
	OPTION = 2;//操作（1--倒计时；2--时间）
endTime.setTime(endTime.getTime()+3600*1000);

const colors = ["#3399cc","#33ff33","#FF8C00","#7A67EE","#3A5FCD","#CD3700","#6666cc","#cc3333","#000000","#003399"];

window.onload = function(){
	var clock = document.getElementById("clock");
	var context = clock.getContext("2d");
	
	CANVAS_WIDTH = document.documentElement.clientWidth;
	CANVAS_HEIGHT = document.documentElement.clientHeight;
	MARGIN_LEFT = Math.round(CANVAS_WIDTH/10);
	MARGIN_TOP = Math.round(CANVAS_HEIGHT/5);
	RADIUS = Math.round(CANVAS_WIDTH*4/5/108)-1;

	clock.width = CANVAS_WIDTH;
	clock.height = CANVAS_HEIGHT;
	CUR_SHOWTIME_SECONDS = getCurentSec(OPTION);
	setInterval(
		function(){
			render(context);
			update();
		},50
	);
};

function update(){
	var nextSecon = getCurentSec(OPTION),
		nextHours = parseInt(nextSecon/3600),
		nextMinites = parseInt((nextSecon-nextHours*3600)/60),
		nextSecondes = nextSecon%60,
		cuHours = parseInt(CUR_SHOWTIME_SECONDS/3600),
		cuMinites = parseInt((CUR_SHOWTIME_SECONDS-cuHours*3600)/60),
		cuSecondes = CUR_SHOWTIME_SECONDS%60;
	
	//时间改变
	if(nextSecon!=cuSecondes){
		if(parseInt(cuHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(cuHours/10));
		}
		if(parseInt(cuHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(cuHours%10));
		}
		if(parseInt(cuMinites/10)!=parseInt(nextMinites/10)){
			addBalls(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,parseInt(cuMinites/10));
		}
		if(parseInt(cuMinites%10)!=parseInt(nextMinites%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(cuMinites%10));
		}
		if(parseInt(cuSecondes/10)!=parseInt(nextSecondes/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(cuSecondes/10));
		}
		if(parseInt(cuSecondes%10)!=parseInt(nextSecondes%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(cuSecondes%10));
		}
		CUR_SHOWTIME_SECONDS = nextSecon;
	}
	updateBalls();
};

function updateBalls(){
	var clock = document.getElementById("clock");
	for(var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		//碰撞检测
		if(balls[i].y >= CANVAS_HEIGHT-RADIUS){
			balls[i].y = CANVAS_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.55;
		}
	}
	var count = 0;
	for(var i = 0; i < balls.length; i++){
		if(balls[i].x+RADIUS<=0 || balls[i].x-RADIUS >= CANVAS_WIDTH){
			balls.splice(i--,1);
		}
	}
};

function addBalls(x,y,num){
	for(var i = 0; i<digit[num].length; i++){
		for(var j = 0; j<digit[num][i].length; j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),//加速度
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//水平速度
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
};

function getCurentSec(option){
	var curTime = new Date(),
		retTime = "";
	if(option == 1){
		retTime = endTime.getTime()-curTime.getTime();
		retTime = Math.round(retTime/1000);
		return retTime>=0?retTime:0;
	}else{
		retTime = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
		return retTime;
	}
};

function render(context){
	context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	var hours = parseInt(CUR_SHOWTIME_SECONDS/3600),
		minites = parseInt((CUR_SHOWTIME_SECONDS-hours*3600)/60),
		secondes = CUR_SHOWTIME_SECONDS%60;
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),context);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),context);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,context);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minites/10),context);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minites%10),context);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,context);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(secondes/10),context);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(secondes%10),context);

	//绘制小球
	for(var i=0;i<balls.length;i++){
		context.fillStyle = balls[i].color;
		context.beginPath();
		context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		context.closePath();
		context.fill();
	}
};

function renderDigit(x,y,num,context){
	context.fillStyle = "#3399cc";
	for(var i = 0; i<digit[num].length; i++){
		for(var j = 0; j<digit[num][i].length; j++){
			if(digit[num][i][j]==1){
				context.beginPath();
				context.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI,false);
				
				context.fill();
				context.closePath();
			}
		}
	}
};

function resetOption(option){
	OPTION=option;
	balls=[];
	if(option==2){
		endTime.setTime(new Date().getTime()+3600*1000);
	}
};