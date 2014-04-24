﻿// This script is handling user properties & item pickup
private static var MAX_WATER: int = 15;

var texture : Texture;
var tooltip : String;
var style : GUIStyle;

var strength 		: int = 1;
var weight 			: int = 1;
var gameover		: boolean = false;
var levelComplete	: boolean = false;

var water 			: int = MAX_WATER;
var fruit			: int = 0;
var grain			: int = 0;
var protein			: int = 0;
var junkfood		: int = 0;
var dairy			: int = 0;

private var flavor : FlavorScript;
var penalty : AudioSource;
var waterAudio : AudioSource;
var particle : GameObject;
var score 			: int = 0;

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
	
	flavor = GetComponent(FlavorScript);
	
	// Timer for water comsumption
	endTime = Time.time + waterTimer;
}

function Update () {
	// From respirationRate from BioHarness
	var respirationRate : float;
	
	// Hud bioharness updates
	var hudNum1 = GameObject.Find("HudNum1").GetComponent( ChangeNumber );
	var hudNum2 = GameObject.Find("HudNum2").GetComponent( ChangeNumber );
	var hudNum3 = GameObject.Find("HudNum3").GetComponent( ChangeNumber );
	
	if(bioControl.IsConnected()) {
	 	respirationRate = float.Parse(bioControl.GetRespirationRate());
		var tenth = Mathf.RoundToInt(respirationRate) / 10;
		var one = Mathf.RoundToInt(respirationRate - tenth * 10);
		var ffloat = Mathf.RoundToInt((respirationRate - tenth*10 - one) * 10)/10;
		hudNum1.ChangeNumber( tenth );
		hudNum2.ChangeNumber( one );
		hudNum3.ChangeNumber( ffloat );
 	} else {
 		// 10: hud_x sprite
 		hudNum1.ChangeNumber( 10 );
		hudNum2.ChangeNumber( 10 );
		hudNum3.ChangeNumber( 10 );
 	}
	 
	// Hud water updates
	var waterGauge = GameObject.Find("WaterLevel").GetComponent( WaterGauge );	
	waterGauge.Resize (water, MAX_WATER);
	
	// Water is decreased every 1 sec
	if ( endTime - Time.time < 0) {
		water -= 1;
		endTime = Time.time + waterTimer;
	}
	if(water <= 0){
		//Application.LoadLevel("gameover");
		gameover = true;
	}
	
	// HUD elements relating to weight, strength (dairy), and score
	var weightNum = GameObject.Find("WeightNum").GetComponent( ChangeNumber );
	var strengthNum = GameObject.Find("StrengthNum").GetComponent( ChangeNumber );
	var pointNum1 = GameObject.Find("PointNum1").GetComponent( ChangeNumber );
	var pointNum2 = GameObject.Find("PointNum2").GetComponent( ChangeNumber );
	var pointNum3 = GameObject.Find("PointNum3").GetComponent( ChangeNumber );
	
	score = (6*grain + 8*dairy + 4*protein - 2*junkfood + 3*fruit);
	
	if(bioControl.IsConnected()) {
	 	var avgBreathing = bioControl.GetAvg();
	 	score = score * (avgBreathing/6);
	}
	
	var score_hund = Mathf.RoundToInt(score)/100;
	var score_tenth = Mathf.RoundToInt(score - score_hund*100) / 10;
	var score_one = Mathf.RoundToInt(score - score_hund*100 - score_tenth*10);
	
	weightNum.ChangeNumber( weight );
	strengthNum.ChangeNumber( strength );
	pointNum1.ChangeNumber( score_hund );
	pointNum2.ChangeNumber( score_tenth );
	pointNum3.ChangeNumber( score_one );
}

function OnGUI(){
    	//Application.LoadLevel(Application.loadedLevel);
    	var gameoverText = "GAME OVER";
    	if(gameover){
		if(GUI.Button(Rect(0,0,1920,1200), GUIContent(gameoverText,texture, tooltip), style)){
			Application.LoadLevel(Application.loadedLevel);
			}
			
		}
		
		if(levelComplete){
			var levelcompleteText = " CONGRATULATIONS!! \nYour Score: " + score;
			if(GUI.Button(Rect(0,0,1920,1200), GUIContent(levelcompleteText,texture, tooltip), style)){
				var curLevel  = Application.loadedLevelName;
				switch (curLevel) {
					case "lvl1":
						Application.LoadLevel("lvl2");
						break;
					case "lvl2":
						Application.LoadLevel("lvl3");
						break;
					case "lvl3":
						Application.LoadLevel("lvl4");
						break;
					case "lvl4":
						Application.LoadLevel("intro");
						break;
					default:
						Application.LoadLevel("intro"); 
						
					}
				}
			}
}
function OnTriggerEnter( other : Collider ) {
	var pc = GetComponent( PlayerControl );
	
	if(other.tag == "Lava"){
		  	gameover = true;
			Destroy(gameObject.GetComponent(SpriteRenderer)); 
		}
	if(other.tag == "Finish"){
			levelComplete = true;
	}
		
		
	if(other.tag == "FallBlock"){
		var fallscript : fallingBlock = other.gameObject.GetComponent(fallingBlock);
		fallscript.switchOnGravity(weight);
	}
	
	if(other.tag == "Water") {
		water =  MAX_WATER;
		waterAudio.Play();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if(other.tag == "JunkFood") {
		weight += 1;
		junkfood += 1;
		flavor.Eat();
		flavor.ColorTransitionBad();
		penalty.Play(30000);
		Destroy(other.gameObject);
	}
	
	if(other.tag == "Dairy") {
		strength += 1;
		dairy += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Fruit") {
		fruit += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Grain") {
		pc.incSpeed();
		grain += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Protein") {
		pc.incJumpSpeed();
		protein += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if(other.tag == "BreakBlock"){
		if(strength >= 3){
			Destroy(other.gameObject);
		}
	}
			
	if( other.tag == "Protein" || other.tag == "Fruit" || other.tag == "Grain" || other.tag == "Dairy" || other.tag == "JunkFood")
	{
		var cloneParticle : GameObject;
		cloneParticle = Instantiate(particle, transform.position, transform.rotation);
		cloneParticle.particleSystem.Emit(3);
		Destroy(cloneParticle,3);
	}	
}

