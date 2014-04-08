#pragma strict

function Start () {

}

function OnTriggerEnter(other : Collider) {
	    /*NEEDS ADJUSTMENT TO READ WEIGHT FROM PLAYER */
	    /*var player : GameObject = GameObject.Find("Player");
	    var attributes : AttributeScript = player.GetComponent(AttributeScript);
		attributes.refillWater(); */
		Destroy(gameObject);
		//var delay : float = 4 / attributes.getWeight();
		//Debug.Log(delay);
		
		
}
function Update () {

}