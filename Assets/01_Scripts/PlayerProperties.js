// This script is handling user properties & item pickup
private static var MAX_WATER: int = 15;

var strength 		: int = 1;
var weight 			: int = 1;

var water 			: int = MAX_WATER;
var fruit			: int = 0;
var grain			: int = 0;
var protein			: int = 0;
var junkfood		: int = 0;
var dairy			: int = 0;

// Timer (one second)
private var endTime : float;
private var waterTimer : float = 2.0;

// BioHarness
private var bioHarness : GameObject;
private var bioControl : BioHarnessController;

function Start () {
	// BioHanress Setup
	bioHarness = GameObject.Find( "BioHarness" );
	bioControl = bioHarness.GetComponent( BioHarnessController );
	bioControl.InitRecord();
	
	// Timer for water comsumption
	endTime = Time.time + waterTimer;
}

function Update () {
	// From respirationRate from BioHarness
	var respirationRate : float;
	
	if(bioControl.IsConnected())
	 	respirationRate = float.Parse(bioControl.GetRespirationRate());
 	else
	 	respirationRate = 16.5;
	
	// Hud updates
	var waterGauge = GameObject.Find("WaterLevel").GetComponent( WaterGauge );	
	waterGauge.Resize (water, MAX_WATER);
	
	var hudNum1 = GameObject.Find("HudNum1").GetComponent( ChangeNumber );
	var hudNum2 = GameObject.Find("HudNum2").GetComponent( ChangeNumber );
	var hudNum3 = GameObject.Find("HudNum3").GetComponent( ChangeNumber );
	
	var tenth = Mathf.RoundToInt(respirationRate) / 10;
	var one = Mathf.RoundToInt(respirationRate - tenth * 10);
	var ffloat = Mathf.RoundToInt((respirationRate - tenth*10 - one) * 10);
	hudNum1.ChangeNumber( tenth );
	hudNum2.ChangeNumber( one );
	hudNum3.ChangeNumber( ffloat );
	
	// Water is decreased every 1 sec
	if ( endTime - Time.time < 0) {
		water -= 1;
		endTime = Time.time + waterTimer;
	}
	if(water <= 0){
		Application.LoadLevel("gameover");
	}
}

function OnTriggerEnter( other : Collider ) {
	var pc = GetComponent( PlayerControl );
	
	if(other.tag == "Water") {
		water += 1;
		if(water > MAX_WATER) {
			water = MAX_WATER;
		}
		Destroy(other.gameObject);
	}
	
	if(other.tag == "JunkFood") {
		weight += 1;
		junkfood += 1;
		Destroy(other.gameObject);
	}
	
	if(other.tag == "Dairy") {
		strength += 1;
		dairy += 1;
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Fruit") {
		fruit += 1;
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Grain") {
		pc.incSpeed();
		grain += 1;
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Protein") {
		pc.incJumpSpeed();
		protein += 1;
		Destroy(other.gameObject);
	}
}
