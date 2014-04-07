#pragma strict

function Start () {

}

function OnTriggerEnter(other : Collider) {
	if( other.tag == "Player")
	{
		Destroy(other.gameObject);
		Application.LoadLevel("gameover");
	}
}
function Update () {

}