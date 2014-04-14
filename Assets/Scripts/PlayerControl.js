#pragma strict

var speed : float = 8;

var moveRight : KeyCode;
var moveLeft : KeyCode;

function Start()
{

}

function Update()
{
	if (Input.GetKey(moveRight)) {
		Debug.Log("moveRight");
	}
	else if (Input.GetKey(moveLeft)){
		Debug.Log("moveLeft");
	}
	else {
		rigidbody2D.velocity.x = 0;
	}
}