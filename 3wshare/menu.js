// JavaScript Document
/*菜单定义*/
function menu(title,content,open_callback,close_callback,init_stat)
{
	this._parent = false;
	var head = $('#'+title);
	var body = $('#'+content);
	function toogle(){
		if(body.css('display')=='none')
		{
			body.slideDown('fast');
//			if(this._parent)this._parent._stat
			if (open_callback)open_callback(head.get(0),body.get(0));
		}
		else
		{
			body.slideUp('fast');
			if (close_callback)close_callback(head.get(0),body.get(0));
		}
	}
	head.click(toogle);
	head.keypress(toogle)
	this.open = function()
	{
		if(body.css('display')=='none')
		{
			body.slideDown('fast');
			if (open_callback)open_callback(head.get(0),body.get(0));
		}
	};
	this.close = function()
	{
		if(body.css('display')!='none')
		{
			body.slideUp('fast');
			if (close_callback)close_callback(head.get(0),body.get(0));
		}
	};
	/* 菜单初始化*/
	if(init_stat == 'hide' || init_stat == 'close' || init_stat == false ){
		if(body.css('display')!='none'){
			body.slideUp('fast');
			if (close_callback)close_callback(head.get(0),body.get(0));
		}
	}
}
// 菜单体有全部展开和全部收起的功能
function menubar()
{
	var menus = new Array();
	this.menu = function(title,content,open_callback,close_callback,init_stat)
	{
		menus.push(new menu(title,content,open_callback,close_callback,init_stat));
	};
	this.expand = function()
	{
			for(var i = 0 ;i<menus.length;i++){menus[i].open();}
	};
	this.collapse = function()
	{
			for(var i = 0 ;i<menus.length;i++)menus[i].close();
	};
}
/*结束*/
/*具体的应用实例*/
var show = true;
var hide = false;
//修改菜单的上下箭头符号
function my_on(head,body)
{
	head.className='head_open'
}
function my_off(head,body)
{
	head.className="head"
}

//添加菜单	
window.onload=function()
{
	menus = new menubar();
	menus.menu("menu1",'menu1_content',my_on,my_off,hide);
	menus.menu("menu2",'menu2_content',my_on,my_off,hide);
	$('.menu_expand').click(menus.expand);
	$('.menu_collapse').click(menus.collapse)
}