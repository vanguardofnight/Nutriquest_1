//////////////////////////////////////////////////////////////
// SidescrollControl.js
//
// SidescrollControl creates a 2D control scheme where the left
// pad is used to move the character, and the right pad is used
// to make the character jump.
//////////////////////////////////////////////////////////////

#pragma strict

@script RequireComponent( CharacterController )

// This script must be attached to a GameObject that has a CharacterController
var moveTouchPad : Joystick;
var jumpTouchPad : Joystick;

var forwardSpeed : float = 8;
var backwardSpeed : float = 8;
var jumpSpeed : float = 19;
var inAirMultiplier : float = 0.75;					// Limiter for ground speed while jumping
var protoSpeedMod : float = 1;							// Value for quickly modifying speed

public var jump = false;
public var jumpPowerup = false;
public var speedPowerup = false;
public var breakPowerup = false;

private var thisTransform : Transform;
private var character : CharacterController;
private var sound : AudioSource;
var flavor : FlavorScript;
private var velocity : Vector3;						// Used for continuing momentum while in air
private var canJump = true;
private var internalSpeedMod : float = 1;


function Start()
{
	// Cache component lookup at startup instead of doing this every frame		
	thisTransform = GetComponent( Transform );
	character = GetComponent( CharacterController );
	sound = GetComponent( AudioSource);	
	var po : GameObject = GameObject.Find("AlienMan");
	flavor = po.GetComponent(FlavorScript);

	// Move the character to the correct start position in the level, if one exists
	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn )
		thisTransform.position = spawn.transform.position;
}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "JumpPower")
	{
		jumpPowerup = true;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	if(other.tag == "SpeedPower")
	{
		//speedPowerup = true;
		forwardSpeed = 16;
		backwardSpeed = 16;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	
}

function OnEndGame()
{
	// Disable joystick when the game ends	
	moveTouchPad.Disable();	
	jumpTouchPad.Disable();	

	// Don't allow any more control changes when the game ends
	this.enabled = false;
}

function Update()
{
	var movement = Vector3.zero;
	var speedMod = protoSpeedMod*internalSpeedMod;

	// Apply movement from move joystick
	if ( moveTouchPad.position.x > 0 )
		movement = Vector3.right * forwardSpeed * moveTouchPad.position.x;
	else
		movement = Vector3.right * backwardSpeed * moveTouchPad.position.x;
	
	// Movement on PC
	if (Input.GetKey(KeyCode.D))
		movement = Vector3.right * forwardSpeed * 1;
	else if (Input.GetKey(KeyCode.A))
		movement = Vector3.right * backwardSpeed * -1;

	
	// Check for jump
	if ( character.isGrounded )
	{		
		jump = false;
		var touchPad = jumpTouchPad;
			
		if ( !touchPad.IsFingerDown() )
			canJump = true;
		
	 	if ( canJump && touchPad.IsFingerDown() || Input.GetKey(KeyCode.Space) )
	 	{
			jump = true;
			canJump = false;
	 	}	
		
		if ( jump )
		{
			sound.Play();
			// Apply the current movement to launch velocity		
			//velocity = character.velocity;
			velocity.y = jumpSpeed;		
			if ( jumpPowerup)
				velocity.y = jumpSpeed + 5;
		}
	}
	else
	{			
		// Apply gravity to our velocity to diminish it over time
		velocity.y += Physics.gravity.y * 1.5 * Time.deltaTime;
				
		// Adjust additional movement while in-air
		movement.x *= inAirMultiplier;
//		movement.z *= inAirMultiplier;
	}
		
	movement += velocity;	
	movement += Physics.gravity;
	movement *= Time.deltaTime;
	
	// Actually move the character	
	character.Move( movement*speedMod );
	
	if ( character.isGrounded )
		// Remove any persistent velocity after landing	
		velocity = Vector3.zero;
}