// Physic variables
private var controller : CharacterController;
var speed 			: float = 8.0;
var jumpSpeed 		: float = 15.0;
var gravity 		: float = 20.0;
var velocity 		: Vector3 = Vector3.zero;
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

// BioHarness
private var bioHarness : GameObject;
private var bioControl : BioHarnessController;

// Variables for hindering user control (Only with the bioHarness)
private var spike : Vector3;
private var spikeTimer : float;

function Start() {
	// BioHanress Setup
	bioHarness = GameObject.Find( "BioHarness" );
	bioControl = bioHarness.GetComponent( BioHarnessController );
	
	controller = GetComponent(CharacterController);
	anim = GetComponent(Animator);
	
	spikeTimer = Time.time;
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

	if(bioControl.IsConnected()) {
		// Every five second there are chance to generate a random movement spike
		var rRate = float.Parse(bioControl.GetRespirationRate());
		if (spikeTimer + 5.0 > Time.time) {
			spikeTimer = Time.time;
			if(Random.Range(0, 2) == 0) {
				if ( Mathf.Abs(rRate - 6) < 2 )
					spike = Vector3 (Random.Range(-1, 1), 0, 0);
				else if ( Mathf.Abs(rRate - 6) < 3 )
					spike = Vector3 (Random.Range(-5, 5), 0, 0);
				else if ( Mathf.Abs(rRate - 6) < 4 )
					spike = Vector3 (Random.Range(-13, 13), 0, 0);
				else if ( Mathf.Abs(rRate - 6) < 5 )
					spike = Vector3 (Random.Range(-17, 17), 0, 0);
				else
					spike = Vector3 (Random.Range(-21, 21), 0, 0);
				controller.Move( spike * Time.deltaTime );
				// Debug.Log(spike);
			}
		}
	}
	
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
	jumpSpeed += 4;
}

function incSpeed () {
	speed += 1;
}