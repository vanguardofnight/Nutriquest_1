#pragma strict

var facingRight = true;
var anim : Animator;
var moveTouchPad : Joystick;
var jumpTouchPad : Joystick;

function Start () {
	anim = gameObject.GetComponent( Animator );
}

function Update () {
	anim.SetFloat("speed", Mathf.Abs(0.0));
	if ( moveTouchPad.position.x > 0 )
	{
		if (facingRight == false) 
		{
			facingRight = true;
			Flip();
		}
		anim.SetFloat("speed", Mathf.Abs(moveTouchPad.position.x));
	}
	else if ( moveTouchPad.position.x < 0 )
	{
		if (facingRight == true)
		{ 
			facingRight = false;
			Flip();
		}
		anim.SetFloat("speed", Mathf.Abs(moveTouchPad.position.x));
	}	
	
	// Movement on PC
	if (Input.GetKey(KeyCode.D))
	{
		if (facingRight == false) 
		{
			facingRight = true;
			Flip();
		}
		anim.SetFloat("speed", Mathf.Abs(1.0));
	}
	else if (Input.GetKey(KeyCode.A)) {
		if (facingRight == true)
		{ 
			facingRight = false;
			Flip();
		}
		anim.SetFloat("speed", Mathf.Abs(1.0));
	}
	
	anim.SetBool("jump", gameObject.Find("Player").GetComponent(SidescrollControl).jump);
}

function Flip() {
	var scale : Vector3  = transform.localScale;
	scale.x *= -1;
	transform.localScale = scale;
}