$(function () {
	var localRes = window.localStorage.getItem("localRes");
	if (localRes == null || localRes == "") {
		alert("提示：\r\r按键盘左右键来控制“绿-蓝”块转动\r\r\r小球与相同颜色相遇得分\r\r反之游戏结束");
		init();
	} else {
		$(".msak .msg").text("Start");
		$(".msak .localRes").text("历史最高分：" + localRes + "分");
		$(".msak").show();
	}
	$(".msak>a").click(function () {
		$(".msak").hide();
		$(".result i").text(0);
		$(".biu-top,.biu-bottom").remove();
		$("#content").removeClass("gameOver");
		init();
	});
	function init() {
		var resultNum = 1,
			animateTime = 1000;
		var biuTimer = window.setInterval(function () {
			var randomNum = parseInt(Math.random() * 100 % 2);
			var classz = parseInt(Math.random() * 100 % 2) ? " blue" : " green";
			if (randomNum) {
				var biuSpan = $("<span/>", { "class": "biu-top" + classz });
				biuSpan.appendTo($(".main"));
				biuSpan.animate({
					"top": "451px"
				}, animateTime, "linear", function () {
					if (($("#content").hasClass("transformX") && classz.indexOf("blue") >= 0) || $("#content").hasClass("transformY") && classz.indexOf("green") >= 0) {
						InitGameOver(resultNum++);
						$(this).remove();
					} else {
						gameOvers({
							thiz: $(this),
							timer: biuTimer
						});
					}
				});
			} else {
				var biuSpan = $("<span/>", { "class": "biu-bottom" + classz });
				biuSpan.appendTo($(".main"));
				biuSpan.animate({
					"top": "531px"
				}, animateTime, "linear", function () {
					if (($("#content").hasClass("transformX") && classz.indexOf("green") >= 0) || $("#content").hasClass("transformY") && classz.indexOf("blue") >= 0) {
						InitGameOver(resultNum++);
						$(this).remove();
					} else {
						gameOvers({
							thiz: $(this),
							timer: biuTimer
						});
					}
				});
			}
		}, 900)

		function gameOvers(obj) {
			window.clearInterval(obj.timer);
			$(".biu-top,.biu-bottom").stop();
			$(obj.thiz).css({ "box-shadow": "0px 0px 20px 6px #ffab12" });
			$(".msak").show();
			$("#content").addClass("gameOver");
			$(document).unbind("keydown");
		}
		function InitGameOver(res) {
			$(".result i").text(res);
			setResult(res);
			$(".msak .msg").text("Game Over!");
			$(".msak .res").text("得分：" + res + "分");
			var localRes = window.localStorage.getItem("localRes");
			$(".msak .localRes").text("历史最高分：" + localRes + "分");
		}

		function setResult(res) {
			var localRes = window.localStorage.getItem("localRes");
			if (localRes == null || localRes == "") {
				window.localStorage.setItem("localRes", res);
			} else {
				if (Number(localRes) < Number(res)) {
					window.localStorage.setItem("localRes", res);
				}
			}
		}

		window.setInterval(function () {
			animateTime -= 20;
		}, 1000);

		$(document).keydown(function (event) {
			var keyCode = event.keyCode;
			/* Act on the event */
			if (keyCode == 38 || keyCode == 37) {
				$("#content").removeClass().addClass("transformY");
			} else if (keyCode == 40 || keyCode == 39) {
				$("#content").removeClass().addClass("transformX");
			}
		});
	}





	function init() {
		$('.screen').typeIt({
			whatToType: [
				"放心，你扫的二维码并不含病毒，也不损坏你的手机，这只是个恶作剧而已。",
				"Be relax please , the qrcode can not destroy your phone and it's just a joke",
				"-.-.-.-.-.-.-.-.-.-.-.-.-.-",
				"ssh root@hamm.cn",
				"root@hamm.cn's password:　******　",
				"LAST LOGIN IN 2018-09-18 10:53:29 ON IP 129.29.29.29",
				"[root@Hamm_cn ~]# cd /home/wwwroot/",
				"[root@Hamm_cn ~]# vi Hamm.js",
			],
			typeSpeed: 10,
			showCursor: false,
			breakWait: 500,
		}, function () {
			setTimeout(function () {
				$(".screen").empty();
				$('.screen').typeIt({
					whatToType: [
						"console.log(\"Data has been loaded!\");",
						"var Hamm = {",
						"　　nick : 'Hamm',",
						"　　birth : '1991.10',",
						"　　address : 'ChongQing',",
						"　　codeList : [",
						"　　　　'PHP','NodeJS','Javascript',",
						"　　　　'C#','JAVA','Swift'",
						"　　],",
						"　　platform : [",
						"　　　　'MacOS','Centos','Ubuntu',",
						"　　　　'Windows','Android','iOS'",
						"　　],",
						"　　contact : {",
						"　　　　'email' : 'admin@hamm.cn',",
						"　　　　'qq' : '455250574',",
						"　　　　'wechat' : 'majhamm',",
						"　　},",
						"　　sites : {",
						"　　　　'homepage' : 'hamm.cn',",
						"　　　　'weibo' : 'weibo.com/800700678',",
						"　　　　'gitee' : 'gitee.com/hamm'",
						"　　},",
						"　　projects : [",
						"　　　　'wechat platform','website',",
						"　　　　'ai robot','pano project'",
						"　　],",
						"　　hobbies : [",
						"　　　　'digital product','coding',",
						"　　　　'driving','pets','photos',",
						"　　　　'travel','game','basketball'",
						"　　],",
						"};",
						"console.log(Hamm);",
					],
					typeSpeed: 20,
				}, function () {

				});
			}, 1000);
		});

	}
	// loading();
	var width = 0;

	function loading() {
		width += parseInt(Math.random() * 10);
		if (width > 100) {
			width = 100;
			$(".loading").fadeOut(function () {
				init();
			});
		} else {
			setTimeout(function () {
				loading();
			}, parseInt(Math.random() * 200) + 10);
		}
		$(".loading-item").css('width', width + "%");
	}
})
