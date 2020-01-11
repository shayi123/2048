window.onload=function () {
    //是否产生新元素
    var isNewRndItem = false;
    //最高分
    var maxScore = 0;
    //当前得分
    var gameScore = 0;

    if (localStorage.maxScore){
        maxScore = localStorage.maxScore - 0;
    }else {
        maxScore = 0;
    }

    gameInit();

    //游戏初始化
    function gameInit() {
        //初始化最高分
        document.getElementById("maxScore").innerHTML=maxScore;
        //初始化得分
        document.getElementById("gameScore").innerHTML=gameScore;
        //刷新按钮绑定刷新事件
        document.getElementById("refreshBtn").onclick=gameRefresh;
        //产生新元素1
        newItem();
        //产生新元素2
        newItem();
        //刷新颜色
        refreshColor();

    }

    //重新开始游戏
    function gameRefresh() {
        //将所有单元格的nonEmptyItem样式清除并且数值清空
        var items=document.getElementsByClassName('item');
        for(var i=0;i<items.length;i++){
            items[i].innerHTML='';
            items[i].classList.remove('nonEmptyItem');
            items[i].classList.add('emptyItem');
        }

        //将分数重置为score
        gameScore=0
        document.getElementById('gameScore').innerHTML=gameScore;
//		document.getElementById('highestScore').innerHTML=localStorage.maxScore;

        //调用两次生成随机元素的函数
        newItem();
        newItem();

        //刷新颜色
        refreshColor();

    }
    //监听方向键
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37://左方向键
                console.log("左移动");
                isNewRndItem=false;//不用产生新元素
                move("left");//向左移动
                isGameOver();//判断是否游戏结束
                break;
            case 38://上方向键
                console.log("上移动");
                isNewRndItem=false;//不用产生新元素
                move("up");//向上移动
                isGameOver();//判断是否游戏结束
                break;
            case 39://右方向键
                console.log("右移动");
                isNewRndItem=false;//不用产生新元素
                move("right");//向右移动
                isGameOver();//判断是否游戏结束
                break;
            case 40://下方向键
                console.log("下移动");
                isNewRndItem=false;//不用产生新元素
                move("down");//向下移动
                isGameOver();//判断是否游戏结束
                break;
        }
    }
    
    function move(direction) {
        //根据方向移动item
        //获取所有非空元素
        var items = document.getElementsByClassName("nonEmptyItem");
        //move left or up
        if (direction == 'left' || direction == 'up'){
            for (var i = 0; i<items.length; i++){
                var current = items[i];
                moveItem(current, direction);
            }
        }
        //move right or down
        if (direction == 'right' || direction == 'down'){
            for (var i = items.length-1; i>=0; i--){
                var current = items[i];
                moveItem(current, direction);
            }

        }

        //产生新元素
        if(isNewRndItem){
            newItem();
            refreshColor();
        }

        
    }

    //移动元素
    function moveItem(current, direction) {
        var sideItem=getSideItem(current,direction);
       // console.log("slide item "+sideItem[0].innerHTML);
        if(sideItem.length == 0){
            //表示current已经触达该方向的边界 不动 可否用null来判断？？

        }else if (sideItem[0].innerHTML == ''){
            //current移动到side
            sideItem[0].innerHTML = current.innerHTML;
            sideItem[0].classList.add('nonEmptyItem');
            sideItem[0].classList.remove('emptyItem');

            current.innerHTML = '';
            current.classList.add('emptyItem');
            current.classList.remove('nonEmptyItem');
            //递归移动到触底
            moveItem(sideItem[0], direction);
            //并产生新item去玩耍
            isNewRndItem = true;
        }else if(sideItem[0].innerHTML != current.innerHTML){
            //与旁边元素内容不同,不需要动

        }else{
            //与旁边元素内容相同，合并
            //为什么这里有return
            sideItem[0].innerHTML = (current.innerHTML - 0)*2;
            current.innerHTML = '';
            current.classList.add('emptyItem');
            current.classList.remove('nonEmptyItem');
            //递归移动到底
            moveItem(sideItem[0],direction);
            //更新分数
            gameScore += (sideItem[0].innerHTML - 0)*10;
            maxScore = maxScore<gameScore ? gameScore : maxScore;
            document.getElementById("gameScore").innerHTML = gameScore;
            document.getElementById("maxScore").innerHTML = maxScore;
            localStorage.maxScore=maxScore;//更新存储中的最高分数
            isNewRndItem = true;
            return;
        }
        
    }

    //根据当前元素获取旁边元素
    function getSideItem(currentItem,direction) {
        //确定当前元素的位置
        var currentItemX = currentItem.getAttribute('x')-0;
        var currentItemY = currentItem.getAttribute('y')-0;

        //根据方向获取旁边元素的位置
        //x表示行，y表示列
        switch (direction) {
            case 'left':
                var sideItemX = currentItemX;
                var sideItemY = currentItemY - 1;
                break;
            case 'right':
                var sideItemX = currentItemX;
                var sideItemY = currentItemY + 1;
                break;
            case 'up':
                var sideItemX = currentItemX - 1;
                var sideItemY = currentItemY;
                break;
            case 'down':
                var sideItemX = currentItemX + 1;
                var sideItemY = currentItemY;
                break;
        }
        var sideItem=document.getElementsByClassName("x"+sideItemX+"y"+sideItemY);
//		console.log(currentItem);
        console.log(sideItem);
        return sideItem;
    }
    //游戏结束
    function isGameOver() {
        
    }

    //产生新元素
    function newItem() {
        //创建包含2，4的数组
        var numArr = [2,2,4];
        //产生随机数字
        var num = numArr[Math.floor(Math.random()*3)];
        console.log("新产生的元素是"+num);
        //获取所有empty位
        var emptyItems = document.getElementsByClassName("emptyItem");
        //随机选取empty位的下标
        var aimEmpty = Math.floor(Math.random()*(emptyItems.length));
        console.log("位置是"+aimEmpty);
        //将数字填进选取的empty位，注意将empty位置为nonEmptyItem
        emptyItems[aimEmpty].innerHTML = num;
        emptyItems[aimEmpty].classList.add('nonEmptyItem');
        emptyItems[aimEmpty].classList.remove('emptyItem');
        refreshColor();
    }
    
    //刷新颜色
    function refreshColor() {
        var items = document.getElementsByClassName("item");
        for (var i = 0; i<items.length;i++){
            var itemValue = items[i].innerHTML;
            switch (itemValue){
                case '':
                    items[i].style.background='#ECFFFF';
                    break;
                case '2':
                    items[i].style.background='#B0C4DE	';
                    break;
                case '4':
                    items[i].style.background='#00FFFF';
                    break;
                case '8':
                    items[i].style.background='#00FF7F';
                    break;
                case '16':
                    items[i].style.background='#FFFF00';
                    break;
                case '32':
                    items[i].style.background='#DAA520';
                    break;
                case '64':
                    items[i].style.background='#8B4513';
                    break;
                case '128':
                    items[i].style.background='#FF4500';
                    break;
                case '256':
                    items[i].style.background='#696969';
                    break;
                case '512':
                    items[i].style.background='#FF00FF';
                    break;
            }
        }
    }


}