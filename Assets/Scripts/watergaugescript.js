#pragma strict

//private var oldwaterlevel:int = 0;
private var originalSize = 0;
function Start () {
		originalSize = transform.localScale.x;
}


function resize(waterlevel: double, maxwater: double){
	//var player: GameObject = GameObject.Find("Player");
	//var attributes : AttributeScript = player.GetComponent(AttributeScript);
	//var waterlevel:double = attributes.getWater();
	
	//var maxwater: double = attributes.MAX_WATER;
	var resizing: double = waterlevel/maxwater;
	var newx = originalSize * resizing;
	transform.localScale.x = newx;
	//oldwaterlevel = waterlevel;

}
function Update () {
	
}