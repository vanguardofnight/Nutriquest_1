// Physic variables
private var controller : CharacterController;
var speed 			: float = 8.0;
var jumpSpeed 		: float = 15.0;
var gravity 		: float = 20.0;
var velocity : Vector3 = Vector3.zero;
var moveDirection 	: int = 0;

// Sound effect variables
var soundJump 		: AudioClip;
private var soundRate		: float = 0.0;
private var soundDelay		: float = 0.0;

// Visual effect variables
private var anim : Animator;

// Joystick
var moveJoystick : Joystick;
var jumpJoystick : Joystick;

function Start() {
	controller = GetComponent(CharacterController);
	anim = GetComponent(Animator);
}

function PlaySound ( soundName, soundDelay : float )
{
		if ( !audio.isPlaying && Time.time > soundRate )
		{
			soundRate = soundDelay + Time.time;
			audio.clip = soundName;
			audio.Play();
			yield WaitForSeconds( audio.clip.length );
		}
}

function Update() {	
	// Movement in on the ground
	if ( controller.isGrounded ) {	
		// Physics
		velocity = Vector3( Input.GetAxis( "Horizontal" ), 0, 0 );
		velocity.x = Input.GetAxis( "Horizontal" ) + moveJoystick.position.x;
		velocity.x *= speed;
		
		if ( Input.GetButton ( "Jump" ) || jumpJoystick.IsFingerDown()) {
			velocity.y = jumpSpeed;
			PlaySound( soundJump , 0 );
		}
		
		// Animation
		anim.SetBool("isGrounded", true);
		anim.SetFloat("velocity", Mathf.Abs(velocity.x));
	}
	
	// Movements off the ground
	if ( !controller.isGrounded ) {
		// Physics
		// Stop jumping when a character hits ceiling
		if ( Input.GetButtonUp ( "Jump" ) ) {
			velocity.y -= jumpSpeed/4;
		}
		
		velocity.x = Input.GetAxis( "Horizontal" ) + moveJoystick.position.x;
		velocity.x *= speed;
		
		// Animation
		anim.SetBool("isGrounded", false);
		anim.SetFloat("velocity", Mathf.Abs(velocity.x));
	}
	
	// Move directions
	if ( velocity.x < 0 ) {
		moveDirection = 0;
		transform.rotation.y = 180;
	}
	if ( velocity.x > 0 ) {
		moveDirection = 1;
		transform.rotation.y = 0;
	}
	
	// Hitting ceiling - force player downward
	if ( controller.collisionFlags == CollisionFlags.Above ) {
		velocity.y = 0;
		velocity.y = -1;
	}
	
	// Apply gravity
	velocity.y -= gravity * Time.deltaTime;
	
	// Move the controller
	controller.Move( velocity * Time.deltaTime );
}

function incJumpSpeed () {
	jumpSpeed += 1;
}

function incSpeed () {
	speed += 1;
}