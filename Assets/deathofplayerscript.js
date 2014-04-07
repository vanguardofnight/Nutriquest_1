#pragma strict

function Start () {

}

function OnTriggerEnter(other : Collider) {
	Destroy(other.gameObject);
	Application.LoadLevel("intro");
	
}
function Update () {

}