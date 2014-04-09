#pragma strict

function Start () {
	
}

/*function OnTriggerEnter(other : Collider) {
	 
	    if(other.gameObject.tag == "Player"){
	    var playerParent : GameObject = GameObject.Find("2D Side Scroller");
	    var playerParentChild1 : Transform = playerParent.transform.Find("2D Side Scroller");
	    var player : Transform = playerParentChild1.transform.Find("Player");
	    var attributes : AttributeScript = other.gameObject.GetComponent(AttributeScript);
		
		var delay : float = 4 / attributes.getWeight();
		Debug.Log(delay);
		Invoke("switchOnGravity", delay);
		}
}
*/

function switchOnGravity(delay : int){
	var tdelay : float = 4 / delay;
		Debug.Log(tdelay);
	yield WaitForSeconds(tdelay);
	gameObject.rigidbody.useGravity = true;
}
function Update () {
	
}