#pragma strict

private var character : Rigidbody;
public var gravity = false;
private var movement : Vector3;

function Start () 
{
	character = GetComponent( Rigidbody );
}

function OnCollisionEnter(collision : Collision)
{
	if(collision.gameObject.tag == "Player")
	{
		Debug.Log("in collider");
		character.useGravity = true;
		gravity = true;
	}
}

function Update () {

}