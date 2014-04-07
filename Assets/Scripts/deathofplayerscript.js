#pragma strict

function Start () {

}

function OnTriggerEnter(other : Collider) {
	if( other.gameObject.name == "Player"){
	Destroy(other.gameObject);
	Application.LoadLevel("gameover");
	}
}
function Update () {

}