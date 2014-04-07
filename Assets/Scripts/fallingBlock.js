#pragma strict

function Start () {
	
}

function OnTriggerEnter(other : Collider) {
	    /*NEEDS ADJUSTMENT TO READ WEIGHT FROM PLAYER */
	    if(other.gameObject.tag == "Player"){
	    var player : GameObject = GameObject.Find("Player");
	    var attributes : AttributeScript = player.GetComponent(AttributeScript);
		
		var delay : float = 4 / attributes.getWeight();
		Debug.Log(delay);
		Invoke("switchOnGravity", delay);
		}
}

function switchOnGravity(){
	gameObject.rigidbody.useGravity = true;
}
function Update () {
	
}