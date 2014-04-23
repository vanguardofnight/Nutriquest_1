// Physic variables
var speed 			: float = 8.0;
var jumpSpeed 		: float = 18.0;
var gravity 		: float = 20.0;
var moveDirection 	: int = 1;
var velocity : Vector3 = Vector3.zero;

// Sound variables
var soundJump 		: AudioClip;
private var soundRate		: float = 0.0;
private var soundDelay		: float = 0.0;

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
	var controller : CharacterController = GetComponent(CharacterController);
	
	// Movement in on the ground
	if ( controller.isGrounded ) {
		velocity = Vector3( Input.GetAxis( "Horizontal" ), 0, 0 );
		velocity.x *= speed;
		
		if( velocity.x == 0 && moveDirection == 0 ) { // idle right
			//TODO: Animation
		}
		
		if( velocity.x == 0 && moveDirection == 1 ) { // idle left
			//TODO: Animation
		}
		
		if( velocity.x < 0 ) { // move left
			//TODO: Animation
		}
		
		if( velocity.x > 0 ) { // move right
			//TODO: Animation
		}
		
		if ( Input.GetButton ( "Jump" )) {
			velocity.y = jumpSpeed;
			PlaySound( soundJump , 0 );
		}
	}
	
	// Movements off the ground
	if ( !controller.isGrounded ) {
		// Stop jumping
		if ( Input.GetButtonUp ( "Jump" ) ) {
			velocity.y -= jumpSpeed/4;
		}
		
		velocity.x = Input.GetAxis( "Horizontal" );
		velocity.x *= speed;
		
		if( moveDirection == 0 ) { // jump right
			//TODO: Animation
		}
		
		if( moveDirection == 1 ) { // jump left
			//TODO: Animation
		}
		
	}
	
	// Set move directions left: 0, right: 1
	if ( velocity.x < 0 ) {
		moveDirection = 0;
	}
	if ( velocity.x > 0 ) {
		moveDirection = 1;
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